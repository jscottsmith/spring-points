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

function generatePolygon(ctrX, ctrY, aveRadius = 100, numVerts = 6) {
    // Ported from http://stackoverflow.com/a/25276331

    let irregularity = 0.3;
    let spikeyness = 0.5;

    irregularity = clip(irregularity, 0, 1) * 2 * Math.PI / numVerts;
    spikeyness = clip(spikeyness, 0, 1) * aveRadius;

    // generate n angle steps
    const angleSteps = [];
    const lower = 2 * Math.PI / numVerts - irregularity;
    const upper = 2 * Math.PI / numVerts + irregularity;

    let sum = 0;
    for (var i = 0; i < numVerts; i++) {
        const tmp = getRandomInt(lower, upper);
        angleSteps.push(tmp);
        sum = sum + tmp;
    }

    // normalize the steps so that point 0 and point n+1 are the same
    const k = sum / (2 * Math.PI);
    for (var i = 0; i < numVerts; i++) {
        angleSteps[i] = angleSteps[i] / k;
    }

    const points = [];

    let angle = getRandomInt(0, 2 * Math.PI);

    for (var i = 0; i < numVerts; i++) {
        const r_i = clip(randomGauss(aveRadius, spikeyness), 0, 2 * aveRadius);
        const x = ctrX + r_i * Math.cos(angle);
        const y = ctrY + r_i * Math.sin(angle);

        points.push(new Point(x, y));

        angle = angle + angleSteps[i];
    }

    return points;
}

const DPR = window.devicePixelRatio || 1;

const center = new Point(
    window.innerWidth / 2 * DPR,
    window.innerHeight / 2 * DPR
);

const createPolys = amount =>
    Array(amount)
        .fill(null)
        .map((_, i) => {
            const size = 40 * (amount - i) * DPR;
            const points = 6 + (amount - i);
            const verts = generatePolygon(center.x, center.y, size, points);
            const cdx = cycle(i, colors.length);
            return new PolyWave({
                verts: [...verts, verts[0]],
                elasticity: getRandomFloat(0.01, 0.03),
                damping: getRandomFloat(0.4, 0.7),
                color: colors[cdx],
            });
        });

// Kick off
const canvas = new Canvas({
    canvas: document.getElementById('canvas'),
    pointer: new Pointer(),
    entities: [new Background(), ...createPolys(10), new Cursor(10)],
});
