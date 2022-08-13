import GamepadAPI from './controls/GamepadAPI';
import KeyboardInput from './controls/KeyboardInput';
import Sprite from './object/Sprite';

/**
 * A character controller, multiplexing gamepad and keyboard inputs to apply
 * character controls to a sprite.
 *
 * @author Liz Ainslie
 */
export class CharacterController {
  private readonly keyboardInput: KeyboardInput = new KeyboardInput();
  private readonly gamepadAPI: GamepadAPI;

  /**
   * The sprite this character controller applies to.
   *
   * @author Liz Ainslie
   */
  sprite: Sprite;

  /**
   * The base movement speed of this character.
   *
   * @author Liz Ainslie
   */
  movementSpeed: number = 100;

  /**
   * The threshold for reading joystick input. Necessary so the tiniest joystick
   * movements that are constantly happening don't send the sprite careening
   * offscreen.
   *
   * @author Liz Ainslie
   */
  joystickThreshold: number = 0.25;

  /**
   * A speed modifier for sprinting, represented as a percentage.
   *
   * @author Liz Ainslie
   */
  sprintModifier: number = 1.35;

  /**
   * Construct a new character controller.
   *
   * @param sprite The sprite to control.
   * @param gamepadAPI The gamepad API to use for controller input.
   * @param movementSpeed The base movement speed
   * @param joystickThreshold The joystick threshold to accept joystick input.
   * @param sprintModifier The modifier to apply when the player is sprinting.
   *
   * @author Liz Ainslie
   */
  constructor(
    sprite: Sprite,
    gamepadAPI: GamepadAPI,
    movementSpeed: number = 100,
    joystickThreshold: number = 0.25,
    sprintModifier: number = 1.35
  ) {
    this.sprite = sprite;
    this.gamepadAPI = gamepadAPI;
    this.movementSpeed = movementSpeed;
    this.joystickThreshold = joystickThreshold;
    this.sprintModifier = sprintModifier;
  }

  /**
   * Update loop code for the character controller. This reads gamepad and
   * keyboard values and updates the movement vector of the sprite, and prefers
   * keyboard values over controller.
   *
   * @author Liz Ainslie
   */
  update() {
    this.gamepadAPI.update();

    if (this.gamepadAPI.turbo) {
      const rawXAxis = this.gamepadAPI.axesStatus[0];
      const rawYAxis = this.gamepadAPI.axesStatus[1];

      const sprintMod: number = this.gamepadAPI.buttonPressed('LS') ? this.sprintModifier : 1;

      if (
        rawXAxis > this.joystickThreshold ||
        rawXAxis < -this.joystickThreshold
      ) {
        this.sprite.movementVector.x = rawXAxis * 2 * this.movementSpeed * sprintMod;
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
        this.sprite.movementVector.y = rawYAxis * 2 * this.movementSpeed * sprintMod;
      } else this.sprite.movementVector.y = 0;

      // if (this.boxYVector < 0 && this.boxY <= 1) this.boxYVector = 0;
      // if (
      //   this.boxYVector > 0 &&
      //   this.boxY >= this.ctx.canvas.height - (this.boxSize + 1)
      // )
      //   this.boxYVector = 0;
    }

    let keyboardXValue = 0;
    let keyboardYValue = 0;

    const upPressed = this.keyboardInput.isKeyPressed('w') || this.keyboardInput.isKeyPressed('ArrowUp');
    const leftPressed = this.keyboardInput.isKeyPressed('a') || this.keyboardInput.isKeyPressed('ArrowLeft');
    const downPressed = this.keyboardInput.isKeyPressed('s') || this.keyboardInput.isKeyPressed('ArrowDown');
    const rightPressed = this.keyboardInput.isKeyPressed('d') || this.keyboardInput.isKeyPressed('ArrowRight');

    if (upPressed) keyboardYValue = -1;
    if (leftPressed) keyboardXValue = -1;
    if (downPressed) keyboardYValue = 1;
    if (rightPressed) keyboardXValue = 1;

    if (upPressed && downPressed) keyboardYValue = 0;
    if (leftPressed && rightPressed) keyboardXValue = 0;

    if (this.keyboardInput.isShiftPressed) {
      keyboardXValue *= this.sprintModifier;
      keyboardYValue *= this.sprintModifier;
    }

    this.sprite.movementVector.x = keyboardXValue * this.movementSpeed;
    this.sprite.movementVector.y = keyboardYValue * this.movementSpeed;
  }
}

export default CharacterController;
