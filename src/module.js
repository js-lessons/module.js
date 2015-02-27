//use ModuleStore if you want
var ModuleStore = require('./ModuleStore')();

function Module(name, deps, moduleFunction) {
    this.name = name;
    if(typeof(deps) === 'object'){
        this.deps = deps;
        if(this.deps.length !== 0){
            this._depend[this.name] = this.deps;
        }
    }else{
        this.moduleFunction = deps;
    }

    if(typeof(moduleFunction) === 'function'){
        this.moduleFunction = moduleFunction;
    }
    if(this.moduleFunction !== undefined){
        ModuleStore.addModule(this.name, this.moduleFunction);
    }
}

Module.prototype.init = function() {
    var that = this;
    var depenObject = {};
    var depends = this._depend[this.name];
    if(depends){
        depends.forEach(function(elem){
            if (elem in that._cache){
                depenObject[elem] = that._cache[elem];
            }else{
                depenObject[elem] = ModuleStore.getModule(elem)();
                that._cache[elem] = depenObject[elem];
            }
        });
    }
    var moduleFunction = ModuleStore.getModule(this.name);
    if(moduleFunction){
        moduleFunction.call(depenObject, depenObject);
    }
};

Module.prototype._cache = {};
Module.prototype._depend = {};

function m(name, deps, moduleFunction) {
    return new Module(name, deps, moduleFunction);
}


m.__reset__ = function() {
  // _modules = {}                   // resets module state
  //  or                             // only for testing purposes
  ModuleStore.reset();              // depends on your implementation
  Module.prototype._cache = {};
  Module.prototype._depend = {};
}

module.exports = m;
