import React from 'react';
import Computer from '../Game/Computer';

function testSideScore(squares, direction, score, message) {
    test(message || (score + ' -  ' ), () => {
        expect(Computer.getSideScore(squares, direction)).toEqual(score);
    });
}

testSideScore([
    0, 0, 0,
    0, 0, 0,
    0, 0, 0
], [0, 1, 2], 0, 'start');

testSideScore([
    0, 0, -1,
    0, 0, -1,
    0, 0, -1
], [0, 1, 2], -1, 'enemy one side win');

testSideScore([
    0, 0, -1,
    0, 0, -1,
    0, 0, -1
], [2, 5, 8], -3.5);

testSideScore([
    0, 0, -1,
    0, 0, -1,
    0, 0, 0
], [2, 5, 8], -2.5);

testSideScore([
    0, 0, -1,
    0, 0, -1,
    0, 0, 1
], [2, 5, 8], 0, 'fair');

testSideScore([
    0, 0, 1,
    0, 0, 1,
    0, 0, 0
], [2, 5, 8], 2);