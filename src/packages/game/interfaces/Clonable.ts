export interface Clonable {
    clone(): void;
}
export interface Cloner {
    cloneUnit(unit: Clonable): void;
}
