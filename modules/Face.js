import Point from './Point';
import Link from './Link';

//*‡‡‡‡‡‡‡‡‡‡‡‡‡‡‡‡‡‡‡‡‡‡‡‡‡‡‡‡‡‡/
// Face
//*‡‡‡‡‡‡‡‡‡‡‡‡‡‡‡‡‡‡‡‡‡‡‡‡‡‡‡‡‡*/

class Face {
    constructor({ spine1, spine2, width }) {
        this.spine1 = spine1;
        this.spine2 = spine2;
        this.width = width;
        this.hw = width / 2;
        this.theta = 0;
        this.pi2 = Math.PI / 2;

        this.setCenter();
        this.createJoints();
        this.setAngle();
        this.moveJoints();
    }

    setCenter() {
        const [x, y] = this.spine1.position;
        const [dx, dy] = this.spine1.delta(this.spine2);
        const cx = x + dx / 2;
        const cy = y + dy / 2;
        if (this.center) {
            this.center.moveTo(cx, cy);
        } else {
            this.center = new Point(cx, cy);
        }
    }

    createJoints() {
        this.jointLeft = new Link({
            x: this.center.x,
            y: this.center.y,
            isFixed: true,
        });
        this.jointRight = new Link({
            x: this.center.x,
            y: this.center.y,
            isFixed: true,
        });
        this.jointLeft.moveAtAngle(this.theta, -this.hw);
        this.jointRight.moveAtAngle(this.theta, this.hw);
    }

    moveJoints() {
        this.jointLeft
            .moveTo(this.center.x, this.center.y)
            .moveAtAngle(this.theta + this.pi2, -this.hw);
        this.jointRight
            .moveTo(this.center.x, this.center.y)
            .moveAtAngle(this.theta + this.pi2, this.hw);
    }

    setAngle() {
        this.theta = this.spine1.angleRadians(this.spine2);
    }

    draw = ({ ctx }) => {
        // ctx.fillStyle = 'red';
        // ctx.fillRect(this.jointLeft.x, this.jointLeft.y, 10, 10);
        // ctx.fillRect(this.jointRight.x, this.jointRight.y, 10, 10);
    };

    update = () => {
        this.setCenter();
        this.setAngle();
        this.moveJoints();
    };
}

export default Face;
