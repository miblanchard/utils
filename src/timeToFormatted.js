/* @flow */
// converts from seconds to player formatted 00:00:00
export const timeToFormatted = (secs: number) => {
    const hours = Math.floor(secs / 3600);
    let minutes = Math.floor((secs % 3600) / 60);
    let seconds = Math.round((secs % 3600) % 60);

    if (minutes < 10) {
        minutes = `0${minutes}`;
    }
    if (seconds < 10) {
        seconds = `0${seconds}`;
    }

    return `${hours ? `${hours}:` : ""}${minutes}:${seconds}`;
};
