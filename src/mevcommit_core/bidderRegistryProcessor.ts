import { BidderRegistryProcessor} from '../types/eth/internal/bidderregistry-processor.js'
import { EthChainId, EthFetchConfig } from "@sentio/sdk/eth";

export const BIDDER_REGISTERED_EVENT = "BidderRegistered";
export const BIDDER_WITHDRAWAL_EVENT = "BidderWithdrawal";
export const BLOCK_TRACKER_UPDATED_EVENT = "BlockTrackerUpdated";
export const FUNDS_RETRIEVED_EVENT = "FundsRetrieved";
export const FUNDS_REWARDED_EVENT = "FundsRewarded";
export const project = "bidder_registry";

const ethconfig: EthFetchConfig = {
  transaction: true,
  transactionReceipt: true,
  transactionReceiptLogs: true,
  block: true,
  trace: false
};

export const initBidderRegistryProcessor = (
  address: string,
  network: EthChainId
) => {
    BidderRegistryProcessor.bind({
        address,
        network
      })
      .onEventBidderRegistered(async (event, ctx) => {
        const name = 'bidder_registry_bidder_registered'
        const {
          bidder,
          depositedAmount,
          windowNumber
        } = event.args;
        ctx.eventLogger.emit(name, {
          project: project,
          eventType: BIDDER_REGISTERED_EVENT,
          bidder,
          depositedAmount: depositedAmount,
          windowNumber: windowNumber,
          from: ctx.transaction?.from,
          gas_price: ctx.transaction?.gasPrice,
          max_priority_gas: ctx.transaction?.maxPriorityFeePerGas,
          max_fee_per_gas: ctx.transaction?.maxFeePerGas,
          effective_gas_price: ctx.transactionReceipt?.effectiveGasPrice
        });
      }, undefined, ethconfig, undefined)
      .onEventBidderWithdrawal(async (event, ctx) => {
        const name = 'bidder_registry_bidder_withdrawal'
        const {
          bidder,
          window,
          amount
        } = event.args;
        ctx.eventLogger.emit(name, {
          project: project,
          eventType: BIDDER_WITHDRAWAL_EVENT,
          bidder,
          window: window,
          amount: amount,
          from: ctx.transaction?.from,
          gas_price: ctx.transaction?.gasPrice,
          max_priority_gas: ctx.transaction?.maxPriorityFeePerGas,
          max_fee_per_gas: ctx.transaction?.maxFeePerGas,
          effective_gas_price: ctx.transactionReceipt?.effectiveGasPrice
        });
      }, undefined, ethconfig, undefined)
      .onEventBlockTrackerUpdated(async (event, ctx) => {
        const name = 'bidder_registry_block_tracker_updated'
        const {
          newBlockTracker
        } = event.args;
        ctx.eventLogger.emit(name, {
          project: project,
          eventType: BLOCK_TRACKER_UPDATED_EVENT,
          newBlockTracker,
          from: ctx.transaction?.from,
          gas_price: ctx.transaction?.gasPrice,
          max_priority_gas: ctx.transaction?.maxPriorityFeePerGas,
          max_fee_per_gas: ctx.transaction?.maxFeePerGas,
          effective_gas_price: ctx.transactionReceipt?.effectiveGasPrice
        });
      }, undefined, ethconfig, undefined)
      .onEventFundsRetrieved(async (event, ctx) => {
        const name = 'bidder_registry_funds_retrieved'
        const {
          bidder,
          amount,
          commitmentDigest,
          window
        } = event.args;
        ctx.eventLogger.emit(name, {
          project: project,
          eventType: FUNDS_RETRIEVED_EVENT,
          bidder,
          amount: amount,
          window,
          commitmentDigest,
          from: ctx.transaction?.from,
          gas_price: ctx.transaction?.gasPrice,
          max_priority_gas: ctx.transaction?.maxPriorityFeePerGas,
          max_fee_per_gas: ctx.transaction?.maxFeePerGas,
          effective_gas_price: ctx.transactionReceipt?.effectiveGasPrice
        });
      }, undefined, ethconfig, undefined)
      .onEventFundsRewarded(async (event, ctx) => {
        const name = 'bidder_registry_funds_rewarded'
        const {
          bidder,
          amount,
          provider,
          window,
          commitmentDigest
        } = event.args;
        ctx.eventLogger.emit(name, {
          project: project,
          eventType: FUNDS_REWARDED_EVENT,
          bidder,
          provider,
          window: window,
          amount: amount,
          commitmentDigest,
          from: ctx.transaction?.from,
          gas_price: ctx.transaction?.gasPrice,
          max_priority_gas: ctx.transaction?.maxPriorityFeePerGas,
          max_fee_per_gas: ctx.transaction?.maxFeePerGas,
          effective_gas_price: ctx.transactionReceipt?.effectiveGasPrice
        });
      }, undefined, ethconfig, undefined)
}