class Cache {
    static #instance;
    #cache;

    constructor() {
        // In order to see if a Cache is already instantiated
        if (Cache.#instance) return Cache.#instance;

        // If the instance wasn't present, then we create a new instance
        this.#cache = new Map();
        Cache.#instance = this;
    }

    static getOrCreateInstance() {
        if (Cache.#instance) return Cache.#instance;

        Cache.#instance = new Cache();
        return Cache.#instance;
    }

    get(key) {
        return this.#cache.get(key);
    }

    set(key, value) {
        this.#cache.set(key, value)
    }

    has(key) {
        return this.#cache.has(key);
    }

    delete(key) {
        this.#cache.delete(key);
    }

    getKeys() {
        return Array.from(this.#cache.keys());
    }
}

export function cacheConfig() {
    new Cache();
}

export default Cache;