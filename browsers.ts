import TPromise from "./src/TPromise";

declare global {
  interface Window {
    TPromise: typeof TPromise;
  }
}

window.TPromise = TPromise;
