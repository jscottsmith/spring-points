import Canvas from './modules/Canvas';
import Background from './modules/Background';
import Cursor from './modules/Cursor';
import Pointer from './modules/Pointer';
import Spring from './modules/Spring';
import Wave from './modules/Wave';
import Point from './modules/Point';

import { getRandomInt, getRandomFloat } from './utils';

const colors = ['#42b9f4', '#8cd8d3', '#547fc4', '#e5cf77', '#4a99ad'];

const DPR = window.devicePixelRatio || 1;

const lines = Array(50)
    .fill(null)
    .map(() => {
        const x1 = getRandomInt(100, window.innerWidth - 100) * DPR;
        const y1 = 100 * DPR;
        const x2 = getRandomInt(100, window.innerWidth - 100) * DPR;
        const y2 = (window.innerHeight - 100) * DPR;
        return new Wave({
            p1: new Point(x1, y1),
            p2: new Point(x2, y2),
            points: 4,
            color: colors[getRandomInt(0, colors.length - 1)],
            mass: getRandomFloat(0.5, 3),
        });
    });

// Kick off
const canvas = new Canvas({
    canvas: document.getElementById('canvas'),
    pointer: new Pointer(),
    entities: [new Background(), ...lines, new Cursor(10)],
});
