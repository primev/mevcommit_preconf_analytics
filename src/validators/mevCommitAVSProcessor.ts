import { MevCommitAVSProcessor } from "../types/eth/mevcommitavs.js";
import { EthChainId } from "@sentio/sdk/eth";

export function initMevCommitAVSProcessor(
  address: string,
  network: EthChainId
) {
    return MevCommitAVSProcessor.bind({
        address,
        network
    })
    .onEventValidatorRegistered(async (event, ctx) => {
        ctx.eventLogger.emit("mevcommit_avs_validator_registered", {
            podOwner: event.args.podOwner,
            validatorPubKey: event.args.validatorPubKey
        });
    });
}