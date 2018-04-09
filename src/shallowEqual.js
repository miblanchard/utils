/* @flow */

// inspired by preact-compat
// https://github.com/developit/preact-compat/blob/7c5de00e7c85e2ffd011bf3af02899b63f699d3a/src/index.js#L349
export const shallowEquals = (currentPropsOrState: *, nextPropsOrState: *) =>
    Object.keys(currentPropsOrState).every(
        (key: string) => key in nextPropsOrState
    ) &&
    Object.keys(currentPropsOrState).every(
        (key: string) => currentPropsOrState[key] === nextPropsOrState[key]
    );
