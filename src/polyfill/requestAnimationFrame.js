/* @flow */
// request animation frame polyfill and safety

import {canUseDOM} from "exenv";

export const rafPolyfill = (() => {
    let clock = Date.now();

    return (callback: Function) => {
        const currentTime = Date.now();

        if (currentTime - clock > 16) {
            clock = currentTime;
            callback(currentTime);
        } else {
            setTimeout(() => {
                rafPolyfill(callback);
            }, 0);
        }
    };
})();

export const cafPolyfill = (id: TimeoutID) => clearTimeout(id);

export const requestAnimationFrame = canUseDOM
    ? window.requestAnimationFrame ||
      window.webkitRequestAnimationFrame ||
      window.mozRequestAnimationFrame ||
      rafPolyfill
    : global.requestAnimationFrame || rafPolyfill;

export const cancelAnimationFrame = canUseDOM
    ? window.cancelAnimationFrame ||
      window.webkitCancelAnimationFrame ||
      window.mozCancelAnimationFrame ||
      cafPolyfill
    : global.cancelAnimationFrame || cafPolyfill;
