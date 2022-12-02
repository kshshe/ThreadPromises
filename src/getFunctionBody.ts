export default function getFunctionBody(executor: string): string {
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
