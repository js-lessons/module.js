var ModuleStore = require('./ModuleStore')();

function Module(name, deps, moduleFunction) {
    if (typeof (deps) === 'function') {
        moduleFunction = deps;
        deps = [];
    }

    this.deps = deps;
    this.name = name;
    this.moduleFunction = moduleFunction;

    this.isLoaded = false;
}

Module.prototype.cache = {};

Module.prototype.init = function() {
    var self = this;
    var getDeps = {};

    var depsModule = ModuleStore.getModule(this.name)['deps'];//получить массив зависимостей

    depsModule.forEach(function(elem) {
        getDeps = ModuleStore.getModule(elem);
        getDeps.init();
        getDeps[elem] = self.cache[elem];

    });

    if (this.isLoaded) {
        return;
    }

    this.isLoaded = true;

    if (this.moduleFunction) {
        this.cache[this.name] = this.moduleFunction.call(getDeps, getDeps);
    }

};

function m(name, deps, moduleFunction) {

    if (!ModuleStore.contains(name)) {
        ModuleStore.addModule(name, new Module(name, deps, moduleFunction));
    }

    return ModuleStore.getModule(name);
}

m.__reset__ = function() {       
    ModuleStore.reset();           
};


module.exports = m;
