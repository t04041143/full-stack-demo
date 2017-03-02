import assert from "assert";
import {put, call} from "redux-saga/effects";
import authModel from "../../lib/models/auth";

describe('用户认证模型测试', () => {
  it('注册失败，验证码失效', ()=> {
    const mockAction = {};
    const generator = authModel.effects.signin(mockAction, {put, call});
    // expect( generator.next().value ).to.deep.equal( call(delay, 2000) );
    assert(false, 'we expected this package author to add actual unit tests.');
  });
});
