export class KeyboardInput {
  private pressedKeys: Set<string> = new Set();
  private ctrlPressed: boolean = false;
  private shiftPressed: boolean = false;
  private altPressed: boolean = false;
  private metaPressed: boolean = false;

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

  isKeyPressed(key: string): boolean {
    return this.pressedKeys.has(key);
  }

  get isCtrlPressed(): boolean {
    return this.ctrlPressed;
  }

  get isAltPressed(): boolean {
    return this.altPressed;
  }

  get isShiftPressed(): boolean {
    return this.shiftPressed;
  }

  get isMetaPressed(): boolean {
    return this.metaPressed;
  }
}

export default KeyboardInput;
