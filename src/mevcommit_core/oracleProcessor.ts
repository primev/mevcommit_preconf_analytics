import { EthChainId } from "@sentio/sdk/eth";
import { OracleProcessor } from '../types/eth/oracle.js';


export function initOracleProcessor() {
    OracleProcessor.bind({
    address: '0xCd27C2Dc26d37Bb17686F709Db438D3Dc546437C', // 0.8.0
    network: EthChainId.METIS   // overwrite metis chainID for mev-commit data
  })
    .onEventCommitmentProcessed(async (event, ctx) => {
        ctx.eventLogger.emit('oracle_commitment_processed', {
          commitmentIndex: event.args.commitmentIndex.toString(),
          commitmentProcessed: event.args.isSlash,
        });
      })

  }