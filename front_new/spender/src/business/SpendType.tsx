import { IdTextPair } from "../abstractions/IdTextPair";

export default class SpendType implements IdTextPair {
    constructor(id: number, name: string, direction: number) {
        this.id = id;
        this.name = name;
        this.direction = direction;
        this.selected = false;
    }

    id: number;
    name: string;
    direction: number;
    selected: boolean;
}