# Module.js #

Simple JavaScript module system.

### How to use? ###

Define a module

```js
module('square', function() {
  return function(n) {
    return n * n;
  }
});
```

Use it inside another module

```js
module('app', ['square'], function(d) {
  console.log(d.square(4));

  // or you can use [this]
  console.log(this.square(5));
}).init();                                // initialization is explicit
```

Or you can initialize it like this

```js
module('app', ['square'], function() {
  console.log(this.square(4));
});

module('app').init();                     // initialization is explicit
```

If your modules exist only for side effects (for example to initialize jQuery plugins) you can skip module function in your module.

```js
module('carousel', function() {
  $('.carousel').carousel();
});

module('datepicker', function() {
  $('.datepicker').datepicker();
});
```

```js
module('app', ['carousel', 'datepicker']).init();
```

Module invocations are cached

```js
module('theAnswer', function() {
  function AnswerToTheUltimateQuestionOfLife() {
    return 42;
  }

  return AnswerToTheUltimateQuestionOfLife();
});
```

```js
module('wantTheAnswer', ['theAnswer'], function(d) {
  var answer = d['theAnswer'];
  console.log(answer);
});
```

```js
module('wantTheAnswerToo', ['theAnswer'], function(d) {
  // AnswerToTheUltimateQuestionOfLife is not called second time
  // using cached value

  var answer = d['theAnswer'];
  console.log(answer);
});
```
