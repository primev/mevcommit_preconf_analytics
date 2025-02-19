SELECT
    l1.timestamp AS l1_timestamp,
    l1.amount AS l1_amount,
    l1.recipient AS l1_recipient,
    l1.sender AS l1_sender,
    l1.block_number AS l1_block_number,
    l1.transaction_hash AS l1_tx_hash,
    l1.transferIdx,
    sb.timestamp AS mev_commit_timestamp,
    sb.amount AS mev_commit_amount,
    sb.recipient AS mev_commit_recipient,
    sb.block_number AS mev_commit_block_number,
    sb.transaction_hash AS mev_commit_tx_hash,
    sb.counterpartyIdx,
    (l1.amount / 1e18) AS amount_eth,
    dateDiff('minute', l1.timestamp, sb.timestamp) AS bridge_time_minutes,
    SUM(l1.amount / 1e18) OVER (ORDER BY l1.timestamp) AS cumulative_amount_eth,
    COUNT(*) OVER (ORDER BY l1.timestamp) AS cumulative_transaction_count
FROM 
    l1gateway_transfer_initiated l1 
JOIN 
    settlement_bridge_transfer_finalized sb
ON 
    l1.transferIdx = sb.counterpartyIdx
WHERE l1.chain = '1' AND sb.chain = '1284';