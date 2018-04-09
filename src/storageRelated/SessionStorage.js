/* @flow */
import {canUseDOM} from "exenv";

class SessionStorage {
    /**
     * Retrieves stored data for the key provided.
     *
     * @method get
     * @param {String} key
     * @returns {*}
     */
    get(key: string): ?Object | ?Array<*> {
        if (!canUseDOM) {
            return null;
        }

        let data;
        try {
            if (key) {
                const item = sessionStorage.getItem(key);

                if (item) {
                    data = JSON.parse(decodeURIComponent(item));
                }
            }
        } catch (err) {
            console.error(err.message);

            return {
                error: true,
                message: err.message,
                status: "failure"
            };
        }

        return data;
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
    set(key: string, data: Object | Array<*> = {}) {
        if (!canUseDOM) {
            return null;
        }

        try {
            const storeData = JSON.stringify(data);

            sessionStorage.setItem(key, storeData);
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
    remove(key: string) {
        if (!canUseDOM) {
            return null;
        }

        try {
            sessionStorage.removeItem(key);
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

export default new SessionStorage();
