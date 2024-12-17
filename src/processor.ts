import { initEigenPodManagerEventsProcessor } from './validators/eigenPodProcessor.js'
import { initEigenPodBeaconProxyProcessor } from './validators/beaconProxyProcessor.js'
import { initMevCommitAVSProcessor } from './validators/mevCommitAVSProcessor.js'
import { initL1GatewayProcessor } from './bridge/l1GatewayProcessor.js'
import { initSettlementGatewayProcessor } from './bridge/settlementBridgeProcessor.js'
import { initOracleProcessor } from './mevcommit_core/oracleProcessor.js'
import { initPreconfManagerProcessor } from './mevcommit_core/preconfManagerProcessor.js'

// eigenpod events
initEigenPodManagerEventsProcessor()
initEigenPodBeaconProxyProcessor()

// mev-commit avs validator registration events
initMevCommitAVSProcessor()

// mev-commit l1 bridge on Holesky
initL1GatewayProcessor()

// mev-commit l1 bridge on mev-commit testnet
// initSettlementGatewayProcessor()
// initOracleProcessor()
// initPreconfManagerProcessor()