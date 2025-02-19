WITH RankedData AS (
    SELECT
        opened.timestamp,
        opened.bidAmt,
        opened.bidder,
        opened.blockNumber AS l1_block_number,
        opened.decayStartTimeStamp,
        opened.decayEndTimeStamp,
        opened.committer,
        processed.commitmentIndex AS processed_commitmentIndex,
        processed.commitmentProcessed,
        (opened.dispatchTimestamp - opened.decayStartTimeStamp) AS decay_time_ms,
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
        SUM(commitmentProcessed) AS processed_count,
        COUNT(*) - SUM(commitmentProcessed) AS not_processed_count
    FROM
        RankedData
    GROUP BY
        hour_start,
        bidder
),
CumulativeData AS (
    SELECT
        hour_start,
        bidder,
        avg_decay_time_ms,
        processed_count,
        not_processed_count,
        SUM(processed_count) OVER (ORDER BY hour_start) AS cumulative_processed_count,
        SUM(not_processed_count) OVER (ORDER BY hour_start) AS cumulative_not_processed_count
    FROM AggregatedData
),
Ranked AS (
  SELECT
        hour_start,
        bidder,
        avg_decay_time_ms,
        processed_count,
        not_processed_count,
        cumulative_processed_count,
        cumulative_not_processed_count,
        ROW_NUMBER() OVER (PARTITION BY bidder ORDER BY hour_start DESC) as rn
    FROM CumulativeData
)

SELECT 
    hour_start,
    bidder,
    avg_decay_time_ms,
    processed_count,
    not_processed_count,
    cumulative_processed_count,
    cumulative_not_processed_count
FROM Ranked
ORDER BY hour_start DESC, bidder;
