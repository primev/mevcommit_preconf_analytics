import { MevCommitAVSProcessor } from "./types/eth/mevcommitavs.js";
import { Validator } from './schema/store.js';

export function initMevCommitAVSProcessor() {
    return MevCommitAVSProcessor.bind({
        address: '0xBc77233855e3274E1903771675Eb71E602D9DC2e'
    })
    .onEventValidatorRegistered(async (event, ctx) => {
        ctx.eventLogger.emit("mevcommit_avs_validator_registered", {
            podOwner: event.args.podOwner,
            validatorPubKey: event.args.validatorPubKey
        });
        
        // Create or update the Validator entity
        const validator = new Validator({
            id: event.args.validatorPubKey,
            validatorPubKey: event.args.validatorPubKey,
            podOwner: event.args.podOwner,
            eigenPod: "",           // Not known yet
            isRegistered: true,
            isPodDeployed: false    // Not known yet
        });
        
        await ctx.store.upsert(validator);
    });
}
