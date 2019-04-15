import MRG32k3a from "./prng/MRG32k3a";
import Vector from "./modules/Vector";
import Boid from "./modules/Boid";
import simulation from "./constants";
import Flock from "./modules/Flock";

// function Flock() {
//   this.boids = [];
//   this.obstacles = [];

//   this.addBoid = function(boid) {
//     this.boids.push(boid);
//     simulation.population++;
//   };

//   this.update = function() {
//     var temp;
//     for (var i = this.boids.length - 1; i >= 0; i--) {
//       this.boids[i].simulate(this.boids);
//       if (this.boids[i].dead) {
//         temp = this.boids[i];
//         this.boids[i] = this.boids[this.boids.length - 1];
//         this.boids[this.boids.length - 1] = temp;
//       }
//     }
//   };

//   this.draw = function(ctx, width, height) {
//     var i;
//     var accSpeed = 0;
//     var speeds = [];

//     for (i = this.boids.length - 1; i >= 0; i--) {
//       this.boids[i].draw(ctx, width, height);
//       var speed = this.boids[i].vel.mag();
//       speeds.push(speed);
//       accSpeed += speed;
//     }
//   };
// }

class BoidSimulation {
    constructor() {
        
    }

    startBoidSimulation() {
      let canvas = document.getElementById("main");
      let ctx = canvas.getContext("2d");
    
      /* Set a seed for the PRNG */
      //var seed = 0
      simulation.prng = new MRG32k3a(); //seed)
    
      document.body.style.overflow = "hidden";
    
      window.addEventListener("resize", adjustAndRedraw, false);
    
      simulation.flock = new Flock();
    
      adjustAndRedraw();
    
      /* 30 FPS */
      let fps = 30;
      window.setInterval(update, 1000 / fps);
    
      var initialPop = 40;
      for (var i = 0; i < initialPop; i++) {
        var boid = new Boid(
          canvas,
        //   canvas.width * 0.5,
        //   canvas.height * 0.5,
            Math.random()*canvas.width,
            Math.random()*canvas.height,
            simulation.prng() * 360,
           // 2.8
           (Math.random()*1)+1
        );
        simulation.flock.addBoid(boid);
      }
    
      function update() {
        simulation.flock.update();
        redraw();
      }
    
      function redraw() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
    
        ctx.fillStyle = "#f6f6f6";
        ctx.strokeStyle = "#aecbf6";
        simulation.flock.draw(ctx, canvas.width, canvas.height);
      }
    
      function adjustAndRedraw() {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
        redraw();
      }
    };
}

export default BoidSimulation;
