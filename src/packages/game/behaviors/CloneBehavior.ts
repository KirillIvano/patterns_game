import {IRowEntry} from '@/packages/game/interfaces/IRowEntry';

export class CloneBehavior {
    clone(source: IRowEntry) {
        source.insertNext(source.unit());
    }
}
