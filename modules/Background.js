import Entity from './Entity';

//*‡‡‡‡‡‡‡‡‡‡‡‡‡‡‡‡‡‡‡‡‡‡‡‡‡‡‡‡‡‡/
// Background
//*‡‡‡‡‡‡‡‡‡‡‡‡‡‡‡‡‡‡‡‡‡‡‡‡‡‡‡‡‡*/

class Background extends Entity {
    constructor({ color }) {
        super();
        this.color = color;
    }

    drawBg({ ctx, canvas, bounds }) {
        ctx.fillStyle = this.color;
        ctx.fillRect(...bounds.params);
    }

    draw = context => {
        this.drawBg(context);
    };
}

export default Background;
