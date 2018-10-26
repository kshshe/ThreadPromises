export default class TPromise {
  constructor(executor, ...parameters) {
    this.executor = null;
    this.onFullfilledCallback = null;
    this.onRejectedCallback = null;

    this.executor = executor;
    this.parameters = parameters;

    setTimeout(() => {
      this.makeWorker();
    });
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

  makeWorkerFunction() {
    const executor = this.executor.toString();
    let parameters = [];
    if (this.onFullfilledCallback) {
      parameters.push("onFullfilledCallback");
    }
    if (this.onRejectedCallback) {
      parameters.push("onRejectedCallback");
    }
    if (this.parameters.length > 0) {
      parameters.push(this.parameters);
    }
    parameters = parameters.join(", ");
    const workerFunction = `
      function getExecutor() {
        return (${executor})
      }
      function onFullfilledCallback(data) {
        self.postMessage({
          type: "onFullfilledCallback",
          data
        })
      }
      function onRejectedCallback(data) {
        self.postMessage({
          type: "onRejectedCallback",
          data
        })
      }
      const executor = getExecutor();
      executor(${parameters})
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
