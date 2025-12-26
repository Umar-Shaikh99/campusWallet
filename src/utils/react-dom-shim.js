// react-dom shim for React Native
// Required for @react-aria/utils compatibility

export const flushSync = (fn) => fn();
export const createPortal = (children) => children;
export const render = () => {};
export const hydrate = () => {};
export const unmountComponentAtNode = () => {};
export const findDOMNode = () => null;

export default {
  flushSync,
  createPortal,
  render,
  hydrate,
  unmountComponentAtNode,
  findDOMNode,
};
