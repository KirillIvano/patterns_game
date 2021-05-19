// представление общих для всех юнитов параметров общие параметры
export class UnitMeta {
    constructor(
        public readonly armor: number,
        public readonly price: number,
        public readonly attack: number,
    ) {}
}
