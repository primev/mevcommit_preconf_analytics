WITH window_totals AS (
  SELECT
    provider,
    window,
    MIN(timestamp) AS window_timestamp,
    SUM(amount / 1e18) AS window_rewards_eth,
    count(*) as commits_rewarded_in_window_count
  FROM
    bidder_registry_funds_rewarded
  GROUP BY
    provider,
    window
)

SELECT
  provider,
  window,
  window_timestamp,
  window_rewards_eth,
  SUM(window_rewards_eth) OVER (
    PARTITION BY provider
    ORDER BY window
    ROWS BETWEEN UNBOUNDED PRECEDING AND CURRENT ROW
  ) AS cumulative_rewards_eth,
  commits_rewarded_in_window_count
FROM
  window_totals
ORDER BY
  window DESC;
