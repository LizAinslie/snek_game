import { Vector2 } from '../vector';

/**
 * Base properties for all game objects.
 *
 * @author Liz Ainslie
 */
export interface GameObject {
  /**
   * The position of this object.
   *
   * @author Liz Ainslie
   */
  pos: Vector2;

  /**
   * The width of this object on screen.
   *
   * @author Liz Ainslie
   */
  width: number;

  /**
   * The height of this object on screen.
   *
   * @author Liz Ainslie
   */
  height: number;
}

export default GameObject;
