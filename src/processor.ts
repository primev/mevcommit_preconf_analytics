import { GLOBAL_CONFIG } from "@sentio/runtime";
import { initEigenPodManagerEventsProcessor } from './eigenPodProcessor.js'
import { initEigenPodBeaconProxyProcessor } from './beaconProxyProcessor.js'
import { initMevCommitAVSProcessor } from './mevCommitAVSProcessor.js'
import { Validator } from './schema/store.js';

GLOBAL_CONFIG.execution = {
    sequential: true,
  };



// eigenpod events
initEigenPodManagerEventsProcessor()
initEigenPodBeaconProxyProcessor()

// mev-commit avs validator registration events
initMevCommitAVSProcessor()