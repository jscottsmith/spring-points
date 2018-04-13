import Point from './Point';

//*‡‡‡‡‡‡‡‡‡‡‡‡‡‡‡‡‡‡‡‡‡‡‡‡‡‡‡‡‡‡/
// Pointer
//*‡‡‡‡‡‡‡‡‡‡‡‡‡‡‡‡‡‡‡‡‡‡‡‡‡‡‡‡‡*/

class Pointer {
    constructor() {
        this.dpr = window.devicePixelRatio || 1;
        this.position = new Point(0, 0);
        this.addListeners();
    }

    addListeners() {
        ['mousemove', 'touchmove'].forEach((event, touch) => {
            window.addEventListener(
                event,
                e => {
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
