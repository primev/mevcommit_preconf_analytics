WITH
bls_key_data AS (
    SELECT
        provider,
        groupArray(blsPublicKey) AS bls_keys,
        MAX(timestamp) AS last_bls_key_update
    FROM
        provider_registry_bls_key_added
    WHERE
        chain = '1284'
    GROUP BY
        provider
),
slash_data AS (
    SELECT
        provider,
        SUM(toFloat64(amount) / 1e18) AS total_amount_slashed,
        COUNT(*) AS number_of_slashes,
        MAX(timestamp) as last_slash_update
    FROM
        provider_registry_funds_slashed
    WHERE
        chain = '1284'
    GROUP BY
        provider
),
stake_data AS (
    SELECT
        provider,
        SUM(toFloat64(stakedAmount) / 1e18) AS amount_staked_per_provider,
        MAX(timestamp) as last_staked_update
    FROM
        provider_registry_provider_registered
    WHERE
        chain = '1284'
    GROUP BY
        provider
),
cumulative_eth_staked AS (
    SELECT
        SUM(toFloat64(stakedAmount) / 1e18) AS cumulative_eth_staked
    FROM
        provider_registry_provider_registered
    WHERE
        chain = '1284'
),
cumulative_eth_slashed AS (
    SELECT
        SUM(toFloat64(amount) / 1e18) AS cumulative_eth_slashed
    FROM
        provider_registry_funds_slashed
    WHERE
        chain = '1284'
),
provider_counts AS (
    SELECT
        COUNT(DISTINCT provider) AS cumulative_providers
    FROM
        provider_registry_provider_registered
    WHERE
        chain = '1284'
),
ranked_providers AS (
    SELECT provider, MAX(timestamp) as last_update
    FROM provider_registry_provider_registered
    WHERE chain = '1284'
    GROUP BY provider
)
SELECT
    b.provider,
    b.bls_keys,
    length(b.bls_keys) AS total_bls_keys_provider,
    COALESCE(s.total_amount_slashed, 0) AS total_amount_slashed_provider,
    COALESCE(s.number_of_slashes, 0) AS number_of_slashes_provider,
    COALESCE(st.amount_staked_per_provider, 0) AS amount_staked_provider,
    COALESCE(cm.cumulative_eth_staked, 0) AS cumulative_eth_staked_all,
    COALESCE(cs.cumulative_eth_slashed, 0) AS cumulative_eth_slashed_all,
    COALESCE(pc.cumulative_providers, 0) AS cumulative_providers_all,
    b.last_bls_key_update,
    st.last_staked_update,
    s.last_slash_update
FROM
    bls_key_data AS b
LEFT JOIN
    slash_data AS s
ON
    b.provider = s.provider
LEFT JOIN
    stake_data AS st
ON
    b.provider = st.provider
LEFT JOIN
    cumulative_eth_staked AS cm ON 1=1
LEFT JOIN
    cumulative_eth_slashed AS cs ON 1=1
LEFT JOIN
    provider_counts AS pc ON 1=1
LEFT JOIN ranked_providers AS rp ON b.provider = rp.provider
ORDER BY
    rp.last_update;
