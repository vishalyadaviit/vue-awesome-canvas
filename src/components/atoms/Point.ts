type IPoint = {
  x: number;
  y: number;
};

class Point {
  c: CanvasRenderingContext2D;
  size: number;
  x: number;
  y: number;
  keepLog: boolean;
  currentX: number;
  currentY: number;
  dTheta: number = 0;
  allPoints: Array<IPoint> = [];

  constructor(
    c: CanvasRenderingContext2D,
    x: number = 0,
    y: number = 0,
    size: number = 1,
    keepLog: boolean = false
  ) {
    this.c = c;
    this.size = size;
    this.x = x;
    this.y = y;
    this.keepLog = keepLog;
    this.currentX = x;
    this.currentY = y;
  }

  draw() {
    const { size } = this;
    this.c.fillStyle = "white";
    this.c.beginPath();
    this.c.arc(this.currentX, this.currentY, size, 0, 2 * Math.PI);
    this.c.fill();
  }

  private drawAllPoints() {
    this.c.fillStyle = "white";
    for (let point of this.allPoints) {
      this.c.beginPath();
      this.c.arc(point.x, point.y, this.size, 0, 2 * Math.PI);
      this.c.fill();
    }
  }

  traceRotate(radius: number, omega: number) {
    this.allPoints.push({ x: this.currentX, y: this.currentY });

    this.dTheta += omega;
    this.currentX = this.x + radius * Math.cos((this.dTheta / 180) * Math.PI);
    this.currentY = this.y + radius * -Math.sin((this.dTheta / 180) * Math.PI);
    this.drawAllPoints();
  }

  rotate(radius: number, omega: number, initialTheta: number = 0) {
    if (this.keepLog) {
      this.allPoints.push({ x: this.currentX, y: this.currentY });
    }

    this.dTheta += omega;

    this.currentX =
      this.x +
      radius * Math.cos(((this.dTheta + initialTheta) / 180 / 9) * Math.PI);
    this.currentY =
      this.y +
      radius * -Math.sin(((this.dTheta + initialTheta) / 180 / 10) * Math.PI);

    this.draw();
  }
}

export default Point;
