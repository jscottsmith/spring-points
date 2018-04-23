import Entity from './Entity';
import Wave from './Wave';
import { getRandomInt, getRandomFloat } from '../utils';

//*‡‡‡‡‡‡‡‡‡‡‡‡‡‡‡‡‡‡‡‡‡‡‡‡‡‡‡‡‡‡/
// PolyWave
//*‡‡‡‡‡‡‡‡‡‡‡‡‡‡‡‡‡‡‡‡‡‡‡‡‡‡‡‡‡*/

class PolyWave extends Entity {
    constructor(verts) {
        super();
        this.verts = verts;
        this.wave = [];

        this.constructPolyWave();
    }

    constructPolyWave() {
        for (let i = 0; i < this.verts.length; i++) {
            const { point: p1 } = this.verts[i] || {};
            const { point: p2 } = this.verts[i + 1] || {};
            if (p1 && p2) {
                this.wave.push(
                    new Wave({
                        p1,
                        p2,
                        points: 50,
                        color: '#fff',
                        mass: getRandomFloat(2, 3),
                    })
                );
            }
        }
    }

    draw = ({ ctx, bounds }) => {
        const gradient = ctx.createLinearGradient(...bounds.params);
        gradient.addColorStop(0, '#8cd8d3');
        gradient.addColorStop(1, '#6fdb91');
        ctx.fillStyle = gradient;
        ctx.lineWidth = this.toValue(4);
        ctx.lineCap = 'round';
        ctx.lineJoin = 'round';
        ctx.beginPath();
        this.wave.forEach(wave => {
            wave.points.forEach((point, i) => {
                ctx.lineTo(point.x, point.y);
            });
        });
        ctx.closePath();
        ctx.fill();
    };

    update = context => {
        this.wave.forEach(wave => wave.update(context));
    };
}

export default PolyWave;
