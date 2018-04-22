import Point from './Point';

//*‡‡‡‡‡‡‡‡‡‡‡‡‡‡‡‡‡‡‡‡‡‡‡‡‡‡‡‡‡‡/
// Pointer
//*‡‡‡‡‡‡‡‡‡‡‡‡‡‡‡‡‡‡‡‡‡‡‡‡‡‡‡‡‡*/

class Pointer {
    constructor() {
        this.dpr = window.devicePixelRatio || 1;
        this.delta;
        this.lastPosition = new Point(0, 0);
        this.position = new Point(0, 0);
        this.addListeners();
    }

    delta() {
        return this.position.delta(this.lastPosition);
    }

    addListeners() {
        ['mousemove', 'touchmove'].forEach((event, touch) => {
            window.addEventListener(
                event,
                e => {
                    // move previous point
                    const { x: px, y: py } = this.position;
                    this.lastPosition.moveTo(px, py);

                    if (touch) {
                        e.preventDefault();
                        const x = e.targetTouches[0].clientX * this.dpr;
                        const y = e.targetTouches[0].clientY * this.dpr;
                        this.position.moveTo(x, y);
                    } else {
                        const x = e.clientX * this.dpr;
                        const y = e.clientY * this.dpr;
                        this.position.moveTo(x, y);
                    }
                },
                false
            );
        });
    }
}

export default Pointer;
