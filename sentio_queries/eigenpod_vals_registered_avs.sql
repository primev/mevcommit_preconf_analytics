SELECT 
    vw.eigenPodAddress AS eigenpod_address,
    pd.podOwner AS eigenpod_owner_address,
    vw.numValidators,
    vw.validatorIndices,
    avs.address AS registered_address,
    avs.block_number AS registered_block_number,
    avs.validatorPubKey,
    avs.transaction_hash,
    avs.timestamp AS registered_timestamp
FROM 
    verify_withdraw_credentials AS vw
INNER JOIN 
    pod_deployed AS pd
ON 
    vw.eigenPodAddress = pd.eigenPod
INNER JOIN 
    mevcommit_avs_validator_registered AS avs
ON 
    pd.podOwner = avs.podOwner
WHERE 
    vw.eigenPodAddress IS NOT NULL
    AND pd.eigenPod IS NOT NULL
    AND pd.podOwner IS NOT NULL
    AND avs.podOwner IS NOT NULL
ORDER BY 
    vw.timestamp DESC;
