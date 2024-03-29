import React from 'react';
import Resources from '../Game/Resources';

test('get round', () => {
    Resources.setCulture('zh-CN');

    expect(Resources.getInstance().getRound(1)).toEqual('第 1 回合');

    Resources.setCulture('en-US');
    expect(Resources.getInstance().getRound(1)).toEqual('1st Round');
    expect(Resources.getInstance().getRound(2)).toEqual('2nd Round');
    expect(Resources.getInstance().getRound(3)).toEqual('3rd Round');
    expect(Resources.getInstance().getRound(4)).toEqual('4th Round');
})
