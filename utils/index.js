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

export function clip(x, min, max) {
    if (min > max) {
        return x;
    } else if (x < min) {
        return min;
    } else if (x > max) {
        return max;
    } else {
        return x;
    }
}

export function randomGauss(mu = 0, sigma = 1, nsamples = 6) {
    // http://stackoverflow.com/a/33567961
    var run_total = 0;
    for (var i = 0; i < nsamples; i++) {
        run_total += Math.random();
    }

    return sigma * (run_total - nsamples / 2) / (nsamples / 2) + mu;
}
