import { EthChainId, EthContext, EthFetchConfig } from "@sentio/sdk/eth";
import { L1GatewayProcessor } from '../types/eth/l1gateway.js';
import { TransferFinalizedEvent, TransferInitiatedEvent } from '../types/eth/internal/L1Gateway.js';

// Define event type constants
export const TRANSFER_FINALIZED_EVENT = "TransferFinalized";
export const TRANSFER_INITIATED_EVENT = "TransferInitiated";
export const project = "l1gateway";

const ethconfig: EthFetchConfig = {
  transaction: true,
  transactionReceipt: true,
  transactionReceiptLogs: true,
  block: true,
  trace: false
};

export function initL1GatewayProcessor(
  address: string,
  network: EthChainId
) {
  L1GatewayProcessor.bind({
    address,
    network
  })
    .onEventTransferFinalized(async (event: TransferFinalizedEvent, ctx: EthContext) => {
      const name = 'l1gateway_transfer_finalized'
      const {
        counterpartyIdx,
        amount,
        recipient
      } = event.args;
      ctx.eventLogger.emit(name, {
        project: project,
        eventType: TRANSFER_FINALIZED_EVENT,
        counterpartyIdx: counterpartyIdx,
        amount: amount,
        recipient,
        gas_price: ctx.transaction?.gasPrice,
        max_priority_gas: ctx.transaction?.maxPriorityFeePerGas,
        max_fee_per_gas: ctx.transaction?.maxFeePerGas,
        effective_gas_price: ctx.transactionReceipt?.effectiveGasPrice
      });
    }, undefined, ethconfig, undefined)
    .onEventTransferInitiated(async (event: TransferInitiatedEvent, ctx: EthContext) => {
      const name = 'l1gateway_transfer_initiated'
      const {
        sender,
        recipient,
        amount,
        transferIdx
      } = event.args;
      ctx.eventLogger.emit(name, {
        project: project,
        eventType: TRANSFER_INITIATED_EVENT,
        sender,
        recipient,
        amount: amount,
        transferIdx: transferIdx,
        from_address: ctx.transaction?.from,
        gas_price: ctx.transaction?.gasPrice,
        max_priority_gas: ctx.transaction?.maxPriorityFeePerGas,
        max_fee_per_gas: ctx.transaction?.maxFeePerGas,
        effective_gas_price: ctx.transactionReceipt?.effectiveGasPrice
      });
    }, undefined, ethconfig, undefined)
}