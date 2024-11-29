import { ToyDirection } from "./toyDirectionsEnum";

export enum ToyCommandEnum {
    PLACE, LEFT, RIGHT, REPORT, MOVE
}

export abstract class ToyCommand {
    abstract value: ToyCommandEnum;
    abstract params?: {} | undefined;
}

export class LeftPlaceToyCommand extends ToyCommand {
    value = ToyCommandEnum.LEFT;
    params = undefined;
}

export class RightPlaceToyCommand extends ToyCommand {
    value = ToyCommandEnum.RIGHT;
    params = undefined;
}

export class ReportToyCommand extends ToyCommand {
    value = ToyCommandEnum.REPORT;
    params = undefined;
}

export class MoveToyCommand extends ToyCommand {
    value = ToyCommandEnum.MOVE;
    params = undefined;
}

export type PlaceToyCommandParams = {x: number, y: number, direction: ToyDirection};

export class PlaceToyCommand extends ToyCommand {
    value = ToyCommandEnum.PLACE;
    override params: PlaceToyCommandParams;

    constructor(params: PlaceToyCommandParams) {
        super(); this.params = params;
    }
}