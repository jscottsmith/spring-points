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
        const offset = this.toValue(20);
        const gradientBounds = bounds.offsetInner(offset);
        const gradient = ctx.createLinearGradient(...gradientBounds.params);
        gradient.addColorStop(0, '#4286f4');
        gradient.addColorStop(1, '#5b3dd3');

        ctx.fillStyle = gradient;
        ctx.fillRect(...gradientBounds.params);
    }

    draw = context => {
        this.drawGradient(context);
        // this.drawText(context);
    };
}

export default Background;
