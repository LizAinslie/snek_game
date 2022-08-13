import Delta from '../Delta';
import { Vector2 } from '../vector';
import GameObject from './GameObject';

/**
 * A movable game sprite.
 *
 * @author Liz Ainslie
 * @see GameObject
 */
export abstract class Sprite implements GameObject {
  /**
   * The vector by which this sprite moves.
   *
   * @author Liz Ainslie
   * @see update
   */
  movementVector: Vector2 = new Vector2();

  /**
   * The position of this sprite.
   *
   * @author Liz Ainslie
   */
  pos: Vector2 = new Vector2();

  /**
   * The width of this sprite on screen.
   *
   * @author Liz Ainslie
   */
  width: number = 0;

  /**
   * The height of this sprite on screen.
   *
   * @author Liz Ainslie
   */
  height: number = 0;

  /**
   * Code used to draw this sprite.
   *
   * @param ctx The canvas context to draw to.
   *
   * @author Liz Ainslie
   */
  abstract draw(ctx: CanvasRenderingContext2D): void;

  /**
   * The update loop code for this sprite. When overriding this method always
   * call super.update(), otherwise the movement vector will not be applied.
   *
   * @author Liz Ainslie
   */
  update() {
    this.pos.x += this.movementVector.x * Delta.deltaTime;
    this.pos.y += this.movementVector.y * Delta.deltaTime;

    this.movementVector.zero();
  }
}

export default Sprite;
