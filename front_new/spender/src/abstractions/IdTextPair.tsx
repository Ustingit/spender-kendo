export interface IdTextPair {
    id: number;
    name: string;
}

export interface IdTextPairWithParent extends IdTextPair {
    id: number;
    name: string;
    parent?: number | null;
}