import React from 'react';
import GameModes from './Modes';
import Resources from './Resources';

export default class GameOptions extends React.Component {
    constructor(props) {
        super();

        this.state = {
            selected: props.mode,
            autoStart: props.autoStart
        };
    }

    selectMode(mode) {
        this.setState({
            selected: GameModes[mode]
        });
        this.notifyWorld();
    }

    checkAutoStart() {
        this.setState({autoStart: true});
        this.notifyWorld();
    }

    notifyWorld() {
        let self = this;
        setTimeout(() => {
            self.props.optionChanged(self.state.selected, self.state.autoStart);
        });
    }

    toggleAutoStart() {
        this.setState({autoStart: !this.state.autoStart})
        this.notifyWorld();
    }

    render() {
        return (
            <div>
                {
                    Object.keys(GameModes).map(mode =>
                        <p key={mode}>
                            <button disabled={this.props.readonly}
                                    onClick={() => this.selectMode(mode)}>
                                {this.state.selected === GameModes[mode] ?
                                    <strong>{Resources.getInstance()[GameModes[mode]]}</strong> :
                                    <span>{Resources.getInstance()[GameModes[mode]]}</span>}
                            </button>
                        </p>
                    )
                }
                <p>
                    <input id="auto-start" type="checkbox" onChange={() => this.toggleAutoStart()}
                           checked={this.state.autoStart}></input>
                    <label htmlFor="auto-start">{Resources.getInstance().autoStart}</label>
                </p>
            </div>
        );
    }
}