import { initEigenPodManagerEventsProcessor } from './eigenPodProcessor.js'
import { initEigenPodBeaconProxyProcessor } from './beaconProxyProcessor.js'
import { initMevCommitAVSProcessor } from './mevCommitAVSProcessor.js'

// eigenpod events
initEigenPodManagerEventsProcessor()
initEigenPodBeaconProxyProcessor()

// mev-commit avs validator registration events
initMevCommitAVSProcessor()