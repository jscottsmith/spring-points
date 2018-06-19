import Eye from './Eye';
import Tangent from './Tangent';

//*‡‡‡‡‡‡‡‡‡‡‡‡‡‡‡‡‡‡‡‡‡‡‡‡‡‡‡‡‡‡/
// Eyes
//*‡‡‡‡‡‡‡‡‡‡‡‡‡‡‡‡‡‡‡‡‡‡‡‡‡‡‡‡‡*/

class Eyes {
    constructor({ p1, p2, width, size, color, pupilColor }) {
        this.tan = new Tangent({
            p1,
            p2,
            width,
        });

        this.li = new Eye({
            size,
            color,
            pupilColor,
            position: this.tan.t1,
            theta: this.tan.theta,
        });

        this.ri = new Eye({
            size,
            color,
            pupilColor,
            position: this.tan.t2,
            theta: this.tan.theta,
        });
    }

    setVelocity() {
        const [ldx, ldy] = this.tan.t1.delta(this.ct1);
        const [rdx, rdy] = this.tan.t2.delta(this.ct2);
        this.li.pupil.applyForce(-ldx, -ldy);
        this.ri.pupil.applyForce(-rdx, -rdy);
    }

    draw = ({ ctx }) => {
        this.li.draw({ ctx });
        this.ri.draw({ ctx });
    };

    update = context => {
        const { theta } = this.tan;

        this.ct1 = this.tan.t1.clone();
        this.ct2 = this.tan.t2.clone();

        this.tan.update();
        this.setVelocity();

        this.li.update({
            theta,
            ...context,
        });
        this.ri.update({
            theta,
            ...context,
        });
    };
}

export default Eyes;
