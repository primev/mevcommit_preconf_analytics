SELECT
    toStartOfDay(timestamp) AS commitment_day,
    committer,
    COUNT(commitmentDigest) AS total_encrypted_commits_provider_daily,
    SUM(COUNT(commitmentDigest)) OVER (PARTITION BY committer ORDER BY toStartOfDay(timestamp)) AS total_encrypted_commits_provider_cumulative,
    SUM(COUNT(commitmentDigest)) OVER (ORDER BY toStartOfDay(timestamp), committer) AS total_encrypted_commits_all_cumulative
FROM
    preconf_manager_unopened_commitments
WHERE
    chain = '1088'
GROUP BY
    commitment_day,
    committer
ORDER BY
    commitment_day,
    committer;
