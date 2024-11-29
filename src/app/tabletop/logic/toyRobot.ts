import { PlaceToyCommand, PlaceToyCommandParams, ToyCommand, ToyCommandEnum } from "./toyCommand";
import { ToyDirection } from "./toyDirectionsEnum";

export type ToyRobotReportReturnValue = {
    x: number;
    y: number;
    direction: ToyDirection;
}

export class ToyRobot {
    x: number = 0;
    y: number = 0;
    width: number;
    height: number;
    direction: ToyDirection;

    constructor(height: number , width: number, direction: ToyDirection) {
        this.width = width;
        this.height = height;
        this.direction = direction;
    }

    public executeCommand(command: ToyCommand): null | ToyRobotReportReturnValue {
        switch(command.value) {
            case (ToyCommandEnum.LEFT):
                this.executeLeftCommand();
            break;
            case (ToyCommandEnum.RIGHT):
                this.executeRightCommand();
            break;
            case (ToyCommandEnum.PLACE):
                const placeCommand = command as PlaceToyCommand;
                this.executePlaceCommand(placeCommand.params);
            break;
            case (ToyCommandEnum.MOVE):
                this.executeMoveCommand();
            break;
            case (ToyCommandEnum.REPORT):
               return this.executeReport();
            break;
        }
        return null;
    }

    private executeRightCommand(): void {
        switch(this.direction) {
            case ToyDirection.NORTH:
                this.direction = ToyDirection.WEST;
            break;
            case ToyDirection.WEST:
                this.direction = ToyDirection.SOUTH;
            break;
            case ToyDirection.SOUTH:
                this.direction = ToyDirection.EAST;
            break;
            case ToyDirection.EAST:
                this.direction = ToyDirection.NORTH;
            break;
        }
    }

    private executeLeftCommand(): void {
        switch(this.direction) {
            case ToyDirection.NORTH:
                this.direction = ToyDirection.EAST;
            break;
            case ToyDirection.EAST:
                this.direction = ToyDirection.SOUTH;
            break;
            case ToyDirection.SOUTH:
                this.direction = ToyDirection.WEST;
            break;
            case ToyDirection.WEST:
                this.direction = ToyDirection.NORTH;
            break;
        }
    }

    private executeMoveCommand(): void {
        switch(this.direction) {
            case ToyDirection.NORTH:
                if (this.checkValidPosition(this.x, this.y + 1)) {
                    this.y++;
                }
            break;
            case ToyDirection.SOUTH:
                if (this.checkValidPosition(this.x, this.y - 1)) {
                    this.y--;
                }
            break;
            case ToyDirection.EAST:
                if (this.checkValidPosition(this.x + 1, this.y)) {
                    this.x++;
                }
            break;
            case ToyDirection.WEST:
                if (this.checkValidPosition(this.x - 1, this.y)) {
                    this.x--;
                }
            break;
        }
    }

    private checkValidPosition(x: number, y: number): boolean {
       return x < this.width && y < this.height && x >= 0 && y >= 0;
    }

    private executePlaceCommand(params: PlaceToyCommandParams): void {
        if (this.checkValidPosition(params.x, params.y)) {
            this.x = params.x;
            this.y = params.y;
            this.direction = params.direction;
        }
    }

    private executeReport():ToyRobotReportReturnValue  {
        return {
            x: this.x,
            y: this.y,
            direction: this.direction
        }
    }

    public setHeightAndWidth(height: number, width: number): void {
        this.width = width;
        this.height = height;
    }
}

