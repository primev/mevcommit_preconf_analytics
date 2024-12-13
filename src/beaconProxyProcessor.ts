import { EigenPodProcessor } from './types/eth/eigenpod.js'
import { EthChainId, EthContext } from "@sentio/sdk/eth";


export function initEigenPodBeaconProxyProcessor(
    // address: string = '0xa3525E19A1Fc510b783F419342d45b4484D57F54', // eigenpod beacon proxy address (didnt work)
    address: string = '0xEF0e1e9bdEe12647D444F1d40f0e8C582F59F282', // eigenpod owner
    startBlock: number = 21354181
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
      
        // Add debug logging
        console.log("Raw validator indices:", call.args.validatorIndices);
        
        // Convert indices to numbers and store as array
        const indices = call.args.validatorIndices.map(i => Number(i));
        console.log("Processed validator indices:", indices);
      
        // Log the details of the verification call
        ctx.eventLogger.emit("verify_withdraw_credentials", {
          beaconTimestamp: call.args.beaconTimestamp.toString(),
          validatorIndices: JSON.stringify(call.args.validatorIndices),
          validatorFields: JSON.stringify(call.args.validatorFields),
          numValidators: call.args.validatorIndices.length,
          stateRootProof: JSON.stringify(call.args.stateRootProof),
          validatorFieldsProof: JSON.stringify(call.args.validatorFieldsProofs)
        });
      });
  }

