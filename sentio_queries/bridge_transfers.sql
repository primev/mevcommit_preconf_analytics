SELECT
    timestamp,
    amount,
    recipient,
    sender,
    transferIdx,
    address,
    block_number,
    chain,
    contract,
    distinct_event_id,
    distinct_id,
    event_name,
    log_index,
    message,
    transaction_hash,
    transaction_index,
    'l1gateway'   AS gateway,
    'initiated'   AS status
FROM `l1gateway_transfer_initiated`
WHERE sender = '${address}'
   OR recipient = '${address}'

UNION ALL

SELECT
    timestamp,
    amount,
    recipient,
    NULL AS sender, -- This table doesn't have 'sender' (?), adapt if needed
    NULL AS transferIdx, -- or relevant columns
    address,
    block_number,
    chain,
    contract,
    distinct_event_id,
    distinct_id,
    event_name,
    log_index,
    message,
    transaction_hash,
    transaction_index,
    'l1gateway'   AS gateway,
    'finalized'   AS status
FROM l1gateway_transfer_finalized
WHERE recipient = '${address}'
   -- If there's a 'sender' column, adapt accordingly
UNION ALL

SELECT
    timestamp,
    amount,
    recipient,
    sender,
    transferIdx,
    address,
    block_number,
    chain,
    contract,
    distinct_event_id,
    distinct_id,
    event_name,
    log_index,
    message,
    transaction_hash,
    transaction_index,
    'settlement_bridge' AS gateway,
    'initiated'         AS status
FROM settlement_bridge_transfer_initiated
WHERE sender = '${address}'
   OR recipient = '${address}'

UNION ALL

SELECT
    timestamp,
    amount,
    recipient,
    NULL AS sender,
    NULL AS transferIdx,
    address,
    block_number,
    chain,
    contract,
    distinct_event_id,
    distinct_id,
    event_name,
    log_index,
    message,
    transaction_hash,
    transaction_index,
    'settlement_bridge' AS gateway,
    'finalized'         AS status
FROM settlement_bridge_transfer_finalized
WHERE recipient ='${address}';