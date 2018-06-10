import Point from './Point';

//*‡‡‡‡‡‡‡‡‡‡‡‡‡‡‡‡‡‡‡‡‡‡‡‡‡‡‡‡‡‡/
// Spring
//*‡‡‡‡‡‡‡‡‡‡‡‡‡‡‡‡‡‡‡‡‡‡‡‡‡‡‡‡‡*/

// defaults and constants
const MASS = 2.5;
const ADJACENT_SPRING_CONSTANT = 0.12;

const DPR = window.devicePixelRatio || 1;
const MOUSE_STRENGTH = 0.7; // 0 - 1
const MOUSE_RADIUS = 100 * DPR;

class Link extends Point {
    constructor({ x, y, isFixed, mass = MASS }) {
        super(x, y);
        this.vx = 0; // velocity x
        this.vy = 0; // velocity y
        this.fx = 0; // force x
        this.fy = 0; // force y
        this.mass = mass;
        this.links = [];
        this.restingDist = null;
        this.isFixed = isFixed; // indicates whether this point can be moved
        this.iterations = Array(25).fill(null); // more solutions, more accurate
    }

    applyForce(x, y) {
        this.fx += x;
        this.fy += y;
    }

    addLink(point) {
        this.links = [...this.links, point];
        this.links = this.links.map(link => {
            if (link.restingDist) return link;
            link.restingDist = link.distance(this);
            return link;
        });
    }

    solveLinks() {
        // verlet relax constraints solution
        // solve multiple time for accuracy
        this.iterations.forEach(() => {
            this.links.forEach((link, i) => {
                const { restingDist } = link;
                const currentDist = link.distance(this);
                const [diffX, diffY] = link.delta(this);

                // difference scalar
                const diff = (restingDist - currentDist) / currentDist;

                // translation for each axis
                // pushed 1/2 the required distance to match their resting distances.
                const translateX = diffX * 0.5 * diff;
                const translateY = diffY * 0.5 * diff;

                !this.isFixed && this.move(-translateX, -translateY);
                !link.isFixed && link.move(translateX, translateY);

                !this.isFixed && this.applyForce(-translateX, -translateY);
                !link.isFixed && link.applyForce(translateX, translateY);
            });
        });
    }

    applyForceFromMouse(pointer) {
        const { x, y } = pointer.position;

        const distance = this.distance(pointer.position);

        if (distance < MOUSE_RADIUS) {
            const [dx, dy] = pointer.delta();
            const power = (1 - distance / MOUSE_RADIUS) * MOUSE_STRENGTH;

            this.applyForce(dx * power, dy * power);
        }
    }

    solveVelocity(tick) {
        if ((this.fx === 0 && this.fy === 0) || this.isFixed) return;

        // acceleration = force / mass;
        const ax = this.fx / this.mass;
        const ay = this.fy / this.mass;

        // velocity + acceleration
        this.vx = this.vx + ax;
        this.vy = this.vy + ay;

        // add velocity to center and top/left
        this.x += this.vx;
        this.y += this.vy;

        // reset any applied forces
        this.fx = 0;
        this.fy = 0;

        // baseline
        const maxY = DPR * window.innerHeight;
        if (this.y > maxY) {
            this.y = maxY;
            this.vy = 0;
            this.vx = this.vx / 2; // fake horizontal friction
        }
    }

    update = ({ pointer, tick }) => {
        if (this.isFixed) return;
        this.applyForceFromMouse(pointer);
        this.solveLinks();
        this.solveVelocity(tick);
    };

    draw = ({ ctx }) => {
        // temporary, just to see what's happening
        const { x, y } = this;
        ctx.fillStyle = 'white';
        ctx.lineWidth = 5;
        ctx.fillRect(x - 2, y - 2, 4, 4);
        // ctx.beginPath();
        // ctx.arc(x, y, 4, 0, Math.PI * 2, true);
        // ctx.closePath();
        // ctx.stroke();
    };
}

export default Link;
