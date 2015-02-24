// use ModuleStore if you want
// var ModuleStore = require('./ModuleStore')();

function Module(name, deps, moduleFunction) { }

Module.prototype.init = function() { };


function m(name, deps, moduleFunction) {
}

m.__reset__ = function() {
  // _modules = {}                   // resets module state
  //  or                             // only for testing purposes
  // ModuleStore.reset();            // depends on your implementation
}


module.exports = m;
