import { getFunctionBody } from "./getFunctionBody";

export default class TPromise {
  onFullfilledCallback = () => {};
  onRejectedCallback = () => {};

  constructor(executor, ...parameters) {
    this.executor = executor;
    this.parameters = parameters;

    if (window.Worker) {
      setTimeout(() => {
        this.createWorker();
        this.startWorker();
      });
    } else {
      return new Promise(executor);
    }
  }

  onWorkerMessage(e) {
    console.log(e);
  }

  createWorker() {
    var blob = new Blob([this.createWorkerFunction()]);
    const U = window.URL || window.webkitURL;
    var blobURL = window.URL.createObjectURL(blob);
    this.worker = new Worker(blobURL);
    this.worker.onmessage = this.handleMessage.bind(this);
  }

  handleMessage(e) {
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
  }

  startWorker() {
    this.worker.postMessage({
      parameters: this.parameters,
    });
  }

  createWorkerFunction() {
    const executor = this.executor.toString();
    return getFunctionBody(executor);
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
