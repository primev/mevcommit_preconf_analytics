SELECT
    b.block_number AS l1_block_number,
    b.block_timestamp AS l1_block_timestamp,
    SUM(o.bidAmt) / 1e18 AS total_bid_volume_eth
FROM 
(
    SELECT
        block_number,
        block_timestamp,
        toUInt64(toUnixTimestamp(block_timestamp) / 12) AS block_bucket
    FROM ethereum.blocks
) AS b
LEFT JOIN 
(
    SELECT
        bidAmt,
        timestamp,
        toUInt64(toUnixTimestamp(timestamp) / 12) AS block_bucket
    FROM preconf_manager_opened_commitments
    WHERE chain = '1284'
) AS o
ON b.block_bucket = o.block_bucket
GROUP BY
    b.block_number,
    b.block_timestamp
HAVING SUM(o.bidAmt) / 1e18 > 0
ORDER BY
    b.block_number DESC;
