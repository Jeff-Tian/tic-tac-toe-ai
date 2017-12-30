import React from 'react';
import Game from '../Game/Game';
import Modes from "../Game/Modes";
import PlayerX from "../Game/player-fool";
import PlayerO from '../Game/player-ai';
import Judger from "../Game/Judger";

test('Game can train players', () => {
    let game = new Game();
    expect(game.state).toEqual({
        "OWeights": [0, 1, 1],
        "XWeights": [],
        "autoStart": false,
        "countDown": 0,
        "currentMode": Modes.humanVsComputer,
        "history": [
            {
                "squareIndex": null,
                "squares": [null, null, null, null, null, null, null, null, null]
            }
        ],
        "round": 1,
        "stepNumber": 0,
        "winnerInfo": null,
        "xIsNext": true
    });

    expect(game.players.X.enemy).toEqual('O');
    expect(game.players.O.enemy).toEqual('X');

    game.autoPlay();

    const gameProgress = Judger.gameProgress(game.state.history[game.state.history.length - 1].squares);
    expect(gameProgress.win || gameProgress.lost || gameProgress.fair).toEqual(true);
});