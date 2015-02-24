var m = require('../src/module');
var chai = require('chai')
var sinon = require('sinon');
var sinonChai = require("sinon-chai");
var expect = chai.expect;

chai.use(sinonChai);

describe('module', function() {
  var test = {};

  beforeEach(function() {
    test.moduleFunction = function() {
      return function(x) { return x*x }
    }

    sinon.spy(test, 'moduleFunction');
  });


  afterEach(function() {
    m.__reset__();
  });


  it('is a function', function() {
    expect(m).to.be.a('function');
  });


  it('doesnt evaluate module function immediately', function() {
    m('square', test.moduleFunction);
    expect(test.moduleFunction).to.not.have.been.called
  });


  describe('#init', function() {

    it('evaluates module body', function() {
      m('square', [], test.moduleFunction);
      m('square').init();

      expect(test.moduleFunction).to.have.been.called
    });


    it('can be called without deps array', function() {
      m('square', test.moduleFunction);
      m('square').init();

      expect(test.moduleFunction).to.have.been.called
    });


    it('evaluates module function after all dependencies was resolved', function() {
      var appModuleFunction = sinon.spy();

      m('square', test.moduleFunction);
      m('app', ['square'], function() {
        appModuleFunction();
      });
      m('app').init();

      expect(test.moduleFunction.calledBefore(appModuleFunction)).to.be.true;
    });


    it('evaluates module function with deps results', function() {
      var appModuleFunction = sinon.spy();

      m('square', test.moduleFunction);
      m('app', ['square'], function(d) {
        appModuleFunction(d.square(3));
      });
      m('app').init();

      expect(appModuleFunction).to.have.been.calledWith(9);
    });


    it('evaluates module function inside deps results context', function() {
      var appModuleFunction = sinon.spy();

      m('square', test.moduleFunction);
      m('app', ['square'], function() {
        appModuleFunction(this.square(3));
      });
      m('app').init();

      expect(appModuleFunction).to.have.been.calledWith(9);
    });


    it('caches module function invocations', function() {
      m('square', test.moduleFunction);

      m('module1', ['square']).init();
      m('module2', ['square']).init();

      expect(test.moduleFunction).to.have.been.calledOnce;
    });


    describe('[without module function]', function () {
      it('dependencies are still evaluated', function() {
        m('square', test.moduleFunction);
        m('app', ['square']).init();
        expect(test.moduleFunction).to.have.been.called;
      });
    });
  });

});
