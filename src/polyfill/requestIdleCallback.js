/* @flow */
// helper to provide requestIdleCallback safety and default to timeout if not available

export const requestIdleCallback = (() => {
    if (
        typeof window !== "undefined" &&
        typeof window.requestIdleCallback !== "undefined"
    ) {
        return window.requestIdleCallback;
    }

    return (cb: Function) => {
        const start = Date.now();
        return setTimeout(() => {
            cb({
                didTimeout: false,
                timeRemaining() {
                    return Math.max(0, 50 - (Date.now() - start));
                }
            });
        }, 1);
    };
})();

export const cancelIdleCallback = (() => {
    if (
        typeof window !== "undefined" &&
        typeof window.cancelIdleCallback !== "undefined"
    ) {
        return window.cancelIdleCallback;
    }

    return (id: TimeoutID) => clearTimeout(id);
})();
