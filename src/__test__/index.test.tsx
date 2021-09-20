import { newEnforcer, MemoryAdapter } from 'casbin.js';
import React from 'react';
import ReactDOM from 'react-dom';
import useEnforcer from '../useEnforcer'
import CasbinProvider from "../EnforcerProvider";
import { ProviderProps } from "../EnforcerProvider"

const App =  (
  <div id='root'></div>
)


//ReactDOM.render(App, document.getElementById('root'))
import { basicModelStr } from './util';

describe('',()=> {

  beforeEach(async () => {

  })
  it('Throw Error when authorizer is not provided.', () => {
    let providerProps:ProviderProps = {
      model: "p, alice, data1, read\n" +
        "p, alice, data2, read\n" +
        "p, alice, data2, write\n" +
        "p, bob, data2, write",
      policy:"[request_definition]\n" +
        "r = sub, obj, act\n" +
        "\n" +
        "[policy_definition]\n" +
        "p = sub, obj, act\n" +
        "\n" +
        "[policy_effect]\n" +
        "e = some(where (p.eft == allow))\n" +
        "\n" +
        "[matchers]\n" +
        "m = r.sub == p.sub && r.obj == p.obj && r.act == p.act",
      sub: 'alice'
    }
    expect(()=>CasbinProvider(providerProps,App))
  });
})


