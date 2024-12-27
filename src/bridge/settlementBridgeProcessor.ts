import { EthChainId } from "@sentio/sdk/eth";
import { SettlementGatewayProcessor } from '../types/eth/settlementgateway.js';

export function initSettlementGatewayProcessor(
  address: string,
  network: EthChainId
) {
    SettlementGatewayProcessor.bind({
      address,
      network
    })
    .onEventTransferFinalized(async (event, ctx) => {
      ctx.eventLogger.emit('settlement_bridge_transfer_finalized', {
        amount: event.args.amount.toString(),
        counterpartyIdx: event.args.counterpartyIdx.toString(),
        recipient: event.args.recipient,
      });
    })
    .onEventTransferInitiated(async (event, ctx) => {
      ctx.eventLogger.emit('settlement_bridge_transfer_initiated', {
        sender: event.args.sender,
        recipient: event.args.recipient,
        amount: event.args.amount.toString(),
        transferIdx: event.args.transferIdx.toString(),
      });
    });
}