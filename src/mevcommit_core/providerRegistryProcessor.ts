import { EthChainId, EthFetchConfig } from "@sentio/sdk/eth";
import { ProviderRegistryProcessor } from '../types/eth/providerregistry.js';


export const BLS_KEY_ADDED_EVENT = "BLSKeyAdded";
export const PROVIDER_REGISTERED_EVENT = "ProviderRegistered";
export const FUNDS_DEPOSITED_EVENT = "FundsDeposited";
export const FUNDS_SLASHED_EVENT = "FundsSlashed";
export const UNSTAKE_EVENT = "Unstake";
export const BIDDER_WITHDRAW_SLASHED_EVENT = "BidderWithdrawSlashedAmount";
export const WITHDRAW_EVENT = "Withdraw";
export const project = "provider_registry";

const ethconfig: EthFetchConfig = {
  transaction: true,
  transactionReceipt: true,
  transactionReceiptLogs: true,
  block: true,
  trace: false
};

export function initProviderRegistryProcessor(
  address: string,
  network: EthChainId
) {
    ProviderRegistryProcessor.bind({
      address,
      network
    })
    .onEventBLSKeyAdded(async (event, ctx) => {   
        const name = 'provider_registry_bls_key_added'
        const {
          provider,
          blsPublicKey
        } = event.args;
        ctx.eventLogger.emit(name, {
          project: project,
          eventType: BLS_KEY_ADDED_EVENT,
          provider,
          blsPublicKey,
          from: ctx.transaction?.from,
          gas_price: ctx.transaction?.gasPrice,
          max_priority_gas: ctx.transaction?.maxPriorityFeePerGas,
          max_fee_per_gas: ctx.transaction?.maxFeePerGas,
          effective_gas_price: ctx.transactionReceipt?.effectiveGasPrice
        });
    })
    .onEventProviderRegistered(async (event, ctx) => {
        const name = 'provider_registry_provider_registered'
        const {
          provider,
          stakedAmount
        } = event.args;
        ctx.eventLogger.emit(name, {
          project: project,
          eventType: PROVIDER_REGISTERED_EVENT,
          provider,
          stakedAmount: stakedAmount,
          from: ctx.transaction?.from,
          gas_price: ctx.transaction?.gasPrice,
          max_priority_gas: ctx.transaction?.maxPriorityFeePerGas,
          max_fee_per_gas: ctx.transaction?.maxFeePerGas,
          effective_gas_price: ctx.transactionReceipt?.effectiveGasPrice
        });
    }, undefined, ethconfig, undefined)
    .onEventFundsDeposited(async (event, ctx) => {
        const name = 'provider_registry_funds_deposited'
        const {
          provider,
          amount
        } = event.args;
        ctx.eventLogger.emit(name, {
          project: project,
          eventType: FUNDS_DEPOSITED_EVENT,
          provider,
          amount: amount,
          from: ctx.transaction?.from,
          gas_price: ctx.transaction?.gasPrice,
          max_priority_gas: ctx.transaction?.maxPriorityFeePerGas,
          max_fee_per_gas: ctx.transaction?.maxFeePerGas,
          effective_gas_price: ctx.transactionReceipt?.effectiveGasPrice
        });
    })
    .onEventFundsSlashed(async (event, ctx) => {
        const name = 'provider_registry_funds_slashed'
        const {
          provider,
          amount
        } = event.args;
        ctx.eventLogger.emit(name, {
          project: project,
          eventType: FUNDS_SLASHED_EVENT,
          provider,
          amount: amount,
          from: ctx.transaction?.from,
          gas_price: ctx.transaction?.gasPrice,
          max_priority_gas: ctx.transaction?.maxPriorityFeePerGas,
          max_fee_per_gas: ctx.transaction?.maxFeePerGas,
          effective_gas_price: ctx.transactionReceipt?.effectiveGasPrice
        });
    }, undefined, ethconfig, undefined)
    .onEventUnstake(async (event, ctx) => {
        const name = 'provider_registry_unstake_requested'
        const {
          provider,
          timestamp
        } = event.args;
        ctx.eventLogger.emit(name, {
          project: project,
          eventType: UNSTAKE_EVENT,
          provider,
          timestamp,
          from: ctx.transaction?.from,
          gas_price: ctx.transaction?.gasPrice,
          max_priority_gas: ctx.transaction?.maxPriorityFeePerGas,
          max_fee_per_gas: ctx.transaction?.maxFeePerGas,
          effective_gas_price: ctx.transactionReceipt?.effectiveGasPrice
        });
    }, undefined, ethconfig, undefined)
    .onEventBidderWithdrawSlashedAmount(async (event, ctx) => {
        const name = 'provider_registry_bidder_withdraw_slashed_amount'
        const {
          bidder,
          amount
        } = event.args;
        ctx.eventLogger.emit(name, {
          project: project,
          eventType: BIDDER_WITHDRAW_SLASHED_EVENT,
          bidder,
          amount: amount,
          from: ctx.transaction?.from,
          gas_price: ctx.transaction?.gasPrice,
          max_priority_gas: ctx.transaction?.maxPriorityFeePerGas,
          max_fee_per_gas: ctx.transaction?.maxFeePerGas,
          effective_gas_price: ctx.transactionReceipt?.effectiveGasPrice
        });
    }, undefined, ethconfig, undefined)
    .onEventWithdraw(async (event, ctx) => {
        const name = 'provider_registry_withdraw'
        const {
          provider,
          amount
        } = event.args;
        ctx.eventLogger.emit(name, {
          project: project,
          eventType: WITHDRAW_EVENT,
          provider,
          amount: amount,
          from: ctx.transaction?.from,
          gas_price: ctx.transaction?.gasPrice,
          max_priority_gas: ctx.transaction?.maxPriorityFeePerGas,
          max_fee_per_gas: ctx.transaction?.maxFeePerGas,
          effective_gas_price: ctx.transactionReceipt?.effectiveGasPrice
        });
    }, undefined, ethconfig, undefined)
}