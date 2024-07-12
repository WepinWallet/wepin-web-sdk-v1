export interface SupportNetwork {
    coinId: number;
}
export declare enum NFTContractScheme {
    ERC721 = 1,
    ERC1155 = 2
}
export declare enum NFTTokenContentType {
    image = 1,
    video = 2
}
export interface IAppNFT {
    contract: {
        address: string;
        scheme: NFTContractScheme;
        description: string;
        network: string;
        externalLink: string;
        imageUrl: string;
    };
    id: string;
    accountId: string;
    name: string;
    description: string;
    tokenId: string;
    externalLink: string;
    imageUrl: string;
    contentUrl: string;
    quantity: number;
    contentType: NFTTokenContentType;
}
