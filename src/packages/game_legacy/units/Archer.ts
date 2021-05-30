import {IUnit} from '@/packages/game/interfaces/IUnit';

export class Archer implements IUnit {
    id: number;
    name: string;
    maxHealth: number;
    health: number;
    attack: number;
    defence: number;
    cost: number;

    constructor(proto: IUnitPrototype) {
        this.id = proto.id;
        this.name = proto.name;
        this.maxHealth = proto.maxHealth;
        this.health = proto.maxHealth;
        this.attack = proto.attack;
        this.defence = proto.defence;
        this.cost = proto.cost;
    }
}
