import { initEigenPodManagerEventsProcessor } from './eigenPodProcessor.js'
import { initEigenPodBeaconProxyProcessor } from './beaconProxyProcessor.js'
export function init() {
    // Initialize the EigenPod processor with default parameters
    initEigenPodManagerEventsProcessor()
    initEigenPodBeaconProxyProcessor()
}

init()