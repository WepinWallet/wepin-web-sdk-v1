export interface InfoType {
    networks: NetworkInfo[];
}
export interface RpcUrlType {
    type: string;
    url: string;
}
export interface NetworkInfo {
    family: string;
    id: string;
    name: string;
    chainId: number;
    ticker: string;
    rpcUrl: RpcUrlType[];
    isTestnet?: boolean;
}
