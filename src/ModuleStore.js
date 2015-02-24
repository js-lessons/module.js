function ModuleStore() {
  if (!(this instanceof ModuleStore)) {
    return new ModuleStore();
  }

  // must be a singleton
  if (arguments.callee._singletonInstance)
    return arguments.callee._singletonInstance;

  arguments.callee._singletonInstance = this;
}

ModuleStore.prototype.addModule = function(name, moduleFunction) {
}

ModuleStore.prototype.getModule = function(name) {
}

ModuleStore.prototype.reset = function(name, moduleStore) {
}

ModuleStore.prototype.contains = function(name) {
}

module.exports = ModuleStore;
