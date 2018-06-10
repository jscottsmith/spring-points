import Entity from './Entity';
import Link from './Link';

//*‡‡‡‡‡‡‡‡‡‡‡‡‡‡‡‡‡‡‡‡‡‡‡‡‡‡‡‡‡‡/
// Arm
//*‡‡‡‡‡‡‡‡‡‡‡‡‡‡‡‡‡‡‡‡‡‡‡‡‡‡‡‡‡*/

class Arm extends Entity {
    constructor({ joint, length, resolution, color, mass, width }) {
        super();
        this.joint = joint;
        this.length = length;
        this.width = width;
        this.resolution = resolution;
        this.color = color;
        this.points = [this.joint];
        this.mass = mass;

        this.constructArm();
        this.setLinks(this.points);
    }

    constructArm() {
        const pointAmt = Math.round(this.length / this.resolution);
        const offY = this.length / pointAmt;
        const x = this.joint.x;
        const armPoints = Math.round(this.length / this.resolution);

        for (let i = 0; i <= armPoints; i++) {
            const y = this.joint.y - offY * i;
            const isFirst = i === 0;
            const point = new Link({
                x,
                y,
                mass: this.mass,
            });

            if (isFirst) {
                point.addLink(this.joint);
                // this.joint.addLink(point);
            }

            this.points.push(point);
        }
    }

    setLinks(points) {
        points.forEach((point, i) => {
            const isLast = i === points.length - 1;
            const isFirst = i === 0;
            if (isLast) {
                const prevPoint = points[i - 1];
                point.addLink(prevPoint);
            } else if (isFirst) {
                const nextPoint = points[i + 1];
                point.addLink(nextPoint);
            } else {
                const prevPoint = points[i - 1];
                const nextPoint = points[i + 1];
                point.addLink(prevPoint);
                point.addLink(nextPoint);
            }
        });
    }

    draw = ({ ctx }) => {
        // base
        ctx.fillStyle = this.color;
        ctx.beginPath();
        ctx.arc(
            this.joint.x,
            this.joint.y,
            this.width / 2,
            0,
            Math.PI * 2,
            true
        );
        ctx.closePath();
        ctx.fill();

        ctx.strokeStyle = this.color;
        ctx.beginPath();
        this.points.forEach(point => {
            ctx.lineTo(point.x, point.y);
        });
        ctx.lineWidth = this.width;
        ctx.stroke();

        // this.points.forEach(point => {
        //     ctx.beginPath();
        //     ctx.lineTo(point.x, point.y);
        //     ctx.lineTo(point.x + 1, point.y + 1);
        //     ctx.closePath();
        //     ctx.strokeStyle = 'white';
        //     ctx.lineWidth = this.toValue(4);
        //     ctx.stroke();
        // });
    };
}

export default Arm;
