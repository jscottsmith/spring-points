import Entity from './Entity';

//*‡‡‡‡‡‡‡‡‡‡‡‡‡‡‡‡‡‡‡‡‡‡‡‡‡‡‡‡‡‡/
// Background
//*‡‡‡‡‡‡‡‡‡‡‡‡‡‡‡‡‡‡‡‡‡‡‡‡‡‡‡‡‡*/

class Background extends Entity {
    drawText({ ctx, canvas }) {
        const ms = Math.max(canvas.width, canvas.height);
        const size = ms / 15;

        const copy = 'BANDS';
        const x = canvas.width / 2;
        const y = canvas.height / 2 + size / 3;
        ctx.font = `700 italic ${size}px futura, sans-serif`;
        ctx.textAlign = 'center';
        ctx.fillStyle = '#fff';
        ctx.fillText(copy, x, y);
    }

    drawGradient({ ctx, canvas, bounds }) {
        const gradient = ctx.createLinearGradient(bounds.x, 0, 0, bounds.h);
        gradient.addColorStop(0, '#5f4889');
        gradient.addColorStop(1, '#2d3477');

        ctx.fillStyle = gradient;
        ctx.fillRect(...bounds.params);
    }

    draw = context => {
        this.drawGradient(context);
        this.drawText(context);
    };
}

export default Background;
