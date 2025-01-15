import { BlockTrackerProcessor } from '../types/eth/blocktracker.js';
import { EthChainId } from "@sentio/sdk/eth";


import { EthFetchConfig } from '@sentio/protos'

const ethconfig: EthFetchConfig = {
  transaction: true,
  transactionReceipt: true,
  transactionReceiptLogs: true,
  block: true,
  trace: false
}

export function initBlockTrackerProcessor(
  address: string,
  network: EthChainId
) {
  BlockTrackerProcessor.bind({
    address,
    network
  })
  .onEventNewL1Block(
    async (event, ctx) => {
      ctx.eventLogger.emit('block_tracker_new_l1_blocks', {
        project: 'block_tracker',
        eventType: 'NewL1Block',
        blockNumber: event.args.blockNumber,
        winner: event.args.winner,
        window: event.args.window
      });
    },
  )
}