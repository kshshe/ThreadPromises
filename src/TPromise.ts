import getFunctionBody from "./getFunctionBody";

type TExecutorFunction<
  TParameters extends Array<unknown>,
  TReturnType,
  TRejectType
> = (
  resolve: (value: TReturnType) => void,
  reject: (reason: TRejectType) => void,
  ...parameters: TParameters
) => void;

type TStartMessage<TParameters extends Array<unknown>> = {
  parameters: TParameters;
};

type TResultMessage<TReturnType, TRejectType> =
  | {
      type: "onFullfilledCallback";
      data: TReturnType;
    }
  | {
      type: "onRejectedCallback";
      data: TRejectType;
    };

type TOnFullfilledCallback<TReturnType> = (data: TReturnType) => void;
type TOnRejectedCallback<TRejectType> = (data: TRejectType) => void;

export default class TPromise<
  TParameters extends Array<unknown>,
  TReturnType,
  TRejectType
> {
  private onFullfilledCallback: TOnFullfilledCallback<TReturnType> = () => {};
  private onRejectedCallback: TOnRejectedCallback<TRejectType> = () => {};

  private executor: TExecutorFunction<TParameters, TReturnType, TRejectType>;
  private parameters: TParameters;
  private worker: Worker;

  constructor(
    executor: TExecutorFunction<TParameters, TReturnType, TRejectType>,
    ...parameters: TParameters
  ) {
    this.executor = executor;
    this.parameters = parameters;

    if (typeof window !== "undefined" && window.Worker) {
      setTimeout(() => {
        this.createWorker();
        this.startWorker();
      });
    } else {
      function fallbackExecutor(resolve, reject) {
        executor(resolve, reject, ...parameters);
      }
      return new Promise<TReturnType>(fallbackExecutor) as unknown as TPromise<
        TParameters,
        TReturnType,
        TRejectType
      >;
    }
  }

  private createWorker() {
    var blob = new Blob([this.createWorkerFunction()]);
    const U = window.URL || window.webkitURL;
    var blobURL = window.URL.createObjectURL(blob);
    this.worker = new Worker(blobURL);
    this.worker.onmessage = this.handleMessage.bind(this);
  }

  private handleMessage(
    e: MessageEvent<TResultMessage<TReturnType, TRejectType>>
  ) {
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

  private startWorker() {
    const message: TStartMessage<TParameters> = {
      parameters: this.parameters,
    };
    this.worker.postMessage(message);
  }

  private createWorkerFunction() {
    const executor = this.executor.toString();
    return getFunctionBody(executor);
  }

  then(callback: TOnFullfilledCallback<TReturnType>) {
    this.onFullfilledCallback = callback;
    return this;
  }

  catch(callback: TOnRejectedCallback<TRejectType>) {
    this.onRejectedCallback = callback;
    return this;
  }
}
