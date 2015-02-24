# Module.js #

Simple JavaScript module system.

### How to use? ###

Define a module

```
module('square', function() {
  return function(n) {
    return n * n;
  }
});
```

Use it inside another module

```
module('app', ['square'], function(d) {
  console.log(d.square(4));

  // or you can use [this]
  console.log(this.square(5));
}).init();                                // initialization is explicit
```

Or you can initialize it like this

```
module('app', ['square'], function() {
  console.log(this.square(4));
});

module('app').init();                     // initialization is explicit
```

If your modules exist only for side effects (for example to initialize jQuery plugins) you can skip module function in your module.

```
module('carousel', function() {
  $('.carousel').carousel();
});

module('datepicker', function() {
  $('.datepicker').datepicker();
});
```

```
module('app', ['carousel', 'datepicker']).init();
```

Module invocations are cached

```
module('theAnswer', function() {
  function AnswerToTheUltimateQuestionOfLife() {
    return 42;
  }

  return AnswerToTheUltimateQuestionOfLife();
});
```

```
module('wantTheAnswer', ['theAnswer'], function(d) {
  var answer = d['theAnswer'];
  console.log(answer);
});
```

```
module('wantTheAnswerToo', ['theAnswer'], function(d) {
  // AnswerToTheUltimateQuestionOfLife is not called second time
  // using cached value

  var answer = d['theAnswer'];
  console.log(answer);
});
```
