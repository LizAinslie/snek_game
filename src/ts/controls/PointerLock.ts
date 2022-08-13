export class PointerLock {
  element: HTMLElement;

  constructor(element: HTMLElement) {
    this.element = element;

    this.unlockOnEscape = this.unlockOnEscape.bind(this);

    this.element.addEventListener('click', this.lock.bind(this));
    window.addEventListener('keypress', this.unlockOnEscape);
  }

  private unlockOnEscape(event: KeyboardEvent) {
    if (event.key === 'Escape') this.unlock();
  }

  lock() {
    this.element.requestPointerLock();
  }

  unlock() {
    document.exitPointerLock();
  }
}

export default PointerLock;
