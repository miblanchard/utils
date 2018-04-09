/* @flow */

class MemoryStorage {
    _storedData: Map<string, ?*> = new Map();
    _pendingTimeouts: Map<string, TimeoutID> = new Map();

    /**
     * Retrieves stored data for the key provided.
     *
     * @method get
     * @param {String} key
     * @returns {*}
     */
    get(key: string): ?* {
        const storedData = this._storedData.get(key);

        if (!storedData) {
            return storedData;
        }

        return storedData.data;
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
        data: * = {},
        storageOptions: {
            expires?: number
        } = {}
    ) {
        const {expires} = storageOptions;

        this._storedData.set(key, {
            data,
            expires
        });

        if (expires && expires !== Infinity) {
            const _timeout = setTimeout(
                () => this.remove(key),
                expires - Date.now()
            );
            this._pendingTimeouts.set(key, _timeout);
        }
    }

    /**
     * Removes stored data for the provided key.
     *
     * @method remove
     * @param {String} key
     * @returns {Object} an response object
     */
    remove(key: string) {
        if (this._pendingTimeouts.has(key)) {
            clearTimeout(this._pendingTimeouts.get(key));
            this._pendingTimeouts.delete(key);
        }

        this._storedData.delete(key);
    }
}

export default new MemoryStorage();
