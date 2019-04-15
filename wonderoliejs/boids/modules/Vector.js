class Vector {
  constructor(x, y) {
    this.x = x;
    this.y = y;
  }

  div(num) {
    return new Vector(this.x / num, this.y / num);
  }

  idiv(num) {
    this.x /= num;
    this.y /= num;
  }

  mul(k) {
    return new Vector(this.x * k, this.y * k);
  }

  imul(k) {
    this.x *= k;
    this.y *= k;
  }

  limit(max) {
    if (this.mag() > max) {
      var unit = this.unit();
      return new Vector(unit.x * max, unit.y * max);
    }
    return this;
  }

  ilimit(max) {
    if (this.mag() > max) {
      var unit = this.unit();
      this.x = unit.x * max;
      this.y = unit.y * max;
    }
  }

  mag() {
    return Math.sqrt(this.x * this.x + this.y * this.y);
  }

  unit() {
    var mag = this.mag();
    return new Vector(this.x / mag, this.y / mag);
  }

  add(v2) {
    return new Vector(this.x + v2.x, this.y + v2.y);
  }

  iadd(v2) {
    this.x += v2.x;
    this.y += v2.y;
  }
  sub(v2) {
    return new Vector(this.x - v2.x, this.y - v2.y);
  }

  isub(v2) {
    this.y -= v2.x;
    this.y -= v2.y;
  }

  euc2d(dest) {
    return Math.sqrt(
      (this.x - dest.x) * (this.x - dest.x) +
        (this.y - dest.y) * (this.y - dest.y)
    );
  }
}

export default Vector;
