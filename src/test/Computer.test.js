import React from 'react';
import Computer from '../Game/Computer';

function testThreadScore(squares, direction, score, enemyScore, message) {
    test(message || (score + ' -  ' + enemyScore), () => {
        expect(Computer.getThreadIndexToMe(squares, direction)).toEqual(score);
        expect(Computer.getThreadIndexToEnemy(squares, direction)).toEqual(enemyScore);
    });
}

testThreadScore([
    0, 0, 0,
    0, 0, 0,
    0, 0, 0
], [0, 1, 2], 0, -0, 'start');

testThreadScore([
    0, 0, -1,
    0, 0, -1,
    0, 0, -1
], [0, 1, 2], -1, 1);

testThreadScore([
    0, 0, -1,
    0, 0, -1,
    0, 0, -1
], [2, 5, 8], -3, 3);

testThreadScore([
    0, 0, -1,
    0, 0, -1,
    0, 0, 0
], [2, 5, 8], -2, 2);

testThreadScore([
    0, 0, -1,
    0, 0, -1,
    0, 0, 1
], [2, 5, 8], 0, -0, 'fair');

testThreadScore([
    0, 0, 1,
    0, 0, 1,
    0, 0, 0
], [2, 5, 8], 2, -2);