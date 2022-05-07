export class Store {
    constructor() {
        this._handlers = [];
    }

    subscribe(fn) {
        this._handlers.push(fn);
    }

    unsubscribe(fn) {
        this._handlers = this._handlers.filter((itm) => itm !== fn);
    }

    fire(o, thisObj) {
        const scope = thisObj || window;

        this._handlers.forEach((itm) => itm.call(scope, o));
    }
}