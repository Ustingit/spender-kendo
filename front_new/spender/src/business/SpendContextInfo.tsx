import { IdTextPair, IdTextPairWithParent } from "../abstractions/IdTextPair";
import SpendType from "./SpendType";

export default class SpendContext {
    constructor(types: SpendType[], subTypes: IdTextPairWithParent[], directions: IdTextPair[], defaultType: number, defaultSubType: number | null, defaultDirection: number) {
        this.subTypes = subTypes || [];
        this.directions = directions || [];
        this.types = types || [];
        this.defaultType = defaultType;
        this.defaultSubType = defaultSubType;
        this.defaultDirection = defaultDirection;

        this.initialMatchedTypes = types.filter(t => t.direction === defaultDirection) || [];
        this.initialMatchedSubTypes = this.subTypes.filter(st => st.parent && st.parent === defaultType) || [];
    }

    types: SpendType[];
    subTypes: IdTextPairWithParent[];
    directions: IdTextPair[];
    defaultType: number;
    defaultSubType: number | null;
    defaultDirection: number;

    initialMatchedTypes: SpendType[];
    initialMatchedSubTypes: IdTextPairWithParent[];
}