/* @flow */
// group of utilities to check for the existence of particular feature flags in a query string
// then return the value if provided

import {canUseDOM} from "exenv";

export const queryString = (location): string => {
    const currentLocation =
        location ||
        (canUseDOM && typeof window !== "undefined" ? window.location : {});
    return currentLocation.search || "";
};

/**
 * hasFlag("debug")
 */
export const hasFlag = (flag, location): boolean => {
    if (location && location.query) {
        return Object.keys(location.query).includes(flag);
    }

    return queryString(location).includes(`${flag}`);
};

/**
 * get value of a flag
 */
export const getFlag = (flag, location): ?string => {
    if (location && location.query) {
        return location.query[flag];
    }

    const flagEq = `${flag}=`;
    if (queryString(location).includes(flagEq)) {
        return queryString(location)
            .split(flagEq)[1]
            .split("&")[0];
    }
    return "";
};
