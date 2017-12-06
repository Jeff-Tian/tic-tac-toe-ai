import React from 'react';
import GameModes from './Modes';

export default class GameOptions extends React.Component {
    constructor(props) {
        super();

        this.state = {
            selected: GameModes.humanVsHuman
        };

        props.optionChanged(GameModes.humanVsHuman);
    }

    selectMode(mode) {
        this.setState({
            selected: GameModes[mode]
        });

        this.props.optionChanged(GameModes[mode]);
    }

    render() {
        return (
            <div>
                {
                    Object.keys(GameModes).map(mode =>
                        <p key={mode}>
                            <button disabled={this.props.readonly}
                                    onClick={() => this.selectMode(mode)}>
                                {this.state.selected === GameModes[mode] ? <strong>{GameModes[mode]}</strong> :
                                    <span>{GameModes[mode]}</span>}
                            </button>
                        </p>
                    )
                }
            </div>
        );
    }
}