import { EthChainId } from "@sentio/sdk/eth";
import { PreconfManagerProcessor } from '../types/eth/preconfmanager.js';

export const UNOPENED_COMMITMENT_EVENT = "UnopenedCommitmentStored";
export const OPENED_COMMITMENT_EVENT = "OpenedCommitmentStored";
export const project = "preconf_manager";

import { EthFetchConfig } from '@sentio/protos'

const ethconfig: EthFetchConfig = {
  transaction: true,
  transactionReceipt: true,
  transactionReceiptLogs: true,
  block: true,
  trace: false
}

export function initPreconfManagerProcessor(
  address: string,
  network: EthChainId
) {
  PreconfManagerProcessor.bind({
    address,
    network
  })
    .onEventUnopenedCommitmentStored(
      async (event, ctx) => {
        const name = 'preconf_manager_unopened_commitments';
        const { 
          commitmentIndex,
          committer,
          commitmentDigest,
          commitmentSignature,
          dispatchTimestamp
        } = event.args;

        ctx.eventLogger.emit(name, {
          project: project,
          eventType: UNOPENED_COMMITMENT_EVENT,
          commitmentIndex,
          committer,
          commitmentDigest,
          commitmentSignature,
          dispatchTimestamp,
          from: ctx.transaction?.from,
          gas_price: ctx.transaction?.gasPrice,
          max_priority_gas: ctx.transaction?.maxPriorityFeePerGas,
          max_fee_per_gas: ctx.transaction?.maxFeePerGas,
          effective_gas_price: ctx.transactionReceipt?.effectiveGasPrice
        });

      },
      undefined,
      ethconfig,
      undefined
    )
    .onEventOpenedCommitmentStored(
      async (event, ctx) => {
        const name = 'preconf_manager_opened_commitments';
        const {
          commitmentIndex,
          bidder,
          committer,
          bidAmt,
          blockNumber,
          bidHash,
          decayStartTimeStamp,
          decayEndTimeStamp,
          txnHash,
          revertingTxHashes,
          commitmentDigest,
          bidSignature,
          commitmentSignature,
          dispatchTimestamp,
          sharedSecretKey
        } = event.args;

        ctx.eventLogger.emit(name, {
          project: project,
          eventType: OPENED_COMMITMENT_EVENT,
          commitmentIndex,
          bidder,
          committer,
          bidAmt,
          blockNumber,
          bidHash,
          decayStartTimeStamp,
          decayEndTimeStamp,
          txnHash,
          revertingTxHashes,
          commitmentDigest,
          bidSignature,
          commitmentSignature,
          dispatchTimestamp,
          sharedSecretKey,
          from: ctx.transaction?.from,
          gas_price: ctx.transaction?.gasPrice,
          max_priority_gas: ctx.transaction?.maxPriorityFeePerGas,
          max_fee_per_gas: ctx.transaction?.maxFeePerGas,
          effective_gas_price: ctx.transactionReceipt?.effectiveGasPrice
        });
      },
      undefined,
      ethconfig,
      undefined
    )
}
