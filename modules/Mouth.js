import Spring from './Spring';
import Tangent from './Tangent';
import Point from './Point';

//*‡‡‡‡‡‡‡‡‡‡‡‡‡‡‡‡‡‡‡‡‡‡‡‡‡‡‡‡‡‡/
// Mouth
//*‡‡‡‡‡‡‡‡‡‡‡‡‡‡‡‡‡‡‡‡‡‡‡‡‡‡‡‡‡*/

class Mouth {
    constructor({ p1, p2, size, position, lipColor, lipWidth, mouthColor }) {
        this.tan = new Tangent({ p1, p2, size });
        this.lipColor = lipColor;
        this.lipWidth = lipWidth;
        this.mouthColor = mouthColor;
        this.pad = size * 2;
        this.pad2 = size * 4;
        this.size = size + this.pad2;
        this.width = size * 1.5;
        this.center = new Point(this.size / 2, this.size / 2);
        this.position = position;
        this.hs = this.width / 2;
        // offset to account for center translation
        const off = -this.hs;

        this.lip = new Spring({
            x: this.hs + off,
            y: this.width + off,
            elasticity: 0.6,
            damping: 0.1,
            mass: 15,
        });

        this.mouthLeft = new Point(off, this.hs + off);
        this.mouthRight = new Point(this.width + off, this.hs + off);

        // local canvas
        this.canvas = document.createElement('canvas');
        this.canvas.width = this.canvas.height = this.size;
        this.ctx = this.canvas.getContext('2d');
        this.drawLocal();
    }

    drawLocal() {
        this.ctx.clearRect(0, 0, this.size, this.size);

        // save and rotate
        this.ctx.save();
        this.ctx.translate(this.size / 2, this.size / 2);
        this.ctx.rotate(this.tan.theta - Math.PI / 2);

        this.ctx.beginPath();
        this.ctx.moveTo(...this.mouthLeft.position);

        // control points
        const cpx1 = (this.mouthRight.x + this.lip.x) / 2;
        const cpy1 = (this.mouthRight.y + this.lip.y) / 2;
        const cpx2 = (this.lip.x + this.mouthRight.x) / 2;
        const cpy2 = (this.lip.y + this.mouthRight.y) / 2;

        // curves
        this.ctx.quadraticCurveTo(
            this.mouthLeft.x,
            this.mouthLeft.y + this.lip.y,
            this.lip.x,
            this.lip.y
        );
        this.ctx.quadraticCurveTo(
            this.mouthRight.x,
            this.mouthRight.y + this.lip.y,
            this.mouthRight.x,
            this.mouthRight.y
        );

        this.ctx.closePath();

        // drawing
        this.ctx.strokeStyle = this.lipColor;
        this.ctx.lineWidth = this.lipWidth;
        this.ctx.lineCap = 'round';
        this.ctx.lineJoin = 'round';

        // mouth
        this.ctx.fillStyle = this.mouthColor;
        this.ctx.fill();
        // teeth
        this.ctx.clip();
        this.ctx.fillStyle = 'white';
        this.ctx.fillRect(
            this.mouthLeft.x,
            this.mouthLeft.y,
            this.width * 2,
            this.width / 7
        );
        // lips
        // this.ctx.stroke();
        this.ctx.restore();
    }

    setVelocity() {
        const [dx, dy] = this.tan.center.delta(this.ct);
        this.lip.applyForce(0, -dy * 2);
    }

    draw = ({ ctx }) => {
        this.drawLocal();

        ctx.drawImage(
            this.canvas,
            this.tan.center.x - this.size / 2,
            this.tan.center.y - this.size / 2,
            this.size,
            this.size
        );
    };

    update = ({ theta }) => {
        this.ct = this.tan.center.clone();
        this.tan.update();
        this.setVelocity();
        this.lip.update({});
    };
}

export default Mouth;
