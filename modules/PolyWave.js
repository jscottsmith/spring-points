import Entity from './Entity';
import Spring from './Spring';
import { getRandomInt, getRandomFloat } from '../utils';

//*‡‡‡‡‡‡‡‡‡‡‡‡‡‡‡‡‡‡‡‡‡‡‡‡‡‡‡‡‡‡/
// PolyWave
//*‡‡‡‡‡‡‡‡‡‡‡‡‡‡‡‡‡‡‡‡‡‡‡‡‡‡‡‡‡*/

class PolyWave extends Entity {
    constructor({ verts, color, elasticity, damping }) {
        super();
        this.verts = verts; // corners
        this.color = color;
        this.points = [];
        this.resolution = 20;
        this.elasticity = elasticity;
        this.damping = damping;

        this.constructPolyWave();
        this.setAttractors();
    }

    constructPolyWave() {
        let begin = true;

        for (let i = 0; i < this.verts.length; i++) {
            const p1 = this.verts[i];
            const p2 = this.verts[i + 1];

            if (p1 && p2) {
                const [dx, dy] = p1.delta(p2);
                const distance = p1.distance(p2);
                const amount = distance / this.resolution;
                const pointAmt = Math.round(amount);

                const offX = dx / pointAmt;
                const offY = dy / pointAmt;

                for (let k = 1; k <= pointAmt; k++) {
                    const x = p1.x - offX * k;
                    const y = p1.y - offY * k;
                    this.points.push(
                        new Spring({
                            x,
                            y,
                            elasticity: this.elasticity,
                            damping: this.damping,
                        })
                    );
                }

                begin = false;
            }
        }
    }

    setAttractors() {
        this.points.forEach((p, i) => {
            const isLast = i === this.points.length - 1;
            const isFirst = i === 0;
            if (isLast) {
                p.addAttractor(this.points[i - 1]);
                p.addAttractor(this.points[0]);
            } else if (isFirst) {
                p.addAttractor(this.points[this.points.length - 1]);
                p.addAttractor(this.points[i + 1]);
            } else {
                p.addAttractor(this.points[i - 1]);
                p.addAttractor(this.points[i + 1]);
            }
        });
    }

    draw = ({ ctx, bounds }) => {
        ctx.beginPath();

        this.points.forEach(point => {
            ctx.lineTo(point.x, point.y);
        });

        ctx.closePath();

        ctx.fillStyle = this.color;

        ctx.lineWidth = this.toValue(2);
        ctx.lineCap = 'round';
        ctx.lineJoin = 'round';

        ctx.fill();
    };

    update = context => {
        this.points.forEach(point => point.update(context));
    };
}

export default PolyWave;
