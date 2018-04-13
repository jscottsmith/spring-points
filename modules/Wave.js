import Entity from './Entity';
import Spring from './Spring';

//*‡‡‡‡‡‡‡‡‡‡‡‡‡‡‡‡‡‡‡‡‡‡‡‡‡‡‡‡‡‡/
// Wave
//*‡‡‡‡‡‡‡‡‡‡‡‡‡‡‡‡‡‡‡‡‡‡‡‡‡‡‡‡‡*/

const SPRING_CONSTANT = 10;

class Wave extends Entity {
    constructor(points, p1, p2) {
        super();
        // delta between two endpoints
        const dx = p2.x - p1.x;
        const dy = p2.y - p1.y;

        // offsets between each point along the line
        const offX = dx / (points - 1);
        const offY = dy / (points - 1);

        this.points = new Array(points)
            .fill(null)
            .map((p, i) => new Spring(p1.x + offX * i, p1.y + offY * i));
    }

    applyAdjacentSpringForce() {
        const { points } = this;

        for (var n = 0; n < points.length; n++) {
            const p = points[n];

            const { x, y } = p;

            const forceFromLeft = {
                x: 0,
                y: 0,
            };
            const forceFromRight = {
                x: 0,
                y: 0,
            };

            if (n === 0) {
                // wrap to left-to-right
                const dy = points[points.length - 1].y - y;
                const dx = points[points.length - 1].x - x;
                forceFromLeft.y = SPRING_CONSTANT * dy;
                forceFromLeft.x = SPRING_CONSTANT * dx;
            } else {
                // normally
                const dy = points[n - 1].y - y;
                const dx = points[n - 1].x - x;
                forceFromLeft.y = SPRING_CONSTANT * dy;
                forceFromLeft.x = SPRING_CONSTANT * dx;
            }
            if (n === points.length - 1) {
                // wrap to right-to-left
                const dy = points[0].y - y;
                const dx = points[0].x - x;
                forceFromRight.y = SPRING_CONSTANT * dy;
                forceFromRight.x = SPRING_CONSTANT * dx;
            } else {
                // normally
                const dy = points[n + 1].y - y;
                const dx = points[n + 1].x - x;
                forceFromRight.y = SPRING_CONSTANT * dy;
                forceFromRight.x = SPRING_CONSTANT * dx;
            }

            // apply adjacent forces to current spring
            p.applyForce(...forceFromLeft);
            p.applyForce(...forceFromRight);
        }
    }

    draw = context => {
        this.points.forEach(p => p.draw(context));
        const { ctx } = context;
        ctx.strokeStyle = '#fff';
        ctx.lineWidth = 2;
        ctx.beginPath();
        this.points.forEach(p => {
            ctx.lineTo(p.x, p.y);
        });
        ctx.stroke();
    };

    update = context => {
        this.points.forEach(p => p.update(context));
    };
}

export default Wave;
