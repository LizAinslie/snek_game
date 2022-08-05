export class KeyboardInput {
  constructor() {
    this.keyDownHandler = this.keyDownHandler.bind(this);
    this.keyUpHandler = this.keyUpHandler.bind(this);

    document.addEventListener('keydown', this.keyDownHandler);
    document.addEventListener('keyup', this.keyUpHandler);
  }

  keyDownHandler(event: KeyboardEvent) {}

  keyUpHandler(event: KeyboardEvent) {}
}

export default KeyboardInput;
