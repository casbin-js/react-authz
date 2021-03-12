import { useContext } from 'react';
import { Enforcer } from './enforcer/Enforcer';
import { Context } from './injectEnforcer';

const useEnforcer = (): Enforcer => {
  return useContext(Context);
};

export default useEnforcer;
