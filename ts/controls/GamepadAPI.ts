import PointerLock from './PointerLock';

export class GamepadAPI {
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

  controllerIndex: number;
  turbo: boolean = false;
  buttonsCache: string[] = [];
  buttonsStatus: string[] = [];
  axesStatus: number[] = [];

  private pointerLockEscapeKey: string;
  private pointerLock: PointerLock;

  constructor(
    pointerLock: PointerLock,
    pointerLockEscapeKey: string = 'Option'
  ) {
    this.pointerLock = pointerLock;

    this.connect = this.connect.bind(this);
    this.disconnect = this.disconnect.bind(this);

    window.addEventListener('gamepadconnected', this.connect);
    window.addEventListener('gamepaddisconnected', this.disconnect);
  }

  disconnect(event: GamepadEvent) {
    this.turbo = false;
    delete this.controllerIndex;
    console.log('Gamepad disconnected');
  }

  connect(event: GamepadEvent) {
    this.controllerIndex = event.gamepad.index;
    this.turbo = true;
    // this.pointerLock.element.click();
    console.log('Gamepad connected', event.gamepad);
  }

  update() {
    this.buttonsCache = []; // Clear the buttons cache

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
    const axes = [];
    if (c.axes) {
      for (let a = 0; a < c.axes.length; a++) {
        axes.push(c.axes[a].toFixed(2));
      }
    }

    // Assign received values
    this.axesStatus = axes;
    this.buttonsStatus = pressed;

    if (pressed.includes(this.pointerLockEscapeKey)) this.pointerLock.unlock();

    return pressed; // Return buttons for debugging purposes
  }

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
