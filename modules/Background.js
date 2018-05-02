import Entity from './Entity';

//*‡‡‡‡‡‡‡‡‡‡‡‡‡‡‡‡‡‡‡‡‡‡‡‡‡‡‡‡‡‡/
// Background
//*‡‡‡‡‡‡‡‡‡‡‡‡‡‡‡‡‡‡‡‡‡‡‡‡‡‡‡‡‡*/

class Background extends Entity {
    drawText({ ctx, canvas }) {
        const ms = Math.max(canvas.width, canvas.height);
        const size = ms / 15;

        const copy = 'Canvas Starter';
        const x = canvas.width / 2;
        const y = canvas.height / 2 + size / 3;
        ctx.font = `700 italic ${size}px futura, sans-serif`;
        ctx.textAlign = 'center';
        ctx.fillStyle = '#fff';
        ctx.fillText(copy, x, y);
    }

    drawGradient({ ctx, canvas, bounds }) {
        // const gradient = ctx.createLinearGradient(...bounds.params);
        // gradient.addColorStop(0, '#333');
        // gradient.addColorStop(1, '#222');

        // ctx.fillStyle = gradient;
        ctx.fillStyle = '#252f3d';
        // ctx.globalAlpha = 0.9;
        ctx.fillRect(...bounds.params);
        // ctx.globalAlpha = 1;
    }

    draw = context => {
        this.drawGradient(context);
        // this.drawText(context);
    };
}

export default Background;
