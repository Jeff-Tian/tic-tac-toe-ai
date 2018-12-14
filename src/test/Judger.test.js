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
        "factors": [1, 1.1, 0],
        "namedFactors": {"const": 1, "danger": 1.1, "occupyCenter": 0},
        "total": 1.5707963267948966
    });
});

test('Judger can give score to current board', () => {

    expect(Judger.getBoardScore([
        1, 1, 0,
        1, 0, 0,
        -1, -1, -1
    ])).toEqual({
        factors: [1, 0, 0],
        namedFactors: {
            const: 1,
            danger: 0,
            occupyCenter: 0
        },
        total: -Math.PI / 2
    });

    expect(Judger.getBoardScore([
        1, 1, 0,
        1, -1, -1,
        0, -1, -1
    ], [99, 99, 99, 99, 99])).toEqual({
        "factors": [1, 2.2, 0],
        "namedFactors": {"const": 1, "danger": 2.2, "occupyCenter": 0},
        "total": 1.5676397716221768
    });

    expect(Judger.getBoardScore([
        1, 1, 0,
        1, -1, -1,
        0, -1, -1
    ], [-99, -99, -99, -99, -99])).toEqual({
        "factors": [1, 2.2, 0],
        "namedFactors": {"const": 1, "danger": 2.2, "occupyCenter": 0},
        "total": -1.5676397716221768
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
