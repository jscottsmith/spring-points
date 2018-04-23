import Entity from './Entity';
import Point from './Point';
import Spring from './Spring';

//*‡‡‡‡‡‡‡‡‡‡‡‡‡‡‡‡‡‡‡‡‡‡‡‡‡‡‡‡‡‡/
// Wave
//*‡‡‡‡‡‡‡‡‡‡‡‡‡‡‡‡‡‡‡‡‡‡‡‡‡‡‡‡‡*/

const SPRING_CONSTANT = 0.2;
const FREQUENCY = 2;
const WAVE_OFFSET = 0;

const MOUSE_STRENGTH = 0.5; // 0 - 1
const MOUSE_RADIUS = 100;

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

        // angle perpendicular to the slope of the line
        const theta = p1.angleRadians(p2) + Math.PI / 2;

        this.points = new Array(points).fill(null).map((p, i) => {
            // set center point
            const cx = p1.x + offX * i;
            const cy = p1.y + offY * i;
            // create point at center
            const point = new Point(cx, cy);

            // move at perpendicular angle to slope
            const distance = Math.sin(i) * WAVE_OFFSET;
            point.moveAtAngle(theta, distance);

            const isFixed = i === 0 || i === points - 1;

            return new Spring({ x: point.x, y: point.y, isFixed: false, mass });
        });

        // this.points.forEach((point, i) => {
        //     const prevPoint = this.points[i - 1];
        //     const nextPoint = this.points[i + 1];
        //     prevPoint && point.addAttractor(prevPoint);
        //     nextPoint && point.addAttractor(nextPoint);
        // });
    }

    applyForceFromMouse(point, pointer) {
        const { x, y } = pointer.position;

        const distance = point.distance(pointer.position);

        if (distance < MOUSE_RADIUS) {
            const [dx, dy] = pointer.delta();
            const power = (1 - distance / MOUSE_RADIUS) * MOUSE_STRENGTH;

            point.applyForce(dx * power, dy * power);
        }
    }

    applyAdjacentSpringForce(point, i) {
        const { points } = this;

        // return if this is the first or last point on the line
        if (i === 0 || i === points.length - 1) return;

        const { x, y } = point;

        const ppf = { x: 0, y: 0 }; // prev point force
        const npf = { x: 0, y: 0 }; // next point force

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
    }

    draw = context => {
        const { ctx } = context;
        ctx.strokeStyle = this.color;
        ctx.lineWidth = this.toValue(4);
        ctx.lineCap = 'round';
        ctx.beginPath();
        this.points.forEach(p => {
            ctx.lineTo(p.x, p.y);
            p.draw(context);
        });
        ctx.stroke();
    };

    update = context => {
        this.points.forEach((point, i) => {
            this.applyForceFromMouse(point, context.pointer);
            this.applyAdjacentSpringForce(point, i);
            point.update(context);
        });
    };
}

export default Wave;
