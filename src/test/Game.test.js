import React from 'react';
import Game from '../Game/Game';
import PlayerO from '../Game/player-ai';
import Judger from "../Game/Judger";
import Enzyme, {mount} from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import {StrategySettings} from "../Game/Strategy";

Enzyme.configure({adapter: new Adapter()});

test('Game can train players', async () => {
    StrategySettings.setInitialWeights([0, 1, 1])
    StrategySettings.setNamedStrategy((factors) => {
        return {
            const: factors[0],
            danger: factors[1],
            occupyCenter: factors[2],
        };
    })

    let game = mount(<Game/>);
    expect(game.state()).toEqual({
        "OWeights": [0, 1, 1],
        "autoStart": false,
        "countDown": 0,
        "currentMode": "humanVsComputer",
        "history": [{"squareIndex": null, "squares": [null, null, null, null, null, null, null, null, null]}],
        "round": 1,
        "stepNumber": 0,
        "strategy": {"const": 1, "danger": 0, "occupyCenter": -1},
        "winnerInfo": null,
        "xIsNext": true
    });

    game.find('#turns').simulate('change', {target: {value: '1'}})
    game.find('#start-auto-button').simulate('click');

    await new Promise(resolve => setTimeout(resolve, 3000));

    expect(game.state().history.length > 3).toEqual(true);

    const gameProgress = Judger.gameProgress(new PlayerO('O', 'X').convertSquaresToBitmap(game.state().history[game.state().history.length - 1].squares));
    expect(!!(gameProgress.win || gameProgress.lost || gameProgress.fair)).toEqual(true);
});