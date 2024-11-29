import { ToyRobot, ToyRobotReportReturnValue } from './toyRobot';
import { ToyDirection } from './toyDirectionsEnum';
import { ToyCommand, ToyCommandEnum, PlaceToyCommand, PlaceToyCommandParams } from './toyCommand';

describe('ToyRobot', () => {
  let toyRobot: ToyRobot;

  beforeEach(() => {
    toyRobot = new ToyRobot(5, 5, ToyDirection.NORTH); // Initialize a 5x5 board facing NORTH
  });

  it('should initialize correctly', () => {
    expect(toyRobot.x).toBe(0);
    expect(toyRobot.y).toBe(0);
    expect(toyRobot.width).toBe(5);
    expect(toyRobot.height).toBe(5);
    expect(toyRobot.direction).toBe(ToyDirection.NORTH);
  });

  it('should execute PLACE command correctly', () => {
    const params: PlaceToyCommandParams = { x: 3, y: 2, direction: ToyDirection.SOUTH };
    const command: PlaceToyCommand = { value: ToyCommandEnum.PLACE, params };

    toyRobot.executeCommand(command);

    expect(toyRobot.x).toBe(3);
    expect(toyRobot.y).toBe(2);
    expect(toyRobot.direction).toBe(ToyDirection.SOUTH);
  });

  it('should ignore PLACE command if position is invalid', () => {
    const params: PlaceToyCommandParams = { x: 6, y: 6, direction: ToyDirection.EAST };
    const command: PlaceToyCommand = { value: ToyCommandEnum.PLACE, params };

    toyRobot.executeCommand(command);

    expect(toyRobot.x).toBe(0);
    expect(toyRobot.y).toBe(0);
    expect(toyRobot.direction).toBe(ToyDirection.NORTH);
  });

  it('should move correctly with MOVE command', () => {
    toyRobot.executeCommand({ value: ToyCommandEnum.MOVE });

    expect(toyRobot.x).toBe(0);
    expect(toyRobot.y).toBe(1);
  });

  it('should not move out of bounds with MOVE command', () => {
    for (let i = 0; i < 10; i++) {
      toyRobot.executeCommand({ value: ToyCommandEnum.MOVE }); // Move NORTH repeatedly
    }

    expect(toyRobot.y).toBe(4); // Should stop at the top edge
    expect(toyRobot.x).toBe(0);
  });

  it('should rotate correctly with LEFT command', () => {
    toyRobot.executeCommand({ value: ToyCommandEnum.LEFT });
    expect(toyRobot.direction).toBe(ToyDirection.EAST);

    toyRobot.executeCommand({ value: ToyCommandEnum.LEFT });
    expect(toyRobot.direction).toBe(ToyDirection.SOUTH);
  });

  it('should rotate correctly with RIGHT command', () => {
    toyRobot.executeCommand({ value: ToyCommandEnum.RIGHT });
    expect(toyRobot.direction).toBe(ToyDirection.WEST);

    toyRobot.executeCommand({ value: ToyCommandEnum.RIGHT });
    expect(toyRobot.direction).toBe(ToyDirection.SOUTH);
  });

  it('should report the correct position and direction', () => {
    const params: PlaceToyCommandParams = { x: 2, y: 3, direction: ToyDirection.EAST };
    const command: PlaceToyCommand = { value: ToyCommandEnum.PLACE, params };

    toyRobot.executeCommand(command);

    const report: ToyRobotReportReturnValue = toyRobot.executeCommand({
      value: ToyCommandEnum.REPORT,
    }) as ToyRobotReportReturnValue;

    expect(report).toEqual({ x: 2, y: 3, direction: ToyDirection.EAST });
  });

  it('should update board dimensions dynamically', () => {
    toyRobot.setHeightAndWidth(10, 10);
    expect(toyRobot.width).toBe(10);
    expect(toyRobot.height).toBe(10);
  });

  it('should move correctly after resizing the board', () => {
    toyRobot.setHeightAndWidth(10, 10);

    const params: PlaceToyCommandParams = { x: 9, y: 9, direction: ToyDirection.NORTH };
    toyRobot.executeCommand({ value: ToyCommandEnum.PLACE, params });

    toyRobot.executeCommand({ value: ToyCommandEnum.MOVE });
    expect(toyRobot.y).toBe(9); // Should not move beyond the board edge
  });
});
