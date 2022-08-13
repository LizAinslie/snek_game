// Import stylesheets
import './style.scss';

import CharacterController from './ts/CharacterController';
import GamepadAPI from './ts/controls/GamepadAPI';
import PointerLock from './ts/controls/PointerLock';
import Delta from './ts/Delta';
import Sprite from './ts/object/Sprite';

/**
 * A square box sprite for testing.
 *
 * @author Liz Ainslie
 */
class BoxSprite extends Sprite {
  /**
   * This box's color.
   *
   * @author Liz Ainslie
   * @property
   */
  color: string;

  /**
   * Create a new box sprite.
   *
   * @param size The size of this box.
   * @param color The color of this box.
   *
   * @author Liz Ainslie
   */
  constructor(size: number, color: string) {
    super();

    this.width = size;
    this.height = size;

    this.color = color;
  }

  /**
   * Draw this box.
   *
   * @param ctx The canvas context to draw on.
   *
   * @author Liz Ainslie
   */
  draw(ctx: CanvasRenderingContext2D) {
    ctx.fillStyle = this.color;
    ctx.fillRect(this.pos.x, this.pos.y, this.width, this.height);
  }
}

/**
 * The game logic.
 *
 * @author Liz Ainslie
 */
class Game {
  private readonly ctx: CanvasRenderingContext2D;
  private readonly gamepadAPI: GamepadAPI;
  private readonly character: CharacterController;
  private readonly box: BoxSprite = new BoxSprite(50, '#000000');
  private readonly pointerLock: PointerLock;

  constructor(canvas: HTMLCanvasElement) {
    this.ctx = canvas.getContext('2d')!;

    this.paint = this.paint.bind(this);
    this.loop = this.loop.bind(this);
    this.resizeCanvas = this.resizeCanvas.bind(this);

    this.pointerLock = new PointerLock(canvas);
    this.gamepadAPI = new GamepadAPI();
    this.character = new CharacterController(this.box, this.gamepadAPI, 200);

    this.resizeCanvas();
    window.addEventListener('resize', this.resizeCanvas);
    window.addEventListener('load', this.resizeCanvas);
    canvas.addEventListener('click', () => this.pointerLock.lock());
  }

  /**
   * Resize the canvas to fit the window.
   *
   * @author Liz Ainslie
   */
  resizeCanvas() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
  }

  /**
   * Paint all the game objects
   *
   * @author Liz Ainslie
   * @private
   */
  private paint() {
    this.ctx.clearRect(0, 0, this.ctx.canvas.width, this.ctx.canvas.height);

    this.box.draw(this.ctx);
  }

  /**
   * The game loop
   *
   * @author Liz Ainslie
   * @private
   */
  private loop(hrt: DOMHighResTimeStamp) {
    Delta.deltaTime = (hrt - Delta.lastDelta) / 1000;
    this.character.update();
    this.box.update();

    if (this.gamepadAPI.buttonPressed('A', true))
      this.box.color = '#dc3545';
    else this.box.color = '#000000';

    this.paint();

    Delta.lastDelta = hrt;
    requestAnimationFrame(this.loop);
  }

  /**
   * Start the game
   *
   * @author Liz Ainslie
   */
  start() {
    requestAnimationFrame(this.loop);
  }
}

const canvas: HTMLCanvasElement = document.getElementById(
  'game'
) as HTMLCanvasElement;
const game = new Game(canvas);
game.start();
