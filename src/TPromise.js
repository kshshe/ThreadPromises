export default class TPromise {
  constructor(executor, ...parameters) {
    this.executor = null;
    this.onFullfilledCallback = null;
    this.onRejectedCallback = null;

    this.executor = executor;
    this.parameters = parameters;

    if (window.Worker) {
      setTimeout(() => {
        this.makeWorker();
        this.startWorker();
      });
    } else {
      return new Promise(executor);
    }
  }

  onWorkerMessage(e) {
    console.log(e);
  }

  makeWorker() {
    var blob = new Blob([this.makeWorkerFunction()]);
    const U = window.URL || window.webkitURL;
    var blobURL = window.URL.createObjectURL(blob);
    this.worker = new Worker(blobURL);
    this.worker.onmessage = e => {
      const { data, type } = e.data;
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
    };
  }

  startWorker() {
    this.worker.postMessage({
      haveOnFullfilledCallback: !!this.onFullfilledCallback,
      haveOnRejectedCallback: !!this.onRejectedCallback,
      parameters: this.parameters,
    });
  }

  makeWorkerFunction() {
    const executor = this.executor.toString();
    const workerFunction = `
      function getExecutor() {
        return (${executor})
      }
      function onFullfilledCallback(data) {
        self.postMessage({
          type: "onFullfilledCallback",
          data
        })
        self.close();
      }
      function onRejectedCallback(data) {
        self.postMessage({
          type: "onRejectedCallback",
          data
        })
        self.close();
      }
      const executor = getExecutor();
      self.onmessage = function ({
        data: {
          haveOnFullfilledCallback,
          haveOnRejectedCallback,
          parameters,
        }
      }) {
        let executorArguments = [];
        if (haveOnFullfilledCallback) {
          executorArguments.push(onFullfilledCallback);
        }
        if (haveOnRejectedCallback) {
          executorArguments.push(onRejectedCallback);
        }
        executorArguments = [...executorArguments, ...(parameters || [])]
        executor(...executorArguments);
      }
    `;
    return workerFunction;
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
