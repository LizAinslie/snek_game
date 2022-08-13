/**
 * A two-dimensional vector.
 *
 * @author Liz Ainslie
 */
export class Vector2 {
  x: number = 0;
  y: number = 0;

  /**
   * Construct a two-dimensional vector.
   *
   * @param x The x value.
   * @param y The y value.
   *
   * @author Liz Ainslie
   */
  constructor(x: number = 0, y: number = 0) {
    this.x = x;
    this.y = y;
  }

  /**
   * Reset this vector's values to zero.
   *
   * @author Liz Ainslie
   */
  zero() {
    this.x = 0;
    this.y = 0;
  }
}

/**
 * A three-dimensional vector.
 *
 * @author Liz Ainslie
 */
export class Vector3 extends Vector2 {
  z: number = 0;

  /**
   * Construct a three-dimensional vector.
   *
   * @param x The x value.
   * @param y The y value.
   * @param z The z value.
   *
   * @author Liz Ainslie
   */
  constructor(x: number = 0, y: number = 0, z: number = 0) {
    super(x, y);
    this.z = z;
  }

  /**
   * Reset this vector's values to zero.
   *
   * @author Liz Ainslie
   */
  zero() {
    super.zero();
    this.z = 0;
  }
}
