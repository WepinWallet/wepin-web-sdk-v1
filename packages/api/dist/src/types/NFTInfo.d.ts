export declare const NFTScheme: readonly ["ERC721", "ERC1155"];
export declare const NFTContentType: readonly ["image", "video "];
export interface NFTInfo {
    address: string;
    network: string;
    contract: {
        address: string;
        scheme: (typeof NFTScheme)[number];
    };
    name: string;
    description: string;
    externalLink: string;
    imageUrl: string;
    contentUrl: string;
    quantity?: number;
    contentType: (typeof NFTContentType)[number];
}
