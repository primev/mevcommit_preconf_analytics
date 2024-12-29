import { MevCommitAVSProcessor } from "../types/eth/mevcommitavs.js";
import { EthChainId, EthFetchConfig } from "@sentio/sdk/eth";

// Define event type constants
export const VALIDATOR_REGISTERED_EVENT = "ValidatorRegistered";
export const project = "mevcommit_avs";

const ethconfig: EthFetchConfig = {
  transaction: true,
  transactionReceipt: true,
  transactionReceiptLogs: true,
  block: true,
  trace: false
};

export function initMevCommitAVSProcessor(
  address: string,
  network: EthChainId
) {
    return MevCommitAVSProcessor.bind({
        address,
        network
    })
    .onEventValidatorRegistered(async (event, ctx) => {
        const name = 'mevcommit_avs_validator_registered'
        const {
          podOwner,
          validatorPubKey
        } = event.args;
        ctx.eventLogger.emit(name, {
            project: project,
            eventType: VALIDATOR_REGISTERED_EVENT,
            podOwner,
            validatorPubKey,
            from_address: ctx.transaction?.from,
            gas_price: ctx.transaction?.gasPrice,
            max_priority_gas: ctx.transaction?.maxPriorityFeePerGas,
            max_fee_per_gas: ctx.transaction?.maxFeePerGas,
            effective_gas_price: ctx.transactionReceipt?.effectiveGasPrice
        });
    }, undefined, ethconfig, undefined)
}