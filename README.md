# ThreadPromises

Promises running in separated threads

[![NPM](https://nodei.co/npm/thread-promises.png?downloads=true&downloadRank=true&stars=true)](https://nodei.co/npm/thread-promises/)

# It is an early version.

Now it support only then and catch methods. But it works.

## It creates a thread for every task so it not blocking main thread and it could run in parallel

![screenshot](./Threads.png)

# Installing

```
<script src="/lib/thread-promises.min.js"></script>
```

### Or

```
<script src="https://cdn.jsdelivr.net/npm/thread-promises/lib/thread-promises.min.js"></script>
```

### Or

```
npm i --save thread-promises
```

```
import TPromise from "thread-promises"
```

# Examples

[All examples](https://github.com/kshshe/ThreadPromises/tree/master/examples)

Expample of making blocking job on main thread and on TPromise's thread

[demo](http://htmlpreview.github.io/?https://github.com/kshshe/ThreadPromises/blob/master/examples/BlockingTask/index.html)
and [code](https://github.com/kshshe/ThreadPromises/tree/master/examples/BlockingTask)


Simple resolve on timeout

[demo](http://htmlpreview.github.io/?https://github.com/kshshe/ThreadPromises/blob/master/examples/simpleTimeout/index.html)
and [code](https://github.com/kshshe/ThreadPromises/tree/master/examples/simpleTimeout)


Simple reject on timeout

[demo](http://htmlpreview.github.io/?https://github.com/kshshe/ThreadPromises/blob/master/examples/simpleReject/index.html)
and [code](https://github.com/kshshe/ThreadPromises/tree/master/examples/simpleReject)

# Usage

```
new TPromise((resolve, reject) => {
    console.log("Look ma, I am multithread JavaScript!")
})
```

For additional properties put them after executor function (like in setTimeout):

```
new TPromise((resolve, reject, some, additional, properties) => {
    console.log("I have no access to my old lexical environment, but I can use props")
    console.log(some, additional, properties)
}, some, additional, properties)
```
