import { Component, OnInit, HostListener } from '@angular/core';
import { ToyRobot, ToyRobotReportReturnValue } from './logic/toyRobot';
import { ToyDirection } from './logic/toyDirectionsEnum';
import { LeftPlaceToyCommand, MoveToyCommand, PlaceToyCommand, ReportToyCommand, RightPlaceToyCommand } from './logic/toyCommand';

@Component({
  selector: 'app-tabletop',
  imports: [],
  templateUrl: './tabletop.component.html',
  styleUrl: './tabletop.component.css'
})

export class TabletopComponent implements OnInit {
  // gridTableHeight = 5;
  // gridTableWidth = 5;
  toyRobot: ToyRobot | null = null;
  currentImage: string = '';
  
  constructor() {
  }

  ngOnInit(): void {
      // place toyRobot at position (0,0) facing north
      this.toyRobot = new ToyRobot(5, 5, ToyDirection.NORTH);
      this.calculateDirectionImage(this.toyRobot.direction);
  }

  reportToyRobotPosition(): void {
    if (this.toyRobot) {
      const response: null | ToyRobotReportReturnValue = this.toyRobot.executeCommand(new ReportToyCommand())
      alert(`The ToyRobot is in X: ${response?.x} Y: ${response?.y} facing ${response?.direction}`);
    } else {
      alert('The ToyRobot is not placed on the table.');
    }
  }

  moveToyRobot(): void {
    if (this.toyRobot) {
      this.toyRobot.executeCommand(new MoveToyCommand());
    }
  }

  rotateLeftToyRobot(): void {
    if (this.toyRobot) {
      this.toyRobot.executeCommand(new LeftPlaceToyCommand());
      this.calculateDirectionImage(this.toyRobot.direction);
    }
  }

  rotateRightToyRobot(): void {
    if (this.toyRobot) {
      this.toyRobot.executeCommand(new RightPlaceToyCommand());
      this.calculateDirectionImage(this.toyRobot.direction);
    }
  }

  placeToyRobot(x: number, y: number): void {
    if (this.toyRobot) {
      this.toyRobot.executeCommand(new PlaceToyCommand({x: x, y: y, direction: this.toyRobot.direction}))
    }
  }

  private calculateDirectionImage(direction: ToyDirection): void {
    switch(direction) {
      case ToyDirection.NORTH:
        this.currentImage = 'south.png';
      break;
      case ToyDirection.SOUTH:
        this.currentImage = 'north.png';
      break;
      case ToyDirection.EAST:
        this.currentImage = 'east.png';
      break;
      case ToyDirection.WEST:
        this.currentImage = 'west.png';
      break;
    }
  }

  resize(): void {
    this.toyRobot?.setHeightAndWidth(this.toyRobot?.height + 1, this.toyRobot.width + 1);
  }

  @HostListener('window:keydown', ['$event'])
  handleKeyDown(event: KeyboardEvent): void {
    switch (event.key) {
      case 'ArrowUp':
        this.moveToyRobot();
        break;
      case 'ArrowLeft':
        this.rotateLeftToyRobot();
        break;
      case 'ArrowRight':
       this.rotateRightToyRobot();
        break;
    }
  }

}
