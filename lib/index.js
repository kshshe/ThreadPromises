function $parcel$defineInteropFlag(a) {
  Object.defineProperty(a, "__esModule", { value: true, configurable: true });
}
function $parcel$export(e, n, v, s) {
  Object.defineProperty(e, n, {
    get: v,
    set: s,
    enumerable: true,
    configurable: true,
  });
}

$parcel$defineInteropFlag(module.exports);

$parcel$export(
  module.exports,
  "default",
  () => $80bd448eb6ea085b$export$2e2bcd8739ae039
);
function $cab4d9e0da53e036$export$2e2bcd8739ae039(executor) {
  return `
    function getExecutor() {
        return (${executor});
    }
    function onFullfilledCallback(data) {
      self.postMessage({
        type: "onFullfilledCallback",
        data,
      });
      self.close();
    }
    function onRejectedCallback(data) {
      self.postMessage({
        type: "onRejectedCallback",
        data,
      });
      self.close();
    }
    const executor = getExecutor();
    self.onmessage = function ({
      data: { parameters },
    }) {
      executor(onFullfilledCallback, onRejectedCallback, ...(parameters || []));
    };
  `;
}

class $270a50417f39206c$export$2e2bcd8739ae039 {
  onFullfilledCallback = () => {};
  onRejectedCallback = () => {};
  constructor(executor, ...parameters) {
    this.executor = executor;
    this.parameters = parameters;
    if (typeof window !== "undefined" && window.Worker)
      setTimeout(() => {
        this.createWorker();
        this.startWorker();
      });
    else {
      function fallbackExecutor(resolve, reject) {
        executor(resolve, reject, ...parameters);
      }
      return new Promise(fallbackExecutor);
    }
  }
  createWorker() {
    var blob = new Blob([this.createWorkerFunction()]);
    const U = window.URL || window.webkitURL;
    var blobURL = window.URL.createObjectURL(blob);
    this.worker = new Worker(blobURL);
    this.worker.onmessage = this.handleMessage.bind(this);
  }
  handleMessage(e) {
    const { data: data, type: type } = e.data;
    switch (type) {
      case "onFullfilledCallback":
        this.onFullfilledCallback(data);
        break;
      case "onRejectedCallback":
        this.onRejectedCallback(data);
        break;
      default:
        break;
    }
  }
  startWorker() {
    const message = {
      parameters: this.parameters,
    };
    this.worker.postMessage(message);
  }
  createWorkerFunction() {
    const executor = this.executor.toString();
    return (0, $cab4d9e0da53e036$export$2e2bcd8739ae039)(executor);
  }
  then(callback) {
    this.onFullfilledCallback = callback;
    return this;
  }
  catch(callback) {
    this.onRejectedCallback = callback;
    return this;
  }
}

var $80bd448eb6ea085b$export$2e2bcd8739ae039 =
  (0, $270a50417f39206c$export$2e2bcd8739ae039);

//# sourceMappingURL=index.js.map
