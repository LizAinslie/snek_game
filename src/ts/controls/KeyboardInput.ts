/**
 * A keyboard input processing utility to make game loop detection of keyboard
 * state easier.
 *
 * @author Liz Ainslie
 */
export class KeyboardInput {
  private pressedKeys: Set<string> = new Set();
  private ctrlPressed: boolean = false;
  private shiftPressed: boolean = false;
  private altPressed: boolean = false;
  private metaPressed: boolean = false;

  /**
   * Construct a new keyboard input processor.
   *
   * @author Liz Ainslie
   */
  constructor() {
    this.keyDownHandler = this.keyDownHandler.bind(this);
    this.keyUpHandler = this.keyUpHandler.bind(this);

    document.addEventListener('keydown', this.keyDownHandler);
    document.addEventListener('keyup', this.keyUpHandler);
  }

  private keyDownHandler(event: KeyboardEvent) {
    this.pressedKeys.add(event.key);

    this.ctrlPressed = event.ctrlKey;
    this.altPressed = event.altKey;
    this.shiftPressed = event.shiftKey;
    this.metaPressed = event.metaKey;
  }

  private keyUpHandler(event: KeyboardEvent) {
    this.pressedKeys.delete(event.key);
  }

  /**
   * Check whether a key is pressed.
   *
   * @param key The key.
   *
   * @author Liz Ainslie
   * @see KeyboardEvent.key
   */
  isKeyPressed(key: string): boolean {
    return this.pressedKeys.has(key);
  }

  /**
   * Is the CTRL key pressed?
   *
   * @author Liz Ainslie
   */
  get isCtrlPressed(): boolean {
    return this.ctrlPressed;
  }

  /**
   * Is the Alt key pressed?
   *
   * @author Liz Ainslie
   */
  get isAltPressed(): boolean {
    return this.altPressed;
  }

  /**
   * Is the Shift key pressed?
   *
   * @author Liz Ainslie
   */
  get isShiftPressed(): boolean {
    return this.shiftPressed;
  }

  /**
   * Is the Meta key pressed? The meta key usually refers to the Windows key on
   * PC.
   *
   * @author Liz Ainslie
   */
  get isMetaPressed(): boolean {
    return this.metaPressed;
  }
}

export default KeyboardInput;
