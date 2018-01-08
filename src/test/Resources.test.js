import React from 'react';
import Resources from '../Game/Resources';
import GameModes from "../Game/Modes";

test('get round', () => {
    Resources.setCulture('zh-CN');

    expect(Resources.getInstance().getRound(1)).toEqual('第 1 回合');

    Resources.setCulture('en-US');
    expect(Resources.getInstance().getRound(1)).toEqual('1st Round');
    expect(Resources.getInstance().getRound(2)).toEqual('2nd Round');
    expect(Resources.getInstance().getRound(3)).toEqual('3rd Round');
    expect(Resources.getInstance().getRound(4)).toEqual('4th Round');
})

test('get next player', () => {
    Resources.setCulture('zh-CN');

    expect(Resources.getInstance().getNextPlayer(true, GameModes.humanVsHuman)).toEqual('轮到：X 走子');
    Resources.setCulture('en-US');
    expect(Resources.getInstance().getNextPlayer(true, GameModes.humanVsHuman)).toEqual('It\'s X\'s turn.');
})