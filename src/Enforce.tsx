import React from 'react';
import useEnforcer from './useEnforcer';

interface EnforceProps {
  deny?: boolean;
  sub?: string;
  obj: string;
  act: string;
}
const Enforce: React.FC<EnforceProps> = (props) => {
  const { deny = false, obj, act, children } = props;
  const enforcer = useEnforcer();

  const sub = props.sub || enforcer.sub!;
  const enforceRes = enforcer.enforce(sub, obj, act);
  const shouldRender = (enforceRes && !deny) || (!enforceRes && deny);

  return <>{shouldRender && children}</>;
};

export default Enforce;
