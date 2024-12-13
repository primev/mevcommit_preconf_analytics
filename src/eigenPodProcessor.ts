import { 
  DenebForkTimestampUpdatedEvent,
  NewTotalSharesEvent,
  PodDeployedEvent,
  PodSharesUpdatedEvent
} from './types/eth/ieigenpodmanagerevents.js'
import { EthChainId, EthContext } from "@sentio/sdk/eth";
import { IEigenPodManagerEventsProcessor } from './types/eth/ieigenpodmanagerevents.js'

export function initEigenPodManagerEventsProcessor(
  address: string = '0x91E677b07F7AF907ec9a428aafA9fc14a0d3A338', // eigenpod contract
  startBlock: number = 15445564
) {
  return IEigenPodManagerEventsProcessor.bind({
    address: address,
    network: EthChainId.ETHEREUM,
    startBlock: startBlock
  })
  .onEventDenebForkTimestampUpdated(async (event: DenebForkTimestampUpdatedEvent, ctx: EthContext) => {
    ctx.eventLogger.emit('deneb_fork_timestamp_updated', {
      denebForkTimestamp: event.args.denebForkTimestamp.toString()
    });
  })
  .onEventNewTotalShares(async (event: NewTotalSharesEvent, ctx: EthContext) => {
    ctx.eventLogger.emit('new_total_shares', {
      podOwner: event.args.podOwner,
      newTotalShares: event.args.newTotalShares.toString()
    });
  })
  .onEventPodDeployed(async (event: PodDeployedEvent, ctx: EthContext) => {
    ctx.eventLogger.emit('pod_deployed', {
      eigenPod: event.args.eigenPod,
      podOwner: event.args.podOwner
    });
  })
  .onEventPodSharesUpdated(async (event: PodSharesUpdatedEvent, ctx: EthContext) => {
    ctx.eventLogger.emit('pod_shares_updated', {
      podOwner: event.args.podOwner,
      sharesDelta: event.args.sharesDelta.toString()
    });
  });
}