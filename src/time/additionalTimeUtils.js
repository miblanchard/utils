/* @flow */

// Converts from milliseconds to MM:SS or 0:SS depending on time
export function timeToFormatted(milliseconds: number): string {
    const minutes = Math.floor(milliseconds / 60000);
    const seconds = ((milliseconds % 60000) / 1000).toFixed(0);

    return `${minutes}:${Number(seconds) < 10 ? `0` : ``}${seconds}`;
}

// takes the formatted time from above and converts back into milliseconds
export function formattedToTime(str: string): number {
    const parts = str.split(":");
    let totalSeconds = parseInt(parts.pop(), 10) / 100,
        modifier = 1;

    while (parts.length > 0) {
        totalSeconds += modifier * parseInt(parts.pop(), 10);
        modifier *= 60;
    }

    return totalSeconds * 1000;
}

// Converts from milliseconds to #h #m #s or #m #s depending on time
export function timeToHoursMinsSeconds(milliseconds: number): string {
    const regSec = milliseconds / 1000;
    const seconds = regSec % 60;
    let minutes = Math.floor(regSec / 60);
    const hours = Math.floor(minutes / 60);
    minutes = hours >= 1 ? minutes - hours * 60 : minutes;

    return hours < 1
        ? `${minutes}m ${seconds}s`
        : `${hours}h ${minutes}m ${seconds}s`;
}

/**
     * isDST() - checks if current time is Daylight Savings Time
     * @return {boolean}
     */
export function isDST(): boolean {
    const today = new Date();

    const stdTimezoneOffset = () => {
        const jan = new Date(today.getFullYear(), 0, 1);
        const jul = new Date(today.getFullYear(), 6, 1);

        return Math.max(jan.getTimezoneOffset(), jul.getTimezoneOffset());
    };

    return today.getTimezoneOffset() < stdTimezoneOffset();
}
