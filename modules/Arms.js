import Arm from './Arm';
import Tangent from './Tangent';

//*‡‡‡‡‡‡‡‡‡‡‡‡‡‡‡‡‡‡‡‡‡‡‡‡‡‡‡‡‡‡/
// Arms
//*‡‡‡‡‡‡‡‡‡‡‡‡‡‡‡‡‡‡‡‡‡‡‡‡‡‡‡‡‡*/

class Arms {
    constructor({ p1, p2, shoulderWidth, length, width, resolution, color }) {
        this.tan = new Tangent({ p1, p2, width: shoulderWidth });

        const config = {
            length,
            width,
            resolution,
            color,
        };

        this.la = new Arm({
            ...config,
            joint: this.tan.t1,
        });

        this.ra = new Arm({
            ...config,
            joint: this.tan.t2,
        });
    }

    draw = ({ ctx }) => {
        this.la.draw({ ctx });
        this.ra.draw({ ctx });
    };

    update = context => {
        const fy = Math.abs(Math.sin(context.tick / 40)) * -1 - 1;

        const sin = Math.sin(context.tick / 100);

        this.tan.update();

        this.la.points.forEach(point => {
            point.applyForce(sin * 0.1 - 1, fy);
            point.update(context);
            // context.ctx.fillStyle = 'white';
            // context.ctx.fillRect(point.x, point.y, 10, 10);
        });

        this.ra.points.forEach(point => {
            point.applyForce(sin * 0.1 + 1, fy);
            point.update(context);
        });
    };
}

export default Arms;
