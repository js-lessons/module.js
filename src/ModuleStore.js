function ModuleStore() {
  if (!(this instanceof ModuleStore)) {
    return new ModuleStore();
  }

  // must be a singleton
  if (arguments.callee._singletonInstance)
    return arguments.callee._singletonInstance;

  arguments.callee._singletonInstance = this;
}

ModuleStore.prototype.addModule = function(name, moduleInstance) {
	this.store[name] = moduleInstance;
}

ModuleStore.prototype.getModule = function(name) {
	return this.store[name];
}

ModuleStore.prototype.reset = function() {
	this.store = {};
}

ModuleStore.prototype.contains = function(name) {
	return name in this.store;
}

module.exports = ModuleStore;
