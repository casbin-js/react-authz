import { Enforcer, newEnforcer } from './enforcer/Enforcer';
import React, { useEffect, useState } from 'react';
import { Provider } from './injectEnforcer';

interface ProviderProps {
  model: string;
  policy: string;
  sub: string;
}

const CasbinProvider: React.FC<ProviderProps> = (props) => {
  const [enforcer] = useState<Enforcer>(newEnforcer(props.model, props.policy, props.sub));

  const [render, setRender] = useState(false);
  useEffect(() => {
    setRender(!!enforcer.origin);
  }, [enforcer.origin]);

  return <>{render && <Provider value={enforcer}>{props.children}</Provider>}</>;
};
export default CasbinProvider;
