function ModuleStore() {
    // если вызвали без new
    if (!(this instanceof ModuleStore)) {
        return new ModuleStore();
    }
    // must be a singleton
    if (arguments.callee._singletonInstance)
        return arguments.callee._singletonInstance;

    arguments.callee._singletonInstance = this;
    this.store = {};
//format - nameModule:instance;
}

ModuleStore.prototype.addModule = function(name, moduleFunction) {
    this.store[name] = moduleFunction;
}

ModuleStore.prototype.getModule = function(name) {
    return this.store[name];
}

ModuleStore.prototype.reset = function() {
    this.store = {};
}

module.exports = ModuleStore;
