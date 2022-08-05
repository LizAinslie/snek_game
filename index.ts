// Import stylesheets
import './style.scss';

import CharacterController from './ts/CharacterController';
import GamepadAPI from './ts/controls/GamepadAPI';
import PointerLock from './ts/controls/PointerLock';
import Delta from './ts/Delta';
import Sprite from './ts/object/Sprite';

class BoxSprite extends Sprite {
  color: string;

  constructor(size: number, color: string) {
    super();

    this.width = size;
    this.height = size;

    this.color = color;
  }

  draw(ctx: CanvasRenderingContext2D) {
    ctx.fillStyle = this.color;
    ctx.fillRect(this.pos.x, this.pos.y, this.width, this.height);
  }
}

class Game {
  private ctx: CanvasRenderingContext2D;
  private character: CharacterController;
  private box: BoxSprite = new BoxSprite(50, '#000000');
  private pointerLock: PointerLock;
  gamepadAPI: GamepadAPI;

  constructor(canvas: HTMLCanvasElement) {
    this.ctx = canvas.getContext('2d');

    this.paint = this.paint.bind(this);
    this.loop = this.loop.bind(this);
    this.resizeCanvas = this.resizeCanvas.bind(this);

    this.pointerLock = new PointerLock(canvas);
    this.gamepadAPI = new GamepadAPI(this.pointerLock);
    this.character = new CharacterController(this.box, this.gamepadAPI, 200);

    this.resizeCanvas();
    window.addEventListener('resize', this.resizeCanvas);
    window.addEventListener('load', this.resizeCanvas);
  }

  resizeCanvas() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
  }

  paint() {
    this.ctx.clearRect(0, 0, this.ctx.canvas.width, this.ctx.canvas.height);

    this.box.draw(this.ctx);
  }

  loop(hrt: DOMHighResTimeStamp) {
    Delta.deltaTime = (hrt - Delta.lastDelta) / 1000;
    this.character.update();
    this.box.update();

    if (this.character.gamepadAPI.buttonPressed('A', true))
      this.box.color = '#dc3545';
    else this.box.color = '#000000';

    this.paint();

    Delta.lastDelta = hrt;
    requestAnimationFrame(this.loop);
  }
}

const canvas: HTMLCanvasElement = document.getElementById(
  'game'
) as HTMLCanvasElement;
const game = new Game(canvas);
requestAnimationFrame(game.loop);
