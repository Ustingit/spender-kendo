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

    getTypesByDirection(direction: number, selectedType: number | null = null) : SpendType[] {
        var result = this.types.filter(t => t.direction === direction) || [];

        if (selectedType !== null) {
            result.forEach(item => item.selected = item.id === selectedType);
        }

        return result;
    }

    getSubTypesByType(type: number, selectedSubType: number | null = null) : IdTextPairWithParent[] {
        var result = this.subTypes.filter(st => st.parent == type) || [];

        if (selectedSubType !== null) {
            result.forEach(item => item.selected = item.id === selectedSubType);
        }

        return result;
    }

    getDirectionsWithSelected(selectedDirection: number = this.defaultDirection) : IdTextPair[] {
        var result = this.directions;

        result.forEach(item => {
            item.selected = item.id === selectedDirection;
        });

        return result;
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