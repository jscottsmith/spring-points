import Point from './Point';
// import Entity from './Entity';
import Spring from './Spring';

//*‡‡‡‡‡‡‡‡‡‡‡‡‡‡‡‡‡‡‡‡‡‡‡‡‡‡‡‡‡‡/
// Eye
//*‡‡‡‡‡‡‡‡‡‡‡‡‡‡‡‡‡‡‡‡‡‡‡‡‡‡‡‡‡*/

class Eye {
    constructor({ size, position, theta, color }) {
        this.color = color;
        this.size = size;
        this.setTheta(theta);
        this.position = position;
        this.pupil = new Spring({
            x: 0,
            y: 0,
            elasticity: 0.5,
            damping: 0.3,
            mass: 30,
        });
        this.canvas = document.createElement('canvas');
        this.canvas.width = this.canvas.height = this.size;
        this.ctx = this.canvas.getContext('2d');
        this.drawLocal();
    }

    setTheta(theta) {
        this.theta = theta + Math.PI / 2;
    }

    drawLocal() {
        this.ctx.clearRect(0, 0, this.size, this.size);
        this.ctx.save();
        this.ctx.translate(this.size / 2, this.size / 2);
        this.ctx.rotate(this.theta);

        // Create a circular clipping path
        this.ctx.beginPath();
        this.ctx.arc(0, 0, this.size / 2, 0, Math.PI * 2, true);
        this.ctx.clip();

        // whites
        this.ctx.fillStyle = 'white';
        this.ctx.beginPath();
        this.ctx.arc(0, 0, this.size / 2, 0, Math.PI * 2, true);
        this.ctx.closePath();
        this.ctx.fill();

        // pupil
        this.ctx.fillStyle = 'black';
        this.ctx.beginPath();
        this.ctx.arc(
            this.pupil.x,
            this.pupil.y,
            this.size / 4,
            0,
            Math.PI * 2,
            true
        );
        this.ctx.closePath();
        this.ctx.fill();

        // lid
        this.ctx.translate(-this.size / 2, -this.size / 2);
        this.ctx.fillStyle = this.color;
        this.ctx.fillRect(0, 0, this.size, this.size / 3);

        this.ctx.fillStyle = `rgba(0, 0, 0, 0.1)`;
        this.ctx.fillRect(0, 0, this.size, this.size / 3);

        this.ctx.restore();
    }

    draw = ({ ctx }) => {
        this.drawLocal();
        ctx.drawImage(
            this.canvas,
            this.position.x - this.size / 2,
            this.position.y - this.size / 2,
            this.size,
            this.size
        );
    };

    update = ({ theta }) => {
        this.setTheta(theta);
        this.pupil.update({});
    };
}

export default Eye;
