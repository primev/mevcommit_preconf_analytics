import { EigenPodProcessor } from './types/eth/eigenpod.js'
import { EthChainId, EthContext } from "@sentio/sdk/eth";


export function initEigenPodBeaconProxyProcessor(
  // TODO - Dynamically query a list of addresses 
  // This is a single eigenpod owner. Need to get all eigenpod owners and then query all those addresses.
    address: string = '0x0F389979fF45990c2C1B8D1989ab0D9D76f7951d', 
    startBlock: number = 20735804
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

