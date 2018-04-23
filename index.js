import Canvas from './modules/Canvas';
import Background from './modules/Background';
import Cursor from './modules/Cursor';
import Pointer from './modules/Pointer';
import Spring from './modules/Spring';
import Wave from './modules/Wave';
import Point from './modules/Point';
import PolyWave from './modules/PolyWave';

import { getRandomInt, getRandomFloat } from './utils';

const colors = ['#42b9f4', '#8cd8d3', '#547fc4', '#e5cf77', '#4a99ad'];

const DPR = window.devicePixelRatio || 1;

// Kick off
const canvas = new Canvas({
    canvas: document.getElementById('canvas'),
    pointer: new Pointer(),
    entities: [
        new Background(),
        new PolyWave([
            { point: new Point(0, 0) },
            { point: new Point(700, 200) },
            { point: new Point(800, 900) },
            { point: new Point(0, window.innerHeight * DPR) },
            { point: new Point(0, 0) },
        ]),
        new Cursor(10),
    ],
});
