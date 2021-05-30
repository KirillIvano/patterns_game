import {Game, GameParams, GameParamsDto} from './Game';
import {IUnit} from './interfaces/IUnit';

class UnitFactory {
    private static readonly _unitFactory: UnitFactory | null = null;

    // eslint-disable-next-line @typescript-eslint/no-empty-function
    private constructor() {}
    static getInstance() {
        return this._unitFactory;
    }
    getRandomUnitByCost(): IUnit {
        return this;
    }
}
const unitFactory = UnitFactory.getInstance();

export class ArmyGenerator {
    public generateRandomUnit(cost: number):  {

    }

    public generate(cost: number) {

    }
}

export class EnhancedGame {
    constructor(private readonly game: Game) {

    }

    generateArmy() {

    }

    run(gameParams: GameParamsDto) {
        const {} = gameParams;

        return this.game.run();
    }
}
