import { MevCommitAVSProcessor } from "../types/eth/mevcommitavs.js";

export function initMevCommitAVSProcessor() {
    return MevCommitAVSProcessor.bind({
        address: '0xBc77233855e3274E1903771675Eb71E602D9DC2e'
    })
    .onEventValidatorRegistered(async (event, ctx) => {
        ctx.eventLogger.emit("mevcommit_avs_validator_registered", {
            podOwner: event.args.podOwner,
            validatorPubKey: event.args.validatorPubKey
        });
    });
}