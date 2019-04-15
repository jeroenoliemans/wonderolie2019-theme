import simulation from "../constants";

class Flock {
    constructor() {
        this.boids = [];
        this.obstacles = [];
    }

    addBoid(boid) {
      this.boids.push(boid);
      simulation.population++;
    };
  
    update() {
      var temp;
      for (var i = this.boids.length - 1; i >= 0; i--) {
        this.boids[i].simulate(this.boids);
        if (this.boids[i].dead) {
          temp = this.boids[i];
          this.boids[i] = this.boids[this.boids.length - 1];
          this.boids[this.boids.length - 1] = temp;
        }
      }
    };
  
    draw(ctx, width, height) {
      var i;
      var accSpeed = 0;
      var speeds = [];
  
      for (i = this.boids.length - 1; i >= 0; i--) {
        this.boids[i].draw(ctx, width, height);
        var speed = this.boids[i].vel.mag();
        speeds.push(speed);
        accSpeed += speed;
      }
    };
  }

  export default Flock;