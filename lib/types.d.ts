type TExecutorFunction<
  TParameters extends Array<unknown>,
  TReturnType,
  TRejectType
> = (
  resolve: (value: TReturnType) => void,
  reject: (reason: TRejectType) => void,
  ...parameters: TParameters
) => void;
type TOnFullfilledCallback<TReturnType> = (data: TReturnType) => void;
type TOnRejectedCallback<TRejectType> = (data: TRejectType) => void;
declare class TPromise<
  TParameters extends Array<unknown>,
  TReturnType,
  TRejectType
> {
  constructor(
    executor: TExecutorFunction<TParameters, TReturnType, TRejectType>,
    ...parameters: TParameters
  );
  then(callback: TOnFullfilledCallback<TReturnType>): this;
  catch(callback: TOnRejectedCallback<TRejectType>): this;
}
export default TPromise;

//# sourceMappingURL=types.d.ts.map
