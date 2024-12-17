import { EthChainId } from "@sentio/sdk/eth";
import { SettlementGatewayProcessor } from '../types/eth/settlementgateway.js';

export function initSettlementGatewayProcessor() {
    SettlementGatewayProcessor.bind({
    address: '0xFaF6F0d4bbc7bC33a4b403b274aBb82d0E794202',  // settlement bridge contract on mev-commit testnet v0.8.0
    network: EthChainId.METIS
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