import Bounds from './Bounds';

//*‡‡‡‡‡‡‡‡‡‡‡‡‡‡‡‡‡‡‡‡‡‡‡‡‡‡‡‡‡‡/
// Canvas
//*‡‡‡‡‡‡‡‡‡‡‡‡‡‡‡‡‡‡‡‡‡‡‡‡‡‡‡‡‡*/

class Canvas {
    constructor({ canvas, entities = [], pointer }) {
        // setup a canvas
        this.canvas = canvas;
        this.dpr = window.devicePixelRatio || 1;
        this.ctx = canvas.getContext('2d');
        this.ctx.scale(this.dpr, this.dpr);

        // tick counter
        this.tick = 0;

        // entities to be drawn on the canvas
        this.entities = entities;

        // track mouse/touch movement
        this.pointer = pointer || null;

        // setup and run
        this.setCanvasSize();
        this.setupListeners();
        this.render();

        // demo pointer
        this.pointer.addPointerModifier((pointer, tick) => {
            const cx = window.innerWidth / 2 * this.dpr;
            const cy = window.innerHeight / 2 * this.dpr;

            const dx = window.innerWidth / 4 * this.dpr;
            const dy = window.innerHeight / 4 * this.dpr;

            const offX = cx + Math.sin(tick / 20) * dx;
            const offY = cy + Math.cos(-tick / 20) * dy;

            pointer.lastPosition.moveTo(pointer.position.x, pointer.position.y);
            pointer.position.moveTo(offX, offY);
        });
    }

    setupListeners() {
        window.addEventListener('resize', this.setCanvasSize);
    }

    setCanvasSize = () => {
        const { innerWidth: w, innerHeight: h } = window;
        const w2 = w * this.dpr;
        const h2 = h * this.dpr;
        this.canvas.width = w2;
        this.canvas.height = h2;
        this.canvas.style.width = w + 'px';
        this.canvas.style.height = h + 'px';
        this.bounds = new Bounds(0, 0, w2, h2);
    };

    addEntity = newEntity => {
        this.entities = [...this.entities, newEntity];
        return this.entities.length - 1;
    };

    removeEntity(deleteIndex) {
        this.entities = this.entities.filter((el, i) => i !== deleteIndex);
        return this.entities;
    }

    removeDead() {
        this.entities = this.entities.filter(({ dead = false }) => !dead);
    }

    render = () => {
        // Main loop

        // Draw and Update items here.
        this.entities.forEach(({ draw, update }) => {
            draw(this);
            update(this);
        });

        // update pointer for demos
        this.pointer.update(this);

        // Cleanup "dead" entities
        this.removeDead();

        ++this.tick;
        window.requestAnimationFrame(this.render);
    };
}

export default Canvas;
