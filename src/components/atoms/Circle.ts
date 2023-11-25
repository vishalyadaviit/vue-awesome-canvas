class Circle {
  c: CanvasRenderingContext2D;
  x: number;
  y: number;
  radius: number;

  constructor(
    c: CanvasRenderingContext2D,
    x: number,
    y: number,
    radius: number
  ) {
    this.c = c;
    this.x = x;
    this.y = y;
    this.radius = radius;
  }

  draw() {
    this.c.strokeStyle = "white";
    this.c.beginPath();
    this.c.arc(this.x, this.y, this.radius, 0, 2 * Math.PI);
    this.c.stroke();
  }
}

export default Circle;
