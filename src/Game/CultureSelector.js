import React from 'react';
import Resources from './Resources';

export default class CultureSelector
    extends React.Component {

    constructor(props) {
        super();

        Resources.setCulture(props.currentCulture);

        this.state = {
            currentCulture: props.currentCulture
        }
    }

    changeCultureTo(event, culture) {
        event.preventDefault();

        Resources.setCulture(culture);

        this.setState({
            currentCulture: culture
        }, () => {
            this.props.cultureChanged();
        });
    }


    render() {
        return <span style={{fontSize: "x-small", float: 'right', marginLeft: "2em", fontWeight: "normal"}}>
                <a href="" onClick={(event) => this.changeCultureTo(event, 'en-US')}
                   style={{fontWeight: this.state.currentCulture === 'en-US' ? 'bold' : 'normal'}}>
                    {this.state.currentCulture === 'en-US' ? '[English]' : 'English'}
                </a>
            &nbsp;&nbsp;
            <a href="" onClick={(event) => this.changeCultureTo(event, 'zh-CN')}
               style={{fontWeight: this.state.currentCulture === 'zh-CN' ? 'bold' : 'normal'}}>
                    {this.state.currentCulture === 'zh-CN' ? '【中文】' : '中文'}
                </a>
            </span>;
    }

}
