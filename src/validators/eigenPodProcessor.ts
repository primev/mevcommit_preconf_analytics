import { 
  DenebForkTimestampUpdatedEvent,
  NewTotalSharesEvent,
  PodDeployedEvent,
  PodSharesUpdatedEvent
} from '../types/eth/ieigenpodmanagerevents.js'
import { EthChainId, EthContext, EthFetchConfig } from "@sentio/sdk/eth";
import { IEigenPodManagerEventsProcessor } from '../types/eth/ieigenpodmanagerevents.js'

// Define event type constants
export const DENEB_FORK_TIMESTAMP_UPDATED_EVENT = "DenebForkTimestampUpdated";
export const NEW_TOTAL_SHARES_EVENT = "NewTotalShares";
export const POD_DEPLOYED_EVENT = "PodDeployed";
export const POD_SHARES_UPDATED_EVENT = "PodSharesUpdated";
export const project = "eigen_pod_manager";

const ethconfig: EthFetchConfig = {
  transaction: true,
  transactionReceipt: true,
  transactionReceiptLogs: true,
  block: true,
  trace: false
};

export function initEigenPodManagerEventsProcessor(
  address: string = '0x91E677b07F7AF907ec9a428aafA9fc14a0d3A338', // eigenpodManager contract
  startBlock: number = 16500000
) {
  return IEigenPodManagerEventsProcessor.bind({
    address: address,
    network: EthChainId.ETHEREUM,
    startBlock: startBlock
  })
  .onEventDenebForkTimestampUpdated(async (event: DenebForkTimestampUpdatedEvent, ctx: EthContext) => {
    const name = 'egeinpod_deneb_fork_timestamp_updated'
    const {
      denebForkTimestamp
    } = event.args;
    ctx.eventLogger.emit(name, {
      project: project,
      eventType: DENEB_FORK_TIMESTAMP_UPDATED_EVENT,
      denebForkTimestamp: denebForkTimestamp,
      from_address: ctx.transaction?.from,
      gas_price: ctx.transaction?.gasPrice,
      max_priority_gas: ctx.transaction?.maxPriorityFeePerGas,
      max_fee_per_gas: ctx.transaction?.maxFeePerGas,
      effective_gas_price: ctx.transactionReceipt?.effectiveGasPrice
    });
  }, undefined, ethconfig, undefined)
  .onEventNewTotalShares(async (event: NewTotalSharesEvent, ctx: EthContext) => {
    const name = 'eigenpod_new_total_shares'
    const {
      podOwner,
      newTotalShares
    } = event.args;
    ctx.eventLogger.emit(name, {
      project: project,
      eventType: NEW_TOTAL_SHARES_EVENT,
      podOwner,
      newTotalShares: newTotalShares,
      from_address: ctx.transaction?.from,
      gas_price: ctx.transaction?.gasPrice,
      max_priority_gas: ctx.transaction?.maxPriorityFeePerGas,
      max_fee_per_gas: ctx.transaction?.maxFeePerGas,
      effective_gas_price: ctx.transactionReceipt?.effectiveGasPrice
    });
  }, undefined, ethconfig, undefined)
  .onEventPodDeployed(async (event: PodDeployedEvent, ctx: EthContext) => {
    const name = 'eigenpod_pod_deployed'
    const {
      eigenPod,
      podOwner
    } = event.args;
    ctx.eventLogger.emit(name, {
      project: project,
      eventType: POD_DEPLOYED_EVENT,
      eigenPod,
      podOwner,
      from_address: ctx.transaction?.from,
      gas_price: ctx.transaction?.gasPrice,
      max_priority_gas: ctx.transaction?.maxPriorityFeePerGas,
      max_fee_per_gas: ctx.transaction?.maxFeePerGas,
      effective_gas_price: ctx.transactionReceipt?.effectiveGasPrice
    });
  }, undefined, ethconfig, undefined)
  .onEventPodSharesUpdated(async (event: PodSharesUpdatedEvent, ctx: EthContext) => {
    const name = 'eigenpod_pod_shares_updated'
    const {
      podOwner,
      sharesDelta
    } = event.args;
    ctx.eventLogger.emit(name, {
      project: project,
      eventType: POD_SHARES_UPDATED_EVENT,
      podOwner,
      sharesDelta: sharesDelta,
      from_address: ctx.transaction?.from,
      gas_price: ctx.transaction?.gasPrice,
      max_priority_gas: ctx.transaction?.maxPriorityFeePerGas,
      max_fee_per_gas: ctx.transaction?.maxFeePerGas,
      effective_gas_price: ctx.transactionReceipt?.effectiveGasPrice
    });
  }, undefined, ethconfig, undefined)
}