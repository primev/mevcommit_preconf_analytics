import { BidderRegistryProcessor} from '../types/eth/internal/bidderregistry-processor.js'
import { EthChainId } from "@sentio/sdk/eth";

export const initBidderRegistryProcessor = (
  address: string,
  network: EthChainId
) => {
    BidderRegistryProcessor.bind({
        address,
        network
      })
      .onEventBidderRegistered(async (event, ctx) => {
        ctx.eventLogger.emit('bidder_registry_bidder_registered', {
          bidder: event.args.bidder,
          depositedAmount: event.args.depositedAmount.toString(),
          windowNumber: event.args.windowNumber.toString(),
        });
      })
      .onEventBidderWithdrawal(async (event, ctx) => {
        ctx.eventLogger.emit('bidder_registery_bidder_withdrawal', {
          bidder: event.args.bidder,
          window: event.args.window.toString(),
          amount: event.args.amount.toString(),
        });
      })
      .onEventBlockTrackerUpdated(async (event, ctx) => {
        ctx.eventLogger.emit('bidder_registry_block_tracker_updated', {
          newBlockTracker: event.args.newBlockTracker,
        });
      })
      .onEventFundsRetrieved(async (event, ctx) => {
        ctx.eventLogger.emit('bidder_registry_funds_retrieved', {
          bidder: event.args.bidder,
          amount: event.args.amount.toString(),
        });
      })
      .onEventFundsRewarded(async (event, ctx) => {
        ctx.eventLogger.emit('bidder_registry_funds_rewarded', {
          bidder: event.args.bidder,
          amount: event.args.amount.toString(),
        });
      })
}