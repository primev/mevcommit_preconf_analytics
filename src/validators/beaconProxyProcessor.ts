import { EigenPodProcessor } from '../types/eth/eigenpod.js'
import { EthChainId, EthContext } from "@sentio/sdk/eth";

const eigenPod_addresses: string[] = [
    // Note this list has to be updated manually over time to update onCallVerifyWithdrawalCredentials() calls. 
    '0x5993A0c83dCa56715e82b6dF5b1597EfD6e50885', // primev registered
    '0x0F389979fF45990c2C1B8D1989ab0D9D76f7951d'  // primev registered
];

export function initEigenPodBeaconProxyProcessor(
    addresses: string[] = eigenPod_addresses,  // Use the array of addresses
    startBlock: number = 19688266
) {
    // Create an array of processors, one for each address
    return addresses.map(address => 
        EigenPodProcessor.bind({
            address: address,
            network: EthChainId.ETHEREUM,
            startBlock: startBlock
        }).onCallVerifyWithdrawalCredentials(async (call, ctx: EthContext) => {
            console.log("Processing call for address:", address);
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
                eigenPodAddress: address, // Add the address to identify which EigenPod
                beaconTimestamp: call.args.beaconTimestamp.toString(),
                validatorIndices: JSON.stringify(call.args.validatorIndices),
                validatorFields: JSON.stringify(call.args.validatorFields),
                numValidators: call.args.validatorIndices.length,
                stateRootProof: JSON.stringify(call.args.stateRootProof),
                validatorFieldsProof: JSON.stringify(call.args.validatorFieldsProofs)
            });
        })
    );
}

