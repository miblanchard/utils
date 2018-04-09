/* @flow */
/* eslint no-bitwise: 0*/
// calculates whether 2 different hex value colors are too similar so you can use an alternative color for comparison

export default function similarColors(color0: string, color1: string) {
    const _color0 = parseInt(color0.replace("#", "0x"));
    const _color1 = parseInt(color1.replace("#", "0x"));

    let similar = false;
    const c0r = _color0 >> 16;
    const c0g = (_color0 >> 8) & 0xff;
    const c0b = _color0 & 0xff;

    const c1r = _color1 >> 16;
    const c1g = (_color1 >> 8) & 0xff;
    const c1b = _color1 & 0xff;

    const dr = Math.abs(c0r - c1r);
    const dg = Math.abs(c0g - c1g);
    const db = Math.abs(c0b - c1b);

    // find CMY levels
    const tol = 78;
    if (
        (dr + dg < tol && dr + db < tol) ||
        (dr + dg < tol && db + dg < tol) ||
        (dr + db < tol && db + dg < tol)
    ) {
        similar = true;
    } else {
        similar = false;
    }

    return similar;
}
