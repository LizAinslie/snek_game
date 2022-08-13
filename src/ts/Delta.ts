/**
 * A class containing delta time information for frame-independent animation.
 *
 * @author Liz Ainslie
 */
export class Delta {
  /**
   * The current delta time, multiplied with movement values to move objects at
   * the same speed independent of processor clock speeds or user frame rates.
   *
   * @author Liz Ainslie
   */
  static deltaTime: number = 0;

  /**
   * The last delta timestamp, used to calculate the new delta in each game
   * loop.
   *
   * @author Liz Ainslie
   */
  static lastDelta: number = performance.now();
}

export default Delta;
