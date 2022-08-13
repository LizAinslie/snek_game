/**
 * The GamepadAPI class adds support for the browser Gamepad API, allowing the
 * implementation of controller support in games.
 *
 * @author Liz Ainslie
 */
export class GamepadAPI {
  /**
   * A list of available controller buttons, normalized to a singular list for
   * development purposes.
   *
   * @author Liz Ainslie
   */
  static buttons = [
    'A',
    'B',
    'X',
    'Y',
    'LB',
    'RB',
    'LT',
    'RT',
    'Share',
    'Option',
    'LS',
    'RS',
    'Up',
    'Down',
    'Left',
    'Right',
    'Power',
    'Touchpad',
  ];

  controllerIndex?: number;
  turbo: boolean = false;
  buttonsCache: string[] = [];
  buttonsStatus: string[] = [];
  axesStatus: number[] = [];

  /**
   * Construct a new gamepad input processor.
   *
   * @author Liz Ainslie
   */
  constructor() {
    this.connectHandler = this.connectHandler.bind(this);
    this.disconnectHandler = this.disconnectHandler.bind(this);

    window.addEventListener('gamepadconnected', this.connectHandler);
    window.addEventListener('gamepaddisconnected', this.disconnectHandler);
  }

  private disconnectHandler(_event: GamepadEvent) {
    this.turbo = false;
    delete this.controllerIndex;
    console.log('Gamepad disconnected');
  }

  private connectHandler(event: GamepadEvent) {
    this.controllerIndex = event.gamepad.index;
    this.turbo = true;
    console.log('Gamepad connected', event.gamepad);
  }

  /**
   * Called in a game's update loop, reads and processes controller input data
   * for use in game logic.
   *
   * @author Liz Ainslie
   */
  update() {
    this.buttonsCache = []; // Clear the buttons cache

    if (!this.controllerIndex) {
      this.turbo = false;
      return;
    }

    // Move the buttons status from the previous frame to the cache
    for (let k = 0; k < this.buttonsStatus.length; k++)
      this.buttonsCache[k] = this.buttonsStatus[k];

    this.buttonsStatus = []; // Clear the buttons status
    const c: Gamepad =
      navigator.getGamepads()[this.controllerIndex] || ({} as Gamepad); // Get the gamepad object

    // Loop through buttons and push the pressed ones to the array
    const pressed = [];
    if (c.buttons)
      for (let b = 0; b < c.buttons.length; b++)
        if (c.buttons[b].pressed) pressed.push(GamepadAPI.buttons[b]);

    // Loop through axes and push their values to the array
    const axes: number[] = [];
    if (c.axes)
      for (let a = 0; a < c.axes.length; a++)
        axes.push(parseInt(c.axes[a].toFixed(2)));

    // Assign received values
    this.axesStatus = axes;
    this.buttonsStatus = pressed;

    return pressed; // Return buttons for debugging purposes
  }

  /**
   * Check if a controller button is pressed.
   *
   * @param button The button to check.
   * @param hold Whether or not to ensure the button is held
   *
   * @author Liz Ainslie
   * @see GamepadAPI.buttons
   */
  buttonPressed(button: string, hold: boolean = false) {
    let newPress = false;

    // Loop through pressed buttons
    for (let i = 0; i < this.buttonsStatus.length; i++)
      if (this.buttonsStatus[i] === button) {
        newPress = true;

        if (!hold)
          // Loop through the cached states from the previous frame
          for (let j = 0; j < this.buttonsCache.length; j++)
            newPress = this.buttonsCache[j] !== button; // If the button was already pressed, ignore new press
      }
    return newPress;
  }
}

export default GamepadAPI;
