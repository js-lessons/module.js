//use ModuleStore if you want
var ModuleStore = require('./ModuleStore')();

function Module(name, deps, moduleFunction) {
    this.name = name;
    this.deps = deps; // add
    this.moduleFunction = moduleFunction;
    ModuleStore.addModule(this.name);
    if(this.moduleFunction || typeof(this.deps) === 'function') {
        ModuleStore.addFunc(this.name, this.moduleFunction || this.deps);
    }
    if(typeof(this.deps) === 'object'){
        ModuleStore.addDepends(this.name, this.deps);
    }
}

Module.prototype.init = function() {
    var that = this;
    var depenObject = {};
    var depends = ModuleStore.getModule(this.name)['depends'];
    if(depends){
        depends.forEach(function(elem){
            if (elem in that._cache){
                depenObject[elem] = that._cache[elem];
            }else{
                depenObject[elem] = ModuleStore.getModule(elem)['func']();
                that._cache[elem] = depenObject[elem];
            }
        });
    }
    var moduleFunction = ModuleStore.getModule(this.name)['func'];
    if(moduleFunction){
        moduleFunction.call(depenObject, depenObject);
    }
};

Module.prototype._cache = {};

function m(name, deps, moduleFunction) {
    return new Module(name, deps, moduleFunction);
}


m.__reset__ = function() {
  // _modules = {}                   // resets module state
  //  or                             // only for testing purposes
  ModuleStore.reset();              // depends on your implementation
  Module.prototype._cache = {};
}

module.exports = m;
