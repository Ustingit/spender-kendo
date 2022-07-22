export interface IdTextPair {
    id: number;
    name: string;
    selected: boolean;
}

export interface IdTextPairWithParent extends IdTextPair {
    id: number;
    name: string;
    parent?: number | null;
    selected: boolean;
}