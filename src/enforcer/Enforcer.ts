import { newEnforcer as originalNewEnforcer, Enforcer as originalEnforcer, newModel, StringAdapter } from 'casbin';

export class Enforcer {
  origin?: originalEnforcer;

  sub?: string;

  /**
   *
   * @param rvals
   * input parameters are usually: (sub, obj, act).
   * or (obj, act).
   */
  enforce(...rvals: any[]): boolean {
    if (rvals.length === 2) {
      rvals.unshift(this.sub!);
    }
    return this.origin!.enforceSync(...rvals);
  }
}

export const newEnforcer = (model: string, policy: string, sub: string): Enforcer => {
  const enforcer = new Enforcer();
  originalNewEnforcer(newModel(model), new StringAdapter(policy)).then((e) => {
    enforcer.origin = e;
    enforcer.sub = sub;
  });
  return enforcer;
};
