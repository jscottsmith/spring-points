import Canvas from './modules/Canvas';
import Background from './modules/Background';
import Cursor from './modules/Cursor';
import Pointer from './modules/Pointer';
import Spring from './modules/Spring';
import Wave from './modules/Wave';
import Point from './modules/Point';

//*‡‡‡‡‡‡‡‡‡‡‡‡‡‡‡‡‡‡‡‡‡‡‡‡‡‡‡‡‡‡/
// utils
//*‡‡‡‡‡‡‡‡‡‡‡‡‡‡‡‡‡‡‡‡‡‡‡‡‡‡‡‡‡*/

// Kick off
const canvas = new Canvas({
    canvas: document.getElementById('canvas'),
    pointer: new Pointer(),
    entities: [
        new Background(),
        new Cursor(10),
        // new Spring(window.innerWidth / 2, window.innerHeight / 2),
        new Wave(
            10,
            new Point(0, 0),
            new Point(window.innerWidth, window.innerHeight)
        ),
    ],
});
