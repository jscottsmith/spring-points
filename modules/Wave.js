import Entity from './Entity';
import Spring from './Spring';

//*‡‡‡‡‡‡‡‡‡‡‡‡‡‡‡‡‡‡‡‡‡‡‡‡‡‡‡‡‡‡/
// Wave
//*‡‡‡‡‡‡‡‡‡‡‡‡‡‡‡‡‡‡‡‡‡‡‡‡‡‡‡‡‡*/

const SPRING_CONSTANT = 0.1;
const FREQUENCY = 2;
const WAVE_OFFSET = 0;

class Wave extends Entity {
    constructor({ p1, p2, points, color, mass }) {
        super();

        this.color = color;

        // delta between two endpoints
        const dx = p2.x - p1.x;
        const dy = p2.y - p1.y;

        // offsets between each point along the line
        const offX = dx / (points - 1);
        const offY = dy / (points - 1);

        this.points = new Array(points).fill(null).map((p, i) => {
            const sinX = Math.sin(i / FREQUENCY) * WAVE_OFFSET;
            const sinY = Math.sin(-i / FREQUENCY) * WAVE_OFFSET;
            const x = p1.x + offX * i + sinX;
            const y = p1.y + offY * i + sinY;
            const isFixed = i === 0 || i === points - 1;

            return new Spring({ x, y, isFixed, mass });
        });

        // this.points.forEach((point, i) => {
        //     const prevPoint = this.points[i - 1];
        //     const nextPoint = this.points[i + 1];
        //     prevPoint && point.addAttractor(prevPoint);
        //     nextPoint && point.addAttractor(nextPoint);
        // });
    }

    applyAdjacentSpringForce() {
        const { points } = this;

        this.points.forEach((point, i) => {
            const { x, y } = point;

            const ppf = { x: 0, y: 0 }; // prev point force
            const npf = { x: 0, y: 0 }; // next point force

            // return if this is the first or last point on the line
            if (i === 0 || i === points.length - 1) return;

            // prev point force
            const pdy = points[i - 1].y - y;
            const pdx = points[i - 1].x - x;
            ppf.y = SPRING_CONSTANT * pdy;
            ppf.x = SPRING_CONSTANT * pdx;

            // next point force
            const ndy = points[i + 1].y - y;
            const ndx = points[i + 1].x - x;
            npf.y = SPRING_CONSTANT * ndy;
            npf.x = SPRING_CONSTANT * ndx;

            // apply adjacent forces to current spring
            point.applyForce(ppf.x, ppf.y);
            point.applyForce(npf.x, npf.y);
        });
    }

    draw = context => {
        this.points.forEach(p => p.draw(context));
        const { ctx } = context;
        ctx.strokeStyle = this.color;
        ctx.lineWidth = this.toValue(4);
        ctx.lineCap = 'round';
        ctx.beginPath();
        this.points.forEach(p => {
            ctx.lineTo(p.x, p.y);
        });
        ctx.stroke();
    };

    update = context => {
        this.applyAdjacentSpringForce();
        this.points.forEach(p => p.update(context));
    };
}

export default Wave;
