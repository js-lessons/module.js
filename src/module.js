var ModuleStore = require('./ModuleStore')();

function Module(name, deps, moduleFunction) {

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
            if (elem in that._cache){
                depenObject[elem] = that._cache[elem];
            }else{
                depenObject[elem] = ModuleStore.getModule(elem).init();
                that._cache[elem] = depenObject[elem];
            }
        });
    }

    if(this.moduleFunction){
        return this.moduleFunction.call(depenObject, depenObject);
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
