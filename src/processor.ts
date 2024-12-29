import { GLOBAL_CONFIG } from '@sentio/runtime'

import { initEigenPodManagerEventsProcessor } from './validators/eigenPodProcessor.js'
import { initEigenPodBeaconProxyProcessor } from './validators/beaconProxyProcessor.js'
import { initMevCommitAVSProcessor } from './validators/mevCommitAVSProcessor.js'
import { initL1GatewayProcessor } from './bridge/l1GatewayProcessor.js'
import { initSettlementGatewayProcessor } from './bridge/settlementBridgeProcessor.js'
import { initOracleProcessor } from './mevcommit_core/oracleProcessor.js'
import { initPreconfManagerProcessor } from './mevcommit_core/preconfManagerProcessor.js'
import { initProviderRegistryProcessor } from './mevcommit_core/providerRegistryProcessor.js'
import { initBidderRegistryProcessor } from './mevcommit_core/bidderRegistryProcessor.js'
import { EthChainId } from '@sentio/sdk/eth'

GLOBAL_CONFIG.execution = {
  // required to bypass a false positive error not recognizing an out of supported network endpoint as an archive node. 
    skipStartBlockValidation: true,
  };

  
// eigenpod events
initEigenPodManagerEventsProcessor()
initEigenPodBeaconProxyProcessor()

// mev-commit avs validator registration events v.0.8.0
initMevCommitAVSProcessor(
  '0xBc77233855e3274E1903771675Eb71E602D9DC2e',
  EthChainId.ETHEREUM
)

// mev-commit l1 bridge on Holesky v.0.8.0
initL1GatewayProcessor(
  '0x567f0f6d4f7A306c9824d5Ffd0E26f39682cDd7c',
  EthChainId.HOLESKY
)

// mev-commit l1 bridge v.0.8.0
initSettlementGatewayProcessor(
  '0xFaF6F0d4bbc7bC33a4b403b274aBb82d0E794202',
  EthChainId.METIS
)

// mev-commit core contracts v.0.8.0
initOracleProcessor(
  '0xCd27C2Dc26d37Bb17686F709Db438D3Dc546437C',
  EthChainId.METIS
)
initPreconfManagerProcessor(
  '0xa254D1A10777e358B0c2e945343664c7309A0D9d',
  EthChainId.METIS
)
initProviderRegistryProcessor(
  '0x1C2a592950E5dAd49c0E2F3A402DCF496bdf7b67',
  EthChainId.METIS
)
initBidderRegistryProcessor(
  '0x948eCD70FaeF6746A30a00F30f8b9fB2659e4062',
  EthChainId.METIS
) 