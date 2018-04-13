import Entity from './Entity';

//*‡‡‡‡‡‡‡‡‡‡‡‡‡‡‡‡‡‡‡‡‡‡‡‡‡‡‡‡‡‡/
// Cursor
//*‡‡‡‡‡‡‡‡‡‡‡‡‡‡‡‡‡‡‡‡‡‡‡‡‡‡‡‡‡*/

class Cursor extends Entity {
    constructor(radius) {
        super();
        this.radius = this.toValue(radius);
        this.pi2 = Math.PI * 2;
        this.lineWidth = this.toValue(2);
        this.strokeStyle = '#fff';
    }

    draw = ({ ctx, pointer }) => {
        ctx.strokeStyle = this.strokeStyle;
        ctx.lineWidth = this.lineWidth;
        ctx.beginPath();
        ctx.arc(
            pointer.position.x,
            pointer.position.y,
            this.radius,
            0,
            this.pi2,
            true
        );
        ctx.closePath();
        ctx.stroke();
    };
}

export default Cursor;
