import { EigenPodProcessor } from './types/eth/eigenpod.js'
import { EthChainId, EthContext } from "@sentio/sdk/eth";


const address = '0x91E677b07F7AF907ec9a428aafA9fc14a0d3A338D' // eigenpod mainnet contract
const start_block = 17445564

EigenPodProcessor.bind({
  address: address,
  // network: EthChainId.ETHEREUM,
  startBlock: start_block
}).onCallVerifyWithdrawalCredentials(async (call, ctx: EthContext) => {
  if (call.error) {
    return;
  }

  // Log the details of the verification call
  ctx.eventLogger.emit("Withdrawal Credentials Verification", {
    beaconTimestamp: call.args.beaconTimestamp.toString(),
    numValidators: call.args.validatorIndices.length,
    stateRootProof: call.args.stateRootProof,
    validatorFields: JSON.stringify(call.args.validatorFields),
    validatorFieldsProof: call.args.validatorFieldsProofs,
    validatorIndices: call.args.validatorIndices.map(i => i.toString())
  });
});
