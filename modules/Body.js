import Link from './Link';
import Entity from './Entity';

class Body extends Entity {
    constructor({ width, height, position, resolution, color }) {
        super();
        this.width = width;
        this.color = color;
        this.height = height;
        this.position = position;
        this.resolution = resolution;
        this.spine = [];

        this.constructSpine();
        this.setLinks(this.spine);
    }

    constructSpine() {
        const amount = this.height / this.resolution;
        const pointAmt = Math.round(amount);
        const offY = this.height / pointAmt;
        const x = this.position.x;

        for (let i = 0; i <= pointAmt; i++) {
            const y = this.position.y - offY * i;
            const point = new Link({
                x,
                y,
                isFixed: i === 0,
            });
            this.spine.push(point);
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
            this.position.x,
            this.position.y,
            this.width / 2,
            0,
            Math.PI,
            true
        );
        ctx.closePath();
        ctx.fill();

        // spine
        ctx.beginPath();
        this.spine.forEach(point => {
            ctx.lineTo(point.x, point.y);
        });
        ctx.strokeStyle = this.color;
        ctx.lineWidth = this.width;
        ctx.lineCap = 'butt';
        ctx.lineJoin = 'round';
        ctx.stroke();

        // this.spine.forEach(point => {
        //     ctx.beginPath();
        //     ctx.lineTo(point.x, point.y);
        //     ctx.lineTo(point.x + 1, point.y + 1);
        //     ctx.closePath();
        //     ctx.strokeStyle = 'white';
        //     ctx.lineWidth = this.toValue(4);
        //     ctx.stroke();
        // });
    };

    update = context => {
        const fy = Math.abs(Math.sin(context.tick / 40)) * -1 - 1;

        this.spine.forEach(point => {
            point.applyForce(Math.sin(context.tick / 100) * 0.1, fy);
            point.update(context);
        });
    };
}

export default Body;
