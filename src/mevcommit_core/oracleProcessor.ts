import { EthChainId, EthFetchConfig } from "@sentio/sdk/eth";
import { OracleProcessor } from '../types/eth/oracle.js';

// Define event type constants
export const COMMITMENT_PROCESSED_EVENT = "CommitmentProcessed";
export const project = "oracle";

const ethconfig: EthFetchConfig = {
  transaction: true,
  transactionReceipt: true,
  transactionReceiptLogs: true,
  block: true,
  trace: false
};

export function initOracleProcessor(
  address: string,
  network: EthChainId
) {
    OracleProcessor.bind({
      address,
      network
    })
    .onEventCommitmentProcessed(async (event, ctx) => {
        const name = 'oracle_commitment_processed'
        const {
          commitmentIndex,
          isSlash
        } = event.args;
        ctx.eventLogger.emit(name, {
          project: project,
          eventType: COMMITMENT_PROCESSED_EVENT,
          commitmentIndex: commitmentIndex,
          commitmentProcessed: isSlash,
          from_address: ctx.transaction?.from,
          gas_price: ctx.transaction?.gasPrice,
          max_priority_gas: ctx.transaction?.maxPriorityFeePerGas,
          max_fee_per_gas: ctx.transaction?.maxFeePerGas,
          effective_gas_price: ctx.transactionReceipt?.effectiveGasPrice
        });
    }, undefined, ethconfig, undefined)
}

