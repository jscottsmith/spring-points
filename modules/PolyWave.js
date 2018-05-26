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
        this.resolution = 40;
        this.elasticity = elasticity;
        this.damping = damping;

        this.constructPolyWave();
        this.setAttractors();
    }

    constructPolyWave() {
        for (let i = 0; i < this.verts.length; i++) {
            const p1 = this.verts[i];
            const p2 = this.verts[i + 1];

            if (p1 && p2) {
                const [dx, dy] = p2.point.delta(p1.point);
                const distance = p2.point.distance(p1.point);
                const amount = distance / this.resolution;
                const pointAmt = Math.round(amount);

                const offX = dx / pointAmt;
                const offY = dy / pointAmt;

                if (p1.isSpring) {
                    for (let k = 1; k <= pointAmt; k++) {
                        // debugger;
                        const x = p1.point.x + offX * k;
                        const y = p1.point.y + offY * k;
                        const point = new Spring({
                            x,
                            y,
                            elasticity: this.elasticity,
                            damping: this.damping,
                            isFixed: k === 0 || k === pointAmt,
                        });
                        this.points.push(point);
                    }
                } else {
                    this.points.push(
                        new Spring({
                            x: p2.point.x,
                            y: p2.point.y,
                            isFixed: true,
                        })
                    );
                }
            }
        }
    }

    setAttractors() {
        this.points.forEach((p, i) => {
            const isLast = i === this.points.length - 1;
            const isFirst = i === 0;
            if (isLast) {
                const prevPoint = this.points[i - 1];
                const nextPoint = this.points[0];
                !p.isFixed && p.addAttractor(prevPoint);
                !p.isFixed && p.addAttractor(nextPoint);
            } else if (isFirst) {
                const prevPoint = this.points[this.points.length - 1];
                const nextPoint = this.points[i + 1];
                !p.isFixed && p.addAttractor(prevPoint);
                !p.isFixed && p.addAttractor(nextPoint);
            } else {
                const prevPoint = this.points[i - 1];
                const nextPoint = this.points[i + 1];
                !p.isFixed && p.addAttractor(prevPoint);
                !p.isFixed && p.addAttractor(nextPoint);
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

        ctx.globalCompositeOperation = 'screen';
        ctx.fill();
        ctx.globalCompositeOperation = 'source-over';
    };

    update = context => {
        this.points.forEach(point => point.update(context));
    };
}

export default PolyWave;
