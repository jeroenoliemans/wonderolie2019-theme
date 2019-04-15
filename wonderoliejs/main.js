import BoidSimulation from './boids/BoidSimulation';

window.setTimeout(() => {
    // initialize boids
    const boidSimulation = new BoidSimulation();
boidSimulation.startBoidSimulation();
}, 300)