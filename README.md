# ThreadPromises

Promises running in separated threads

# It is an early version.

Now it support only then and catch methods. But it works.

# Installing

```
<script src="/lib/thread-promises.min.js"></script>
```

### Or

```
npm i --save thread-promises
```

```
import TPromise from "thread-promises"
```

# Examples

[Expample of making blocking job on main thread and on TPromise's thread](https://github.com/kshshe/ThreadPromises/tree/master/examples/BlockingTask)

[Simple resolve on timeout](https://github.com/kshshe/ThreadPromises/tree/master/examples/simpleTimeout)

[Simple reject on timeout](https://github.com/kshshe/ThreadPromises/tree/master/examples/simpleReject)

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
