export class Vector2 {
  x: number = 0;
  y: number = 0;

  constructor(x: number = 0, y: number = 0) {
    this.x = x;
    this.y = y;
  }

  reset() {
    this.x = 0;
    this.y = 0;
  }
}


export class Vector3 {
  x: number = 0;
  y: number = 0;
  z: number = 0;

  constructor(x: number = 0, y: number = 0, z: number = 0) {
    this.x = x;
    this.y = y;
    this.z = z;
  }

  reset() {
    this.x = 0;
    this.y = 0;
    this.z = 0;
  }
}
