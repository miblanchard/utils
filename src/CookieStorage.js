/* @flow */

import ExecutionEnvironment from "exenv";
import Cookies from "cookies-js";
import base64 from "utils/base64.js";
import EventEmitter from "events";

// if cookie isn't updated in 2 years.
// also.. if this app is alive in 2 years...
const COOKIE_EXP_SEC = 157788000 * 2;

class CookieStorage extends EventEmitter {
    /**
     * Retrieves stored data for the key provided.
     *
     * @method get
     * @param {String} key
     * @returns {*}
     */
    get(key: string, isBase64?: boolean = false): ?Object {
        try {
            if (!ExecutionEnvironment.canUseDOM) {
                return null;
            }

            if (!key) {
                return undefined;
            }

            const item: ?string = Cookies.get(key);

            if (item) {
                this.emit("get", key);
                this.emit(`get:${key}`, key);

                if (isBase64) {
                    return JSON.parse(base64.decode(item));
                }

                try {
                    return JSON.parse(decodeURIComponent(item));
                } catch (e) {
                    return JSON.parse(item);
                }
            }

            return undefined;
        } catch (err) {
            console.error(err.message);

            return {
                error: true,
                message: err.message,
                status: "failure"
            };
        }
    }

    /**
     * Store data for the provided key.
     *
     * @method set
     * @param {String} key
     * @param {*} data
     * @param {Number} expires
     * @returns {Object} an response object
     */
    set(
        key: string,
        data?: Object = {},
        cookieOptions?: Object = {},
        isBase64?: boolean = false
    ) {
        if (!ExecutionEnvironment.canUseDOM) {
            return null;
        }

        try {
            const storeData = isBase64
                ? base64.encode(JSON.stringify(data))
                : JSON.stringify(data);

            Cookies.set(key, storeData, {
                expires: COOKIE_EXP_SEC,
                ...cookieOptions
            });

            this.emit("set", key, {...data});
            this.emit(`set:${key}`, key, {...data});
        } catch (err) {
            console.error(err.message);

            return {
                error: true,
                message: err.message,
                status: "failure"
            };
        }

        return {
            status: "success"
        };
    }

    /**
     * Removes stored data for the provided key.
     *
     * @method remove
     * @param {String} key
     * @returns {Object} an response object
     */
    remove(key: string, cookieOptions?: Object = {}) {
        if (!ExecutionEnvironment.canUseDOM) {
            return null;
        }

        try {
            Cookies.expire(key, cookieOptions);

            this.emit("remove", key);
            this.emit(`remove:${key}`, key);
        } catch (err) {
            console.error(err.message);

            return {
                error: true,
                message: err.message,
                status: "failure"
            };
        }

        return {
            status: "success"
        };
    }
}

export default new CookieStorage();
