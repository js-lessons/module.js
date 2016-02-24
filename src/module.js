var ModuleStore = require('./ModuleStore')();

function Module(name, deps, moduleFunction) {
    this.isLoad = false;
    this.name = name;
	
    if(typeof(deps) === 'object'){
        this.deps = deps;
    }else{
        this.moduleFunction = deps;
    }

    if(typeof(moduleFunction) === 'function'){
        this.moduleFunction = moduleFunction;
    }
}

Module.prototype.init = function() {

    var _this = this;
    var depObj = {};
	var deps = ModuleStore.getModule(this.name)['deps'];
	
    if(deps){
        deps.forEach(function(elem){
            depObj = ModuleStore.getModule(elem);
			depObj.init();
            depObj[elem] = _this.cache[elem];
        });
    }
	
    if(this.isLoad) return true;
	this.isLoad = true;
	
    if(this.moduleFunction){
        this.cache[this.name] = this.moduleFunction.call(depObj,depObj);
    }
};

function m(name, deps, moduleFunction) {
    if (!ModuleStore.contains(name)) {
        var instance = new Module(name, deps, moduleFunction);
        ModuleStore.addModule(name, instance);
        return instance;
    }else{
        return ModuleStore.getModule(name);
    }

}

Module.prototype.cache = {};

m.__reset__ = function() {
  // _modules = {}                   // resets module state
  //  or                             // only for testing purposes
  ModuleStore.reset();              // depends on your implementation
}

module.exports = m;
