import GamepadAPI from './controls/GamepadAPI';
import KeyboardInput from './controls/KeyboardInput';
import Sprite from './object/Sprite';

export class CharacterController {
  sprite: Sprite;
  gamepadAPI: GamepadAPI;
  movementSpeed: number = 100;
  joystickThreshold: number = 0.25;
  keyboardInput: KeyboardInput = new KeyboardInput();

  constructor(
    sprite: Sprite,
    gamepadAPI: GamepadAPI,
    movementSpeed: number = 100,
    joystickThreshold: number = 0.25
  ) {
    this.sprite = sprite;
    this.gamepadAPI = gamepadAPI;
    this.movementSpeed = movementSpeed;
    this.joystickThreshold = joystickThreshold;
  }

  update() {
    this.gamepadAPI.update();

    if (this.gamepadAPI.turbo) {
      const rawXAxis = this.gamepadAPI.axesStatus[0];
      const rawYAxis = this.gamepadAPI.axesStatus[1];

      if (
        rawXAxis > this.joystickThreshold ||
        rawXAxis < -this.joystickThreshold
      ) {
        this.sprite.movementVector.x = rawXAxis * 2 * this.movementSpeed;
      } else this.sprite.movementVector.x = 0;

      // if (this.sprite.movementVector.x < 0 && this.sprite.pos.x <= 1)
      //   this.sprite.movementVector.x = 0;
      // if (
      //   this.sprite.movementVector. > 0 &&
      //   this.boxX >= this.ctx.canvas.width - (this.boxSize + 1)
      // )
      //   this.boxXVector = 0;

      if (
        rawYAxis > this.joystickThreshold ||
        rawYAxis < -this.joystickThreshold
      ) {
        this.sprite.movementVector.y = rawYAxis * 2 * this.movementSpeed;
      } else this.sprite.movementVector.y = 0;

      // if (this.boxYVector < 0 && this.boxY <= 1) this.boxYVector = 0;
      // if (
      //   this.boxYVector > 0 &&
      //   this.boxY >= this.ctx.canvas.height - (this.boxSize + 1)
      // )
      //   this.boxYVector = 0;
    }
  }
}

export default CharacterController;
