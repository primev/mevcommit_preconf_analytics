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
import { initBlockTrackerProcessor } from './mevcommit_core/blockTrackerProcessor.js'

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

// mainnet
initL1GatewayProcessor(
  '0xDBf24cafF1470a6D08bF2FF2c6875bafC60Cf881',
  EthChainId.ETHEREUM
)

// mev-commit core testnet v.0.8.0
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

initSettlementGatewayProcessor(
  '0xFaF6F0d4bbc7bC33a4b403b274aBb82d0E794202',
  EthChainId.METIS
)

initBlockTrackerProcessor(
  '0x0b3b6Cf113959214E313d6Ad37Ad56831acb1776',
  EthChainId.METIS
)


// mev-commit core mainnet
initOracleProcessor(
  '0xa1aaCA1e4583dB498D47f3D5901f2B2EB49Bd8f6',
  EthChainId.MOONBEAM
)
initPreconfManagerProcessor(
  '0x9fF03b7Ca0767f069e7AA811E383752267cc47Ec',
  EthChainId.MOONBEAM
)
initProviderRegistryProcessor(
  '0xb772Add4718E5BD6Fe57Fb486A6f7f008E52167E',
  EthChainId.MOONBEAM
)
initBidderRegistryProcessor(
  '0xC973D09e51A20C9Ab0214c439e4B34Dbac52AD67',
  EthChainId.MOONBEAM
) 

initSettlementGatewayProcessor(
  '0x138c60599946280e5a2DCc1f553B8f0cC0554E03',
  EthChainId.MOONBEAM
)

initBlockTrackerProcessor(
  '0x0DA2a367C51f2a34465ACd6AE5d8A48385e9cB03',
  EthChainId.MOONBEAM
)