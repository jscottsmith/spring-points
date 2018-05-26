import Canvas from './modules/Canvas';
import Background from './modules/Background';
import Cursor from './modules/Cursor';
import Pointer from './modules/Pointer';
import Spring from './modules/Spring';
import Wave from './modules/Wave';
import Point from './modules/Point';
import PolyWave from './modules/PolyWave';

import {
    getRandomInt,
    getRandomFloat,
    clip,
    cycle,
    randomGauss,
} from './utils';

const colors = [
    '#d16060',
    '#edb07b',
    '#7bc4a2',
    '#343a5b',
    '#9b7bad',
    '#a05065',
];

function generateRandomTriangle(center, size) {
    const rad1 = getRandomFloat(0, 2);
    const rad2 = getRandomFloat(0, 2);
    const rad3 = 2 + rad1 + rad2;

    const p1 = center.clone().moveAtAngle(rad1, size);
    const p2 = center.clone().moveAtAngle(rad2, size);
    const p3 = center.clone().moveAtAngle(rad3, size);
    return [p1, p2, p3];
}

const DPR = window.devicePixelRatio || 1;

const center = new Point(
    window.innerWidth / 2 * DPR,
    window.innerHeight / 2 * DPR
);

const createWaves = amount =>
    Array(amount)
        .fill(null)
        .map((_, i) => {
            const size = 40 * (amount - i) * DPR;
            const points = 6 + (amount - i);
            const verts = [
                {
                    point: new Point(0, window.innerHeight * DPR / 2),
                    isSpring: true,
                },
                {
                    point: new Point(
                        window.innerWidth * DPR,
                        window.innerHeight * DPR / 2
                    ),
                },
                {
                    point: new Point(
                        window.innerWidth * DPR,
                        window.innerHeight * DPR
                    ),
                },
                {
                    point: new Point(0, window.innerHeight * DPR),
                },
            ];

            const cdx = cycle(i, colors.length);
            return new PolyWave({
                verts: [...verts, verts[0]],
                elasticity: getRandomFloat(0.15, 0.2),
                damping: getRandomFloat(0.84, 0.89),
                color: colors[cdx],
            });
        });

// Kick off
const canvas = new Canvas({
    canvas: document.getElementById('canvas'),
    pointer: new Pointer(),
    entities: [new Background(), ...createWaves(4), new Cursor(10)],
});
