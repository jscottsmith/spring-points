import Canvas from './modules/Canvas';
import Background from './modules/Background';
import Cursor from './modules/Cursor';
import Pointer from './modules/Pointer';
import Spring from './modules/Spring';
import Wave from './modules/Wave';
import Point from './modules/Point';

import { getRandomInt, getRandomFloat } from './utils';

const colors = [
    '#42b9f4',
    '#8cd8d3',
    '#547fc4',
    '#e5cf77',
    '#4a99ad',
    '#e2c37c',
];

const DPR = window.devicePixelRatio || 1;
const off = Math.min(window.innerWidth, window.innerHeight) / 15 * DPR;

const lines = Array(10)
    .fill(null)
    .map(() => {
        const x1 = getRandomInt(off, window.innerWidth - off) * DPR;
        const y1 = off * DPR;
        const x2 = getRandomInt(off, window.innerWidth - off) * DPR;
        const y2 = (window.innerHeight - off) * DPR;
        return new Wave({
            p1: new Point(x1, y1),
            p2: new Point(x2, y2),
            points: 50,
            color: colors[getRandomInt(0, colors.length - 1)],
            mass: getRandomFloat(1, 5),
            elasticity: getRandomFloat(0.05, 0.1),
            damping: getRandomFloat(0.93, 0.85),
        });
    });

// Kick off
const canvas = new Canvas({
    canvas: document.getElementById('canvas'),
    pointer: new Pointer(),
    entities: [new Background(), ...lines, new Cursor(10)],
});
