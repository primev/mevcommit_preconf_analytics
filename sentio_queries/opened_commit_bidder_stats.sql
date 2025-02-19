WITH RankedData AS (
    SELECT
        opened.timestamp,
        (opened.bidAmt / 1e18) AS bid_eth,
        opened.bidder,
        opened.blockNumber AS l1_block_number,
        opened.decayStartTimeStamp,
        opened.decayEndTimeStamp,
        opened.committer,
        processed.commitmentIndex AS processed_commitmentIndex,
        processed.commitmentProcessed,
        (opened.dispatchTimestamp - opened.decayStartTimeStamp) AS decay_time_ms,
        (
            (opened.dispatchTimestamp - opened.decayStartTimeStamp)
            /
            (opened.decayEndTimeStamp - opened.decayStartTimeStamp)
        ) * (opened.bidAmt / 1e18) AS decayed_bid_eth,
        toStartOfHour(opened.timestamp) AS hour_start
    FROM
        preconf_manager_opened_commitments AS opened
    LEFT JOIN
        oracle_commitment_processed AS processed
        ON opened.commitmentIndex = processed.commitmentIndex
            AND processed.chain = '1284'
    WHERE
        opened.chain = '1284'
),

AggregatedData AS (
    SELECT
        hour_start,
        bidder,
        AVG(decay_time_ms) AS avg_decay_time_ms,
        SUM(bid_eth) AS total_bid_eth,
        SUM(decayed_bid_eth) AS total_decayed_bid_eth,
        -- rename: sum of processed => slashed
        SUM(commitmentProcessed) AS slashed_count,
        COUNT(*) - SUM(commitmentProcessed) AS not_slashed_count,
        -- total bids for each (hour_start, bidder)
        (SUM(commitmentProcessed) + (COUNT(*) - SUM(commitmentProcessed))) AS bid_count,
        -- count of unique block numbers in this hour_start for this bidder
        uniqExact(l1_block_number) AS block_count
    FROM RankedData
    GROUP BY
        hour_start,
        bidder
),

CumulativeData AS (
    SELECT
        hour_start,
        bidder,
        avg_decay_time_ms,
        total_bid_eth,
        total_decayed_bid_eth,
        slashed_count,
        not_slashed_count,
        bid_count,
        block_count,

        -- Global (non-partitioned) cumulative sums
        SUM(total_bid_eth) OVER (ORDER BY hour_start) AS cumulative_total_bid_eth,
        SUM(total_decayed_bid_eth) OVER (ORDER BY hour_start) AS cumulative_total_decayed_bid_eth,
        SUM(slashed_count) OVER (ORDER BY hour_start) AS cumulative_slashed_count,
        SUM(not_slashed_count) OVER (ORDER BY hour_start) AS cumulative_not_slashed_count,

        -- Bidder-partitioned running totals
        SUM(total_bid_eth) OVER (PARTITION BY bidder ORDER BY hour_start) AS bidder_cumulative_total_bid_eth,
        SUM(total_decayed_bid_eth) OVER (PARTITION BY bidder ORDER BY hour_start) AS bidder_cumulative_total_decayed_bid_eth,

        -- Bidder-partitioned cumulative bid count
        SUM(bid_count) OVER (PARTITION BY bidder ORDER BY hour_start) AS bidder_cumulative_bid_count,

        -- New global cumulative *sum* of unique block counts
        SUM(block_count) OVER (ORDER BY hour_start) AS cumulative_block_count,

        -- New bidder-partitioned cumulative sum of unique block counts
        SUM(block_count) OVER (PARTITION BY bidder ORDER BY hour_start) AS bidder_cumulative_block_count
    FROM AggregatedData
),

Ranked AS (
    SELECT
        hour_start,
        bidder,
        avg_decay_time_ms,
        total_bid_eth,
        total_decayed_bid_eth,
        slashed_count,
        not_slashed_count,
        bid_count,
        block_count,
        cumulative_total_bid_eth,
        cumulative_total_decayed_bid_eth,
        cumulative_slashed_count,
        cumulative_not_slashed_count,
        bidder_cumulative_total_bid_eth,
        bidder_cumulative_total_decayed_bid_eth,
        bidder_cumulative_bid_count,
        cumulative_block_count,
        bidder_cumulative_block_count,
        ROW_NUMBER() OVER (PARTITION BY bidder ORDER BY hour_start DESC) AS rn
    FROM CumulativeData
)

SELECT 
    hour_start,
    bidder,
    avg_decay_time_ms,
    total_bid_eth,
    total_decayed_bid_eth,
    slashed_count,
    not_slashed_count,
    bid_count,
    -- unique block count per hour/bidder
    block_count,

    -- global (non-partitioned) cumulative sums
    cumulative_total_bid_eth,
    cumulative_total_decayed_bid_eth,
    cumulative_slashed_count,
    cumulative_not_slashed_count,

    -- bidder-partitioned running totals
    bidder_cumulative_total_bid_eth,
    bidder_cumulative_total_decayed_bid_eth,
    bidder_cumulative_bid_count,

    -- new global + bidder-partitioned cumulative block counts
    cumulative_block_count,
    bidder_cumulative_block_count

FROM Ranked
ORDER BY hour_start DESC, bidder;
