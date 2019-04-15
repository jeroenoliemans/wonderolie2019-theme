let simulation = {};

simulation.bird_box = 30;
simulation.prng = null;
simulation.bird_length = 27;
simulation.bird_wingspan = 36;
simulation.bird_viewrange = (simulation.bird_length *
			     simulation.bird_wingspan) / 4;
simulation.bird_obstaclerange = 12 * simulation.bird_length;
simulation.bird_neighborhood = simulation.bird_viewrange;
simulation.bird_separaterange = simulation.bird_neighborhood / 2.5;
simulation.debug = false;
simulation.effect = {separate : 1, cohesion : 0.75, align : 0.7, wander : 1,
		     avoid : 1};
simulation.population = 0;
simulation.flock = null;

export default simulation;