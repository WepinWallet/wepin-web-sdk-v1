import { RpcUrlType } from '../types/info.js';
export interface NetworkInformation {
    rpcUrl: RpcUrlType[];
    chainId: string;
}
export declare const getNetworkInfoByName: (network: string, withoutCache?: boolean) => Promise<NetworkInformation>;
/**
 * Check the valid chain ID to change the chainId to network
 *'0x'-prefixed string. (default: ethereum)
 * @param chainId - The chain ID to validate.
 * @returns network e.g) ethereum, klaytn
 */
export declare const getNetworkByChainId: (chainId: unknown, withoutCache?: boolean) => Promise<string>;
