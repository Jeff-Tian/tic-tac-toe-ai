import React from 'react';
import SimpleComputer from '../Game/SimpleComputer';

test('simple evaluation', () => {
    expect(SimpleComputer.getBoardScore([
        -1, 0, 1,
        0, -1, 1,
        0, 0, 0
    ], [0, 1, 1, 1], false, false)).toEqual({factors: [1, 1, 1, -1], total: 1});
})