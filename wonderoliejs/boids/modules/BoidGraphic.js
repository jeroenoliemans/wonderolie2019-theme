import simulation from "../constants";

class BoidGraphic {
    constructor(ctx) {
        this.ctx = ctx;
    }

    draw() {
        /* Bico */
        this.ctx.moveTo(1, -simulation.bird_wingspan / 6.666);
        this.ctx.lineTo(simulation.bird_length / 2 - 1, 0);
        this.ctx.lineTo(1, simulation.bird_wingspan / 6.666);

        /* Asa direita */
        this.ctx.lineTo(simulation.bird_wingspan / 10, simulation.bird_wingspan / 10);
        this.ctx.lineTo(simulation.bird_wingspan / 5, simulation.bird_wingspan / 5);
        this.ctx.lineTo(0, simulation.bird_wingspan / 2);
        this.ctx.lineTo(-simulation.bird_length / 18, simulation.bird_wingspan / 2.222);
        this.ctx.lineTo(simulation.bird_length / 36, simulation.bird_wingspan / 4);
        this.ctx.lineTo(0, simulation.bird_wingspan / 10);

        /* Cauda */
        var xx = simulation.bird_length / 72;
        this.ctx.lineTo(-simulation.bird_length / 4, xx);
        this.ctx.lineTo(-simulation.bird_length / 3, xx);
        this.ctx.lineTo(-simulation.bird_length / 2, simulation.bird_length / 6);
        this.ctx.lineTo(-simulation.bird_length / 2, -simulation.bird_length / 6);
        this.ctx.lineTo(-simulation.bird_length / 3, -xx);
        this.ctx.lineTo(-simulation.bird_length / 4, -xx);

        this.ctx.lineTo(0, -simulation.bird_wingspan / 10);

        /* Asa esquerda */
        this.ctx.lineTo(simulation.bird_length / 36, -simulation.bird_wingspan / 4);
        this.ctx.lineTo(-simulation.bird_length / 18, -simulation.bird_wingspan / 2.222);
        this.ctx.lineTo(0, -simulation.bird_wingspan / 2);
        this.ctx.lineTo(simulation.bird_wingspan / 5, -simulation.bird_wingspan / 5);
        this.ctx.lineTo(simulation.bird_wingspan / 10, -simulation.bird_wingspan / 10);
    }
}

export default BoidGraphic;