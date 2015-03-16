var cacheModules = {}; //хранилище модулей

function ModuleStore() {
    if (!(this instanceof ModuleStore)) { // если создан модуль без new
        return  new ModuleStore();
    }

    // must be a singleton
    if (arguments.callee._singletonInstance)
        return arguments.callee._singletonInstance;

    arguments.callee._singletonInstance = this;
}

ModuleStore.prototype.addModule = function(name, moduleFunction) {
    cacheModules[name] = moduleFunction;
};

ModuleStore.prototype.getModule = function(name) {
    return cacheModules[name];
};

ModuleStore.prototype.reset = function() {
    cacheModules = {};
};

ModuleStore.prototype.contains = function(name) {
    return name in cacheModules;
};
module.exports = ModuleStore;
