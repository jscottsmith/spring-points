import Point from './Point';
import Link from './Link';

//*‡‡‡‡‡‡‡‡‡‡‡‡‡‡‡‡‡‡‡‡‡‡‡‡‡‡‡‡‡‡/
// Tangent
//*‡‡‡‡‡‡‡‡‡‡‡‡‡‡‡‡‡‡‡‡‡‡‡‡‡‡‡‡‡*/

class Tangent {
    constructor({ p1, p2, width }) {
        this.p1 = p1;
        this.p2 = p2;
        this.width = width;
        this.hw = width / 2;
        this.theta = 0;
        this.deltaTheta = 0;
        this.pi2 = Math.PI / 2;

        this.setCenter();
        this.createTangentPoints();
        this.setAngle();
        this.moveTangentPoints();
    }

    setCenter() {
        const [x, y] = this.p1.position;
        const [dx, dy] = this.p1.delta(this.p2);
        const cx = x - dx / 2;
        const cy = y - dy / 2;
        if (this.center) {
            this.center.moveTo(cx, cy);
        } else {
            this.center = new Point(cx, cy);
        }
    }

    createTangentPoints() {
        this.t1 = new Link({
            x: this.center.x,
            y: this.center.y,
            isFixed: true,
        });
        this.t2 = new Link({
            x: this.center.x,
            y: this.center.y,
            isFixed: true,
        });
        this.t1.moveAtAngle(this.theta, -this.hw);
        this.t2.moveAtAngle(this.theta, this.hw);
    }

    moveTangentPoints() {
        this.t1
            .moveTo(this.center.x, this.center.y)
            .moveAtAngle(this.theta + this.pi2, -this.hw);
        this.t2
            .moveTo(this.center.x, this.center.y)
            .moveAtAngle(this.theta + this.pi2, this.hw);
    }

    setAngle() {
        const theta = this.p1.angleRadians(this.p2);
        this.deltaTheta = theta - this.theta;
        this.theta = theta;
    }

    draw = ({ ctx }) => {
        // ctx.fillStyle = 'red';
        // ctx.fillRect(this.t1.x, this.t1.y, 10, 10);
        // ctx.fillRect(this.t2.x, this.t2.y, 10, 10);
    };

    update = () => {
        this.setCenter();
        this.setAngle();
        this.moveTangentPoints();
    };
}

export default Tangent;
