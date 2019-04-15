class BoidLogo {
    constructor(ctx) {
        this.ctx = ctx;
    }

    draw() {
        this.ctx.fillStyle = "#009393";
        this.ctx.beginPath();
        this.ctx.moveTo(0,0);
        this.ctx.lineTo(0,8.695);
        this.ctx.lineTo(26.338,8.695);
        this.ctx.lineTo(26.338,0);
        this.ctx.lineTo(0,0);
        this.ctx.closePath();
        this.ctx.fill();

        this.ctx.fillStyle = "#009393";
        this.ctx.beginPath();
        this.ctx.moveTo(0,27.173);
        this.ctx.lineTo(0,35.972);
        this.ctx.lineTo(26.338,35.972);
        this.ctx.lineTo(26.338,27.173);
        this.ctx.lineTo(0,27.173);
        this.ctx.closePath();
        this.ctx.fill();

        this.ctx.fillStyle = "#009393";
        this.ctx.beginPath();
        this.ctx.moveTo(8.34,9.575);
        this.ctx.lineTo(0,9.575);
        this.ctx.lineTo(4.829,17.494);
        this.ctx.lineTo(13.168,17.494);
        this.ctx.lineTo(8.34,9.575);
        this.ctx.closePath();
        this.ctx.fill();

        this.ctx.fillStyle = "#009393";
        this.ctx.beginPath();
        this.ctx.moveTo(4.829,18.374);
        this.ctx.lineTo(0,26.293);
        this.ctx.lineTo(8.34,26.293);
        this.ctx.lineTo(13.168,18.374);
        this.ctx.lineTo(4.829,18.374);
        this.ctx.closePath();
        this.ctx.fill();
    }
}

export default BoidLogo;

