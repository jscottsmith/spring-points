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

const bottomCenter = new Point(
    window.innerWidth / 2 * DPR,
    window.innerHeight * DPR
);

const width = Math.max(window.innerWidth, window.innerHeight) / 15 * DPR;

const color = {
    bg: '#F4F3EE',
    dude1: '#E59090',
    dude2: '#E0D67A',
    dude3: '#8385D7',
    pupilColor: '#31343B',
    mouthColor: '#60464E',
    cursor: '#31343B',
};

// Kick off
new Canvas({
    canvas: document.getElementById('canvas'),
    pointer: new Pointer(),
    entities: [
        new Background({ color: color.bg }),
        new TubeDude({
            position: bottomCenter,
            color: color.dude1,
            width,
            height: window.innerHeight * 0.6 * DPR,
            mouthColor: color.mouthColor,
            pupilColor: color.pupilColor,
        }),
        new TubeDude({
            position: bottomCenter
                .clone()
                .move(-window.innerWidth / 6 * DPR, 0),
            color: color.dude2,
            width,
            height: window.innerHeight * 0.5 * DPR,
            mouthColor: color.mouthColor,
            pupilColor: color.pupilColor,
        }),
        new TubeDude({
            position: bottomCenter.clone().move(window.innerWidth / 6 * DPR, 0),
            color: color.dude3,
            width,
            height: window.innerHeight * 0.7 * DPR,
            mouthColor: color.mouthColor,
            pupilColor: color.pupilColor,
        }),
        new Cursor({ color: 'white', radius: 10 }),
    ],
});
