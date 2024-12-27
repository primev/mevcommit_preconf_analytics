import { EthChainId } from "@sentio/sdk/eth";
import { OracleProcessor } from '../types/eth/oracle.js';


export function initOracleProcessor(
  address: string,
  network: EthChainId
) {
    OracleProcessor.bind({
      address,
      network
    })
    .onEventCommitmentProcessed(async (event, ctx) => {
        ctx.eventLogger.emit('oracle_commitment_processed', {
          commitmentIndex: event.args.commitmentIndex.toString(),
          commitmentProcessed: event.args.isSlash,
        });
      })

  }