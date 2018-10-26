# ThreadPromises

Promises running in separated threads

# It is an early version.

Now it support only then and catch methods.

#Installing

```
<script src="/lib/thread-promises.min.js"></script>
```

Or

```
npm i --save thread-promises
```

```
import TPromise from "thread-promises"
```

# Example

```
function delay(ms) {
  return new TPromise((resolve, reject, ms) => {
    setTimeout(() => {
      reject("error")
    }, ms)
  }, ms)
}

log("Starting 3 seconds reject delay")
delay(3000)
  .then(() => {
    log("Resolved")
  })
  .catch((data) => {
    log("Rejected with error: " + data)
  })
```
