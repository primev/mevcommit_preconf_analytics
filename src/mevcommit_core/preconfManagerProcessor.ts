import { EthChainId } from "@sentio/sdk/eth";
import { PreconfManagerProcessor } from '../types/eth/preconfmanager.js';

export function initPreconfManagerProcessor() {
    PreconfManagerProcessor.bind({
    address: '0xa254D1A10777e358B0c2e945343664c7309A0D9d', // 0.8.0
    network: EthChainId.METIS   // overwrite metis chainID for mev-commit data
  })
    .onEventUnopenedCommitmentStored(async (event, ctx) => {
      ctx.eventLogger.emit('preconf_manager_unopened_commitments', {
        commitmentDigest: event.args.commitmentDigest,
        commitmentIndex: event.args.commitmentIndex.toString(),
        committer: event.args.committer,
        commitmentSignature: event.args.commitmentSignature,
        dispatchTimestamp: event.args.dispatchTimestamp.toString()
      });
    })
    .onEventOpenedCommitmentStored(async (event, ctx) => {
      ctx.eventLogger.emit('preconf_manager_opened_commitments', {
        bidder: event.args.bidder,
        bidAmt: event.args.bidAmt.toString(),
        commitmentIndex: event.args.commitmentIndex.toString(),
        committer: event.args.committer,
        blockNumber: event.args.blockNumber.toString(),
        bidHash: event.args.bidHash,
        decayStartTimeStamp: event.args.decayStartTimeStamp.toString(),
        decayEndTimeStamp: event.args.decayEndTimeStamp.toString(),
        txnHash: event.args.txnHash,
        revertingTxHashes: event.args.revertingTxHashes,
        commitmentDigest: event.args.commitmentDigest,
        bidSignature: event.args.bidSignature,
        commitmentSignature: event.args.commitmentSignature,
        dispatchTimestamp: event.args.dispatchTimestamp.toString(),
        sharedSecretKey: event.args.sharedSecretKey
      });
    })
}