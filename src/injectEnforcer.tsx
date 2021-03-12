import hoistNonReactStatics from 'hoist-non-react-statics';
import React from 'react';
import { Enforcer } from './enforcer/Enforcer';

export const Context = React.createContext<Enforcer>(null as any);
export const { Consumer, Provider } = Context;
function getDisplayName(Component: React.ComponentType<any>): string {
  return Component.displayName || Component.name || 'Component';
}

export interface WithEnforcerProps {
  enforcer: Enforcer;
}
export function injectCasbin<T extends WithEnforcerProps = WithEnforcerProps>(
  WrappedComponent: React.ComponentType<T>
): React.ComponentType {
  const RenderComponents: React.FC<T> = (props) => (
    <Consumer>
      {(enforcer): React.ReactNode => {
        return <WrappedComponent {...props} enforcer={enforcer} />;
      }}
    </Consumer>
  );
  RenderComponents.displayName = `Casbin${getDisplayName(WrappedComponent)}`;

  return hoistNonReactStatics(RenderComponents, WrappedComponent) as any;
}
