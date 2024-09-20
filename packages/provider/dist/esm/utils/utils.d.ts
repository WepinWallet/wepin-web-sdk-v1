import { PendingJsonRpcResponse } from 'json-rpc-engine';
export declare const getRpcPromiseCallback: (resolve: (value?: any) => void, reject: (error?: Error) => void, unwrapResult?: boolean) => (error: Error, response: PendingJsonRpcResponse<unknown>) => void;
/**
 * Checks whether the given chain ID is valid, meaning if it is non-empty,
 * '0x'-prefixed string.
 *
 * @param chainId - The chain ID to validate.
 * @returns Whether the given chain ID is valid.
 */
export declare const isValidChainId: (chainId: unknown) => chainId is string;
export declare const isEthChainId: (chainId: unknown) => chainId is string;
export declare const isSolChain: (chainId: string) => boolean;
export declare const getAddress: (network: string, address?: string) => string;
