import React from 'react';
import Computer from '../Game/Computer';

function testSideScore(squares, direction, score, enemyScore, message) {
    test(message || (score + ' -  ' + enemyScore), () => {
        expect(Computer.getSideScore(squares, direction)).toEqual(score);
        expect(Computer.getComponentSideScore(squares, direction)).toEqual(enemyScore);
    });
}

testSideScore([
    0, 0, 0,
    0, 0, 0,
    0, 0, 0
], [0, 1, 2], 0, -0, 'start');

testSideScore([
    0, 0, -1,
    0, 0, -1,
    0, 0, -1
], [0, 1, 2], -1, 1);

testSideScore([
    0, 0, -1,
    0, 0, -1,
    0, 0, -1
], [2, 5, 8], -3, 3);

testSideScore([
    0, 0, -1,
    0, 0, -1,
    0, 0, 0
], [2, 5, 8], -2, 2);

testSideScore([
    0, 0, -1,
    0, 0, -1,
    0, 0, 1
], [2, 5, 8], 0, -0, 'fair');

testSideScore([
    0, 0, 1,
    0, 0, 1,
    0, 0, 0
], [2, 5, 8], 2, -2);