import { EigenPodProcessor } from './types/eth/eigenpod.js'
import { EthChainId, EthContext } from "@sentio/sdk/eth";


export function initEigenPodBeaconProxyProcessor(
    address: string = '0xa3525E19A1Fc510b783F419342d45b4484D57F54', // eigenpod beacon proxy address
    startBlock: number = 21384181
  ) {
    return EigenPodProcessor.bind({
        address: address,
        network: EthChainId.ETHEREUM,
        startBlock: startBlock
      }).onCallVerifyWithdrawalCredentials(async (call, ctx: EthContext) => {
        console.log("Processing call:", call);
        
        if (call.error) {
          console.log("Call error detected");
          return;
        }
      
        // Log the details of the verification call
        ctx.eventLogger.emit("verify_withdraw_credentials", {
          beaconTimestamp: call.args.beaconTimestamp.toString(),
          numValidators: call.args.validatorIndices.length,
          stateRootProof: call.args.stateRootProof,
          validatorFields: JSON.stringify(call.args.validatorFields),
          validatorFieldsProof: call.args.validatorFieldsProofs,
          validatorIndices: call.args.validatorIndices.map(i => i.toString())
        });
      });
  }

