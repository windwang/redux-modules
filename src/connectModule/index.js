import { curry } from 'ramda';
import _connectModule from './connectModule';
import _connectModules from './connectModules';

export const connectModule = (selector, modules, Component) => {
  let ConnectedComponent;

  if (!Array.isArray(modules)) {
    const { actions, name: namespace } = modules;

    ConnectedComponent = _connectModule(
      {
        selector,
        actions,
        namespace,
      },
      Component
    );
  } else {
    ConnectedComponent = _connectModules({selector, modules}, Component);
  }

  return ConnectedComponent;
}

export default curry(connectModule);
