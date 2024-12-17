import { EthChainId } from "@sentio/sdk/eth";
import { IEigenPodManagerEventsProcessor } from './types/eth/ieigenpodmanagerevents.js'
import { Validator } from './schema/store.js';

export function initEigenPodManagerEventsProcessor(
  address: string = '0x91E677b07F7AF907ec9a428aafA9fc14a0d3A338',
  startBlock: number = 15445564
) {
  return IEigenPodManagerEventsProcessor.bind({
    address: address,
    network: EthChainId.ETHEREUM,
    startBlock: startBlock
  })
  .onEventPodDeployed(async (event, ctx) => {
    ctx.eventLogger.emit('pod_deployed', {
      eigenPod: event.args.eigenPod,
      podOwner: event.args.podOwner
    });

    // Find the validator by podOwner
    const validators = await ctx.store.list(Validator, [
      { field: "podOwner", op: "=", value: event.args.podOwner }
    ]);

    // Assuming one-to-one mapping between podOwner and validatorPubKey.
    // If multiple matches are possible, handle accordingly.
    if (validators.length > 0) {
      const validator = validators[0];
      validator.eigenPod = event.args.eigenPod;
      validator.isPodDeployed = true;
      await ctx.store.upsert(validator);
    }
  });
}
