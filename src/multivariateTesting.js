/* @flow */

// can be configured for additional groups, this assumes 3
export const multivariateTesting = (probabilityA: number, probabilityB: number) => {
    const testCaseOption = Math.floor(Math.random() * 100);
    if (testCaseOption < probabilityA) {
        return "groupA";
    } else if (testCaseOption >= probabilityA && testCaseOption < probabilityB) {
        return "groupB";
    }

    return "control";
};
