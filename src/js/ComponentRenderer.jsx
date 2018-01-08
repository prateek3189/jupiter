import React from "react";
import People from "./people/people.jsx";

class ContentRenderer extends React.Component {
    constructor() {
        super();
        this.state = {
            people: []
        };
    }

    render() {
        return (
            <div className="main-content">
                <h3>People</h3>
                <People people={this.state.people} />
            </div>
        );
    }
}

module.exports = ContentRenderer;
