import Canvas from './modules/Canvas';
import Background from './modules/Background';
import Cursor from './modules/Cursor';
import Pointer from './modules/Pointer';
import Point from './modules/Point';
import TubeDude from './modules/TubeDude';

const colors = [
    '#d16060',
    '#edb07b',
    '#7bc4a2',
    '#343a5b',
    '#9b7bad',
    '#a05065',
];

const DPR = window.devicePixelRatio || 1;

// const center = new Point(
//     window.innerWidth / 2 * DPR,
//     window.innerHeight / 2 * DPR
// );

const bottomCenter = new Point(
    window.innerWidth / 2 * DPR,
    window.innerHeight * DPR
);

const width = Math.max(window.innerWidth, window.innerHeight) / 15 * DPR;

// Kick off
new Canvas({
    canvas: document.getElementById('canvas'),
    pointer: new Pointer(),
    entities: [
        new Background({ color: colors[3] }),
        new TubeDude({
            position: bottomCenter,
            color: colors[1],
            width,
            height: window.innerHeight * 0.6 * DPR,
        }),
        new TubeDude({
            position: bottomCenter
                .clone()
                .move(-window.innerWidth / 6 * DPR, 0),
            color: colors[2],
            width,
            height: window.innerHeight * 0.5 * DPR,
        }),
        new TubeDude({
            position: bottomCenter.clone().move(window.innerWidth / 6 * DPR, 0),
            color: colors[4],
            width,
            height: window.innerHeight * 0.7 * DPR,
        }),
        new Cursor({ color: 'white', radius: 10 }),
    ],
});
