import { initEigenPodManagerEventsProcessor } from './validators/eigenPodProcessor.js'
import { initEigenPodBeaconProxyProcessor } from './validators/beaconProxyProcessor.js'
import { initMevCommitAVSProcessor } from './validators/mevCommitAVSProcessor.js'

// eigenpod events
initEigenPodManagerEventsProcessor()
initEigenPodBeaconProxyProcessor()

// mev-commit avs validator registration events
initMevCommitAVSProcessor()