import { EthChainId, EthFetchConfig } from "@sentio/sdk/eth";
import { SettlementGatewayProcessor } from '../types/eth/settlementgateway.js';

// Define event type constants
export const TRANSFER_FINALIZED_EVENT = "TransferFinalized";
export const TRANSFER_INITIATED_EVENT = "TransferInitiated";
export const project = "settlement_bridge";

const ethconfig: EthFetchConfig = {
  transaction: true,
  transactionReceipt: true,
  transactionReceiptLogs: true,
  block: true,
  trace: false
};

export function initSettlementGatewayProcessor(
  address: string,
  network: EthChainId
) {
    SettlementGatewayProcessor.bind({
      address,
      network
    })
    .onEventTransferFinalized(async (event, ctx) => {
      const name = 'settlement_bridge_transfer_finalized'
      const {
        amount,
        counterpartyIdx,
        recipient
      } = event.args;
      ctx.eventLogger.emit(name, {
        project: project,
        eventType: TRANSFER_FINALIZED_EVENT,
        amount: amount,
        counterpartyIdx: counterpartyIdx,
        recipient,
        gas_price: ctx.transaction?.gasPrice,
        max_priority_gas: ctx.transaction?.maxPriorityFeePerGas,
        max_fee_per_gas: ctx.transaction?.maxFeePerGas,
        effective_gas_price: ctx.transactionReceipt?.effectiveGasPrice
      });
    }, undefined, ethconfig, undefined)
    .onEventTransferInitiated(async (event, ctx) => {
      const name = 'settlement_bridge_transfer_initiated'
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