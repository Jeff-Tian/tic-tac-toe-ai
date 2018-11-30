import React from 'react';
import Resources from "./Resources";
import {GlobalSettings} from "./globals";


export default class CultureSelector
    extends React.Component {

    constructor(props) {
        super();
        this.state = {showAdvancedSettings: !!GlobalSettings.showAdvancedSettings}
    }

    toggleShowingAdvancedSettings() {
        GlobalSettings.showAdvancedSettings = !GlobalSettings.showAdvancedSettings;
        this.setState({
            showAdvancedSettings: GlobalSettings.showAdvancedSettings
        })
    }

    render() {
        return <span style={{fontSize: "x-small", float: 'right', marginLeft: "2em", fontWeight: "normal"}}>
                    <input disabled={true} id="show-adavanced-settings" type="checkbox"
                           onChange={() => this.toggleShowingAdvancedSettings()}
                           checked={this.state.showAdvancedSettings}/>
                    <label htmlFor="show-adavanced-settings">{Resources.getInstance().showAdvancedSettings}</label>
            </span>;
    }

}
