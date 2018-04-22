export function getRandomFloat(min, max) {
    return Math.random() * (max - min) + min;
}

export function getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

export function lerp(start, end, amount) {
    return (1 - amount) * start + amount * end;
}

export function doBoxesIntersect(a, b) {
    // AABB axis-aligned bounding boxes
    return (
        Math.abs(a.x - b.x) * 2 < a.w + b.w &&
        Math.abs(a.y - b.y) * 2 < a.h + b.h
    );
}

export function scaleBetween(initialVal, minAllow, maxAllow, min, max) {
    // scaleBetween(250, -1, 1, 0, 500) => 0
    return (maxAllow - minAllow) * (initialVal - min) / (max - min) + minAllow;
}

export function cycle(value, total) {
    return (value % total + total) % total;
}
