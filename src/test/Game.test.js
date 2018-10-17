import React from 'react';
import Game from '../Game/Game';
import Modes from "../Game/Modes";
import PlayerX from "../Game/player-fool";
import PlayerO from '../Game/player-ai';
import Judger from "../Game/Judger";
import Enzyme, {shallow} from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

Enzyme.configure({adapter: new Adapter()});

test('Game can train players', () => {
    let game = shallow(<Game/>);
    expect(game.state()).toEqual({
        "OWeights": [0, 1, 1, 1],
        "XWeights": [],
        "OFactors": {},
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

    game.find('#silent-learn-button').simulate('click');


    const gameProgress = Judger.gameProgress(new PlayerO('O', 'X', false).convertSquaresToBitmap(game.state().history[game.state().history.length - 1].squares));
    expect(!!(gameProgress.win || gameProgress.lost || gameProgress.fair)).toEqual(true);
});
