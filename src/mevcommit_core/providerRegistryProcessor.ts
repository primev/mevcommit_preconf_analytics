import { EthChainId } from "@sentio/sdk/eth";
import { ProviderRegistryProcessor } from '../types/eth/providerregistry.js';


export function initProviderRegistryProcessor(
  address: string,
  network: EthChainId
) {
    ProviderRegistryProcessor.bind({
      address,
      network
    })
    .onEventBLSKeyAdded(async (event, ctx) => {   
        ctx.eventLogger.emit('provider_registry_bls_key_added', {
          provider: event.args.provider,
          blsPublicKey: event.args.blsPublicKey,
        });
      })
    .onEventProviderRegistered(async (event, ctx) => {
        ctx.eventLogger.emit('provider_registry_provider_registered', {
          provider: event.args.provider,
          stakedAmount: event.args.stakedAmount.toString(),
        });
      })
      .onEventFundsDeposited(async (event, ctx) => {
        ctx.eventLogger.emit('provider_registry_funds_deposited', {
          provider: event.args.provider,
          amount: event.args.amount.toString(),
        });
      })
      .onEventFundsSlashed(async (event, ctx) => {
        ctx.eventLogger.emit('provider_registry_funds_slashed', {
          provider: event.args.provider,
          amount: event.args.amount.toString(),
        });
      })
      .onEventUnstake(async (event, ctx) => {
        ctx.eventLogger.emit('provider_registry_unstake_requested', {
          provider: event.args.provider,
          timestamp: event.args.timestamp
        });
      })
      .onEventBidderWithdrawSlashedAmount(async (event, ctx) => {
        ctx.eventLogger.emit('provider_registry_bidder_withdraw_slashed_amount', {
          bidder: event.args.bidder,
          amount: event.args.amount.toString(),
        });
      })
      .onEventWithdraw(async (event, ctx) => {
        ctx.eventLogger.emit('provider_registry_withdraw', {
          provider: event.args.provider,
          amount: event.args.amount.toString(),
        });
      })

  }