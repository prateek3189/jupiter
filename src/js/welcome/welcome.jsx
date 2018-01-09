import React from "react";
import ReactDOM from "react-dom";

function getState() {
    const showWelcome = !localStorage.getItem('showWelcome') || typeof localStorage.getItem('showWelcome') === undefined ? "SHOW" : localStorage.getItem('showWelcome');
    return {
        showWelcome
    }
}

class Welcome extends React.Component {
    constructor() {
        super();
        this.state = getState();
    }

    render() {
        return (
            <div>
                {this.state.showWelcome === "SHOW" ?
                    <div>
                        <div className="fade" onClick={this._onClickFade.bind(this)}>&nbsp;</div>
                        <div className="welcome-content popup"><img src="./images/welcome.jpg" /></div>
                    </div>
                : null}
            </div>
        );
    }

    _onClickFade() {
        localStorage.setItem('showWelcome', "HIDE");
        this.setState({showWelcome: "HIDE"});
    }
}

module.exports = Welcome;
