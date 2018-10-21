import React from 'react';
import Judger from '../Game/Judger';

test('Judger can find empty spots on board', () => {
    expect(Judger.getSpots([
        -1, 1, -1,
        1, -1, 1,
        -1, 0, 0
    ])).toEqual([7, 8]);
});

test('Judger can generate new boards by current board', () => {
    expect(Judger.generateNewBoardsBySpots([
        -1, 1, -1,
        0, 0, 0,
        0, 0, 0
    ])).toEqual([
        [
            -1, 1, -1,
            1, 0, 0,
            0, 0, 0
        ],
        [
            -1, 1, -1,
            0, 1, 0,
            0, 0, 0
        ],
        [
            -1, 1, -1,
            0, 0, 1,
            0, 0, 0
        ],
        [
            -1, 1, -1,
            0, 0, 0,
            1, 0, 0
        ],
        [
            -1, 1, -1,
            0, 0, 0,
            0, 1, 0
        ],
        [
            -1, 1, -1,
            0, 0, 0,
            0, 0, 1
        ]
    ]);
});

test('裁判打分', () => {

    expect(Judger.getBoardScore([
        1, 1, 1,
        -1, -1, 0,
        -1, 0, 0
    ])).toEqual({
        factors: [1, 1, 1, 0],
        namedFactors: {
            const: 1,
            danger: 1,
            bad: 1,
            chance: 0
        },
        total: 100
    });
});

test('Judger can give score to current board', () => {

    expect(Judger.getBoardScore([
        1, 1, 0,
        1, 0, 0,
        -1, -1, -1
    ])).toEqual({
        factors: [1, 0, 2, 1],
        namedFactors: {
            const: 1,
            danger: 0,
            bad: 2,
            chance: 1
        },
        total: -100
    });

    expect(Judger.getBoardScore([
        1, 1, 0,
        1, -1, -1,
        0, -1, -1
    ], [99, 99, 99, 99, 99])).toEqual({
        factors: [1, 2, 1, 2],
        namedFactors: {
            const: 1,
            danger: 2,
            bad: 1,
            chance: 2
        },
        total: 594
    });

    expect(Judger.getBoardScore([
        1, 1, 0,
        1, -1, -1,
        0, -1, -1
    ], [-99, -99, -99, -99, -99])).toEqual({
        factors: [1, 2, 1, 2],
        namedFactors: {
            const: 1,
            danger: 2,
            bad: 1,
            chance: 2
        },
        total: -594
    });
});

test('Judger can decide whether game ends', () => {
    expect(Judger.gameProgress([
        0, 0, 0,
        0, 0, 0,
        0, 0, 0
    ])).toEqual({
        win: false,
        lost: false,
        fair: false
    });

    expect(Judger.gameProgress([
        -1, -1, 1,
        1, 1, -1,
        -1, 1, 1
    ])).toEqual({
        win: false,
        lost: false,
        fair: true
    });

    expect(Judger.gameProgress([
        1, 1, 1,
        0, -1, 0,
        -1, 0, -1
    ])).toEqual({
        win: [0, 1, 2],
        lost: false,
        fair: false
    });

    expect(Judger.gameProgress([
        -1, 0, 0,
        0, -1, 0,
        0, 0, -1
    ])).toEqual({
        win: false,
        lost: [0, 4, 8],
        fair: false
    })
});

test("Judger can check sides", () => {
    expect(Judger.checkSides([
        -1, 0, -1,
        0, 1, 0,
        1, -1, 1
    ])).toEqual({danger: 1, bad: 0, lost: 0, win: 0, chance: 0});


    expect(Judger.checkSides([
        -1, 1, -1,
        0, 1, 0,
        1, -1, 0
    ])).toEqual({danger: 0, bad: 1, lost: 0, win: 0, chance: 0});
});
