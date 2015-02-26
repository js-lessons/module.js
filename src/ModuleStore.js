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
//format - nameModule:{func:, depend:[]}

}
ModuleStore.prototype.addModule = function(name){
    if(this.store[name] === undefined){
        this.store[name] = {func: '', depends: ''};
    }
}

ModuleStore.prototype.addFunc = function(name, moduleFunction) {
    this.store[name]['func'] = moduleFunction;
}

ModuleStore.prototype.getModule = function(name) {
    return this.store[name];
}

ModuleStore.prototype.reset = function(name, moduleStore) {
    this.store = {};
}

ModuleStore.prototype.addDepends = function(name, depends) {
    this.store[name]['depends'] = depends;
}
//var ModuleStore = ModuleStore();

module.exports = ModuleStore;
