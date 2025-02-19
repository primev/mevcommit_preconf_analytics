SELECT
    opened.timestamp,
    (opened.bidAmt) / 1e18 as bidAmt_eth,
    opened.bidder,
    opened.bidHash,
    opened.bidSignature,
    opened.revertingTxHashes,
    opened.txnHash,
    opened.blockNumber AS l1_block_number,
    opened.decayStartTimeStamp,
    opened.decayEndTimeStamp,
    opened.dispatchTimestamp,
    opened.committer,
    processed.commitmentIndex AS processed_commitmentIndex,
    processed.commitmentProcessed,
    (opened.dispatchTimestamp - opened.decayStartTimeStamp) AS decay_time_ms
FROM
    preconf_manager_opened_commitments AS opened
LEFT JOIN
    oracle_commitment_processed AS processed
    ON opened.commitmentIndex = processed.commitmentIndex
        AND processed.chain = '1284'
WHERE
    opened.chain = '1284'
ORDER BY
    opened.timestamp DESC
