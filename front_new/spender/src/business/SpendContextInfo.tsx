import { IdTextPair } from "../abstractions/IdTextPair";
import SpendType from "./SpendType";

export default class SpendContext {
    constructor(types: SpendType[], subTypes: IdTextPair[], directions: IdTextPair[]) {
        this.subTypes = subTypes || [];
        this.directions = directions || [];
        this.types = types || [];
    }

    types: SpendType[];
    subTypes: IdTextPair[];
    directions: IdTextPair[];
}