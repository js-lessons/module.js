var ModuleStore = require('./ModuleStore')();

function Module(name, deps, moduleFunction) {
    this.isLoaded = false;
    this.name = name;
    if(typeof(deps) === 'object'){
        if(deps.length !== 0){
            this.deps = deps;
        }
    }else{
        this.moduleFunction = deps;
    }

    if(typeof(moduleFunction) === 'function'){
        this.moduleFunction = moduleFunction;
    }
}

Module.prototype.init = function() {

    var that = this;
    var depenObject = {};
    var depends = this.deps;
    if(depends){
        depends.forEach(function(elem){
            var inst = ModuleStore.getModule(elem);
            inst.init();
            depenObject[elem] = that._cache[elem];
        });
    }
    if(this.isLoaded){
        return;
    }
    if(this.moduleFunction){
        this._cache[this.name] = this.moduleFunction.call(depenObject,depenObject);
        this.isLoaded = true;
    }
};

Module.prototype._cache = {};

function m(name, deps, moduleFunction) {
    if(deps || moduleFunction){
        var instance = new Module(name, deps, moduleFunction);
        ModuleStore.addModule(name, instance);
        return instance;
    }else{
        return ModuleStore.getModule(name);
    }

}


m.__reset__ = function() {
  // _modules = {}                   // resets module state
  //  or                             // only for testing purposes
  ModuleStore.reset();              // depends on your implementation
  Module.prototype._cache = {};
}

module.exports = m;
