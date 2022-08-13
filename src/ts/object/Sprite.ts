import Delta from '../Delta';
import { Vector2 } from '../vector';
import GameObject from './GameObject';

export abstract class Sprite implements GameObject {
  movementVector: Vector2 = new Vector2();
  pos: Vector2 = new Vector2();
  width: number;
  height: number;

  abstract draw(ctx: CanvasRenderingContext2D);

  update() {
    this.pos.x += this.movementVector.x * Delta.deltaTime;
    this.pos.y += this.movementVector.y * Delta.deltaTime;

    this.movementVector.reset();
  }
}

export default Sprite;
