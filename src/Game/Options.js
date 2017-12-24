import React from 'react';
import GameModes from './Modes';

export default class GameOptions extends React.Component {
    constructor(props) {
        super();

        this.state = {
            selected: props.mode,
            autoStart: props.autoStart
        };

        props.optionChanged(GameModes.humanVsHuman);
    }

    selectMode(mode) {
        this.setState({
            selected: GameModes[mode]
        });

        this.props.optionChanged(GameModes[mode], this.state.autoStart);
    }

    toggleAutoStart() {
        console.log(this.state.autoStart);
        let self = this;
        setTimeout(() => {
            self.setState({autoStart: !this.state.autoStart})
            console.log(self.state.autoStart);

            self.props.optionChanged(self.state.selected, self.state.autoStart);
        })
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
                <p>
                    <input id="auto-start" type="checkbox" onChange={() => this.toggleAutoStart()}
                           checked={this.state.autoStart}></input>
                    <label htmlFor="auto-start">Auto Start</label>
                </p>
            </div>
        );
    }
}