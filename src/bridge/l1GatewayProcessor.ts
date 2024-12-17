import { EthChainId, EthContext } from "@sentio/sdk/eth";
import { L1GatewayProcessor } from '../types/eth/l1gateway.js';
import { TransferFinalizedEvent, TransferInitiatedEvent } from '../types/eth/internal/L1Gateway.js';

export function initL1GatewayProcessor() {
  L1GatewayProcessor.bind({
    address: '0x567f0f6d4f7A306c9824d5Ffd0E26f39682cDd7c', // L1Gatway contract on Holesky v0.8.0
    network: EthChainId.HOLESKY
  })
    .onEventTransferFinalized(async (event: TransferFinalizedEvent, ctx: EthContext) => {
      ctx.eventLogger.emit('l1gatway_transfer_finalized', {
        counterpartyIdx: event.args.counterpartyIdx.toString(),
        amount: event.args.amount.toString(),
        recipient: event.args.recipient,
      });
    })
    .onEventTransferInitiated(async (event: TransferInitiatedEvent, ctx: EthContext) => {
      ctx.eventLogger.emit('l1gatway_transfer_initiated', {
        sender: event.args.sender,
        recipient: event.args.recipient,
        amount: event.args.amount.toString(),
        transferIdx: event.args.transferIdx.toString(),
      });
    })
}