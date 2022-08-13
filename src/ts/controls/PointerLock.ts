/**
 * A utility class for managing the state of pointer lock.
 *
 * @author Liz Ainslie
 */
export class PointerLock {
  /**
   * The element whose pointer lock state this instance manages.
   *
   * @author Liz Ainslie
   */
  readonly element: HTMLElement;

  /**
   * Construct a new pointer lock utility.
   *
   * @param element The element to lock the cursor to.
   *
   * @author Liz Ainslie
   */
  constructor(element: HTMLElement) {
    this.element = element;

    this.unlockOnEscapeHandler = this.unlockOnEscapeHandler.bind(this);

    this.element.addEventListener('click', this.lock.bind(this));
  }

  /**
   * Enable/Disable unlocking when the user presses their escape key.
   * @param enable Whether to enable or disable the handler. Defaults to true.
   *
   * @author Liz Ainslie
   */
  unlockOnEscape(enable: boolean = true) {
    if (enable) window.addEventListener('keypress', this.unlockOnEscapeHandler);
    else window.removeEventListener('keypress', this.unlockOnEscapeHandler);
  }

  private unlockOnEscapeHandler(event: KeyboardEvent) {
    if (event.key === 'Escape') this.unlock();
  }

  /**
   * Lock the user's pointer
   *
   * @author Liz Ainslie
   */
  lock() {
    this.element.requestPointerLock();
  }

  /**
   * Unlock the user's pointer.
   *
   * @author Liz Ainslie
   */
  unlock() {
    PointerLock.unlock();
  }

  /**
   * Statically unlock the user's pointer.
   *
   * @author Liz Ainslie
   */
  static unlock() {
    document.exitPointerLock();
  }
}

export default PointerLock;
