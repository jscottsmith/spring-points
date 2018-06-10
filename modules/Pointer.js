import Point from './Point';

//*‡‡‡‡‡‡‡‡‡‡‡‡‡‡‡‡‡‡‡‡‡‡‡‡‡‡‡‡‡‡/
// Pointer
//*‡‡‡‡‡‡‡‡‡‡‡‡‡‡‡‡‡‡‡‡‡‡‡‡‡‡‡‡‡*/

class Pointer {
    constructor() {
        this.dpr = window.devicePixelRatio || 1;
        this.delta;
        this.lastPosition = null;
        this.position = new Point(null, null);
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

                    // disable the demo modifier if it's been added
                    if (this.modifier) {
                        this.modifier = null;
                    }

                    if (touch) {
                        e.preventDefault();
                        const x = e.targetTouches[0].clientX * this.dpr;
                        const y = e.targetTouches[0].clientY * this.dpr;
                        if (!this.lastPosition) {
                            this.lastPosition = new Point(x, y);
                        } else {
                            this.lastPosition.moveTo(px, py);
                        }
                        this.position.moveTo(x, y);
                    } else {
                        const x = e.clientX * this.dpr;
                        const y = e.clientY * this.dpr;
                        if (!this.lastPosition) {
                            this.lastPosition = new Point(x, y);
                        } else {
                            this.lastPosition.moveTo(px, py);
                        }
                        this.position.moveTo(x, y);
                    }
                },
                false
            );
        });
    }

    addPointerModifier(modifier) {
        this.modifier = modifier;
    }

    update = ({ tick }) => {
        this.modifier && this.modifier(this, tick);
    };
}

export default Pointer;
