SELECT 
    si.address, 
    si.amount / 1e18 AS amount_eth, 
    SUM(si.amount / 1e18) OVER (ORDER BY si.timestamp) AS cumulative_amount_eth, 
    si.recipient, 
    si.amount, 
    si.block_number, 
    si.chain, 
    si.sender, 
    si.timestamp, 
    si.transaction_hash
FROM 
    settlement_bridge_transfer_initiated si
JOIN
    l1gateway_transfer_finalized l1f
ON
    si.transferIdx = l1f.counterpartyIdx
WHERE
    si.chain = '1088' AND l1f.chain = '17000';
