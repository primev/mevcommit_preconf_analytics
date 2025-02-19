SELECT
    timestamp,
    amount,
    sender AS address_involved,
    recipient,
    'l1gateway' AS gateway,
    'initiated' AS status,
    chain,
    transaction_hash
FROM l1gatway_transfer_initiated
WHERE sender = '0xf2bD1D7204b6B53ee988aeF07FCeaB9DA1b8dD28' OR recipient = '0xf2bD1D7204b6B53ee988aeF07FCeaB9DA1b8dD28'

UNION ALL

SELECT
    timestamp,
    amount,
    recipient AS address_involved,
    recipient,
    'l1gateway' AS gateway,
    'finalized' AS status,
    chain,
    transaction_hash
FROM l1gatway_transfer_finalized
WHERE recipient = '0xf2bD1D7204b6B53ee988aeF07FCeaB9DA1b8dD28'

UNION ALL

SELECT
    timestamp,
    amount,
    sender AS address_involved,
    recipient,
    'settlement_bridge' AS gateway,
    'initiated' AS status,
    chain,
    transaction_hash
FROM settlement_bridge_transfer_initiated
WHERE sender = '0xf2bD1D7204b6B53ee988aeF07FCeaB9DA1b8dD28' OR recipient = '0xf2bD1D7204b6B53ee988aeF07FCeaB9DA1b8dD28'

UNION ALL

SELECT
    timestamp,
    amount,
    recipient AS address_involved,
    recipient,
    'settlement_bridge' AS gateway,
    'finalized' AS status,
    chain,
    transaction_hash
FROM settlement_bridge_transfer_finalized
WHERE recipient = '0xf2bD1D7204b6B53ee988aeF07FCeaB9DA1b8dD28'
ORDER BY timestamp DESC;
