import MRG32k3a from "../prng/MRG32k3a";
import Vector from "./Vector";
import simulation from "../constants";
import BoidGraphic from "./BoidGraphic";
import BoidLogo from "./BoidLogo";

function Boid(canvas, x, y, angle, maxSpeed, maxSteeringForce, viewingAngle) {
  this.dead = false;
  this.pos = new Vector(x, y);
  this.maxSpeed = maxSpeed || 1;
  this.speedLimit = 1.5 * this.maxSpeed; /* Testing */
  this.maxSteeringForce = maxSteeringForce || 0.065;
  if (viewingAngle) {
    this.viewingAngle = viewingAngle * (Math.PI / 180);
  } else {
    this.viewingAngle = 270 * (Math.PI / 180); /* 270 degrees */
  }

  this.canvas = canvas;

  var angle = angle * (Math.PI / 180);

  /* Velocity */
  this.vel = new Vector(Math.cos(angle), Math.sin(angle));
  /* Acceleration (at each instant) */
  this.acc = new Vector(0, 0);

  this.wandering = false;

  this.simulate = function(boids) {
    this.flock(boids); /* Simulation lives all here. */

    this.update();
  };

  this.update = function() {
    if (this.vel.add(this.acc).mag() > 0) {
      this.vel.iadd(this.acc);
    }
    if (this.vel.mag() > 0) {
      this.vel.ilimit(this.speedLimit);
    }

    this.pos.x += this.vel.x;
    this.pos.y -= this.vel.y; /* 0 at top left */
    /* Reset acceleration */
    this.acc.x = 0;
    this.acc.y = 0;
  };

  this.flock = function(boids) {
    var separate = this.separation(boids);
    var align = this.alignment(boids);
    var cohesion = this.cohesion(boids);

    this.acc.iadd(separate.mul(simulation.effect.separate));
    this.acc.iadd(align.mul(simulation.effect.align));
    this.acc.iadd(cohesion.mul(simulation.effect.cohesion));

    if (this.acc.mag() == 0) {
      /* Only wander if other rules weren't applied or didn't
		   have any effect. */
      this.acc = this.wander().mul(simulation.effect.wander);
      this.wandering = true;
    } else {
      this.wandering = false;
    }
  };

  this.wander = function() {
    /* XXX Experimental. */
    var wanderRad = 17;
    var wanderLength = 50;

    var direction = this.vel.unit();
    var center = this.pos.add(direction.mul(wanderLength));
    var wanderTheta = -Math.PI / 2 + simulation.prng() * Math.PI;
    var wanderx = wanderRad * Math.cos(wanderTheta);
    var wandery = wanderRad * Math.sin(-wanderTheta);
    var target = center.add(new Vector(wanderx, wandery));
    return this.seek(target, this.pos);
  };

  this.seek = function(target, pos) {
    var e = target.sub(pos);
    //console.log(e, target, pos)
    var dist = e.mag();
    //console.log(dist, e)
    if (dist > 0) {
      e = e.unit();
      e.imul(this.maxSpeed);
      return e.sub(this.vel).limit(this.maxSteeringForce);
    }
    return new Vector(0, 0);
  };

  this.inBoidViewRange = function(other) {
    var theta = Math.atan2(-this.vel.y, this.vel.x);
    var obst_x = other.pos.x - this.pos.x;
    var obst_y =
      this.canvas.height - other.pos.y - (this.canvas.height - this.pos.y);
    var obx = obst_x * Math.cos(theta) - obst_y * Math.sin(theta);
    var oby = obst_x * Math.sin(theta) + obst_y * Math.cos(theta);

    var a = Math.atan2(-oby, obx);

    var min = -this.viewingAngle / 2;
    var max = +this.viewingAngle / 2;
    return a < max && a > min;
  };

  /* Rule 1. Collision Avoidance: avoid collision with nearby flockmates. */
  this.separation = function(boids) {
    var sepRange = simulation.bird_separaterange;
    var steer = new Vector(0, 0);
    var diff = new Vector(0, 0);
    var count = 0;

    for (var i = boids.length - 1; i >= 0; i--) {
      var other = boids[i];
      if (this == other) {
        continue;
      }

      var d = this.pos.euc2d(other.pos);
      if (d < sepRange && this.inBoidViewRange(other)) {
        diff = this.pos.sub(other.pos);
        diff = diff.unit().div(d);
        steer.iadd(diff);
        count++;
      }
    }
    if (count > 0) {
      steer.idiv(count);
      steer.ilimit(this.maxSteeringForce);
    }

    return steer;
  };

  /* Rule 2. Velocity Matching: attempt to match velocity with nearby
       flockmates. */
  this.alignment = function(boids) {
    var neighborDist = simulation.bird_neighborhood;
    var steer = new Vector(0, 0);
    var count = 0;

    for (var i = boids.length - 1; i >= 0; i--) {
      var other = boids[i];
      if (other == this) {
        continue;
      }

      var d = this.pos.euc2d(other.pos);
      if (d < neighborDist && this.inBoidViewRange(other)) {
        steer.iadd(other.vel);
        count++;
      }
    }

    if (count > 0) {
      steer.idiv(count);
      steer.ilimit(this.maxSteeringForce);
    }
    return steer;
  };

  /* Rule 3. Flock Centering: attempt to stay close to nearby flockmates. */
  this.cohesion = function(boids) {
    var neighborDist = simulation.bird_neighborhood;
    var mass = new Vector(0, 0);
    var count = 0;

    for (var i = boids.length - 1; i >= 0; i--) {
      var other = boids[i];
      if (this == other) {
        continue;
      }

      var d = this.pos.euc2d(other.pos);
      if (d < neighborDist && this.inBoidViewRange(other)) {
        mass.iadd(other.pos);
        count++;
      }
    }

    if (count > 0) {
      mass.idiv(count); /* Centre of mass */
      mass.ilimit(this.maxSteeringForce);
    }
    return mass;
  };

  this.draw = function(ctx, width, height) {
    // let boidGraphic = new BoidGraphic(ctx);
    let boidLogo = new BoidLogo(ctx);

    if (this.dead) {
      return;
    }

    /* Wrap around the available space. */
    if (this.pos.x < 0 - 40) {
      this.pos.x = width;
    }  
    if (this.pos.x > width + 40) {
      this.pos.x = -40;
    }  
    if (this.pos.y < 0 - 40) {
      this.pos.y = height;
    } 
    if (this.pos.y > height + 40) {
      this.pos.y = 0;
    } 

    var theta = Math.atan2(-this.vel.y, this.vel.x);

    ctx.save();

    ctx.translate(this.pos.x, this.pos.y);
    ctx.rotate(theta);

    /* Draw bird. */
    ctx.beginPath();

    // boidGraphic.draw();
    boidLogo.draw();

    ctx.closePath();
    ctx.fill();

    ctx.restore();
  };
}

export default Boid;
