 class _EventBus {
    constructor() {
        this.eventBus = {}
    }
    $off(id) {
        delete this.eventBus[id];
    }

    $on(id, callback) {
        this.eventBus[id] = callback;
    }

    $emit(id, ...params) {
        if (this.eventBus[id])
            this.eventBus[id](...params);
    }
}

export const EventBus = new _EventBus()