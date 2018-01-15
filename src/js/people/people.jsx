import React from "react";
import PropTypes from "prop-types";
import swal from 'sweetalert2';
import ExpenseManger from "../expense-manager/expense-manager.jsx";

const MAX_PEOPLE_LENGTH = 50;

class People extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            people: props.people,
            peopleCount: 0,
            peopleAdded: false,
            peopleSubmitted: false,
            peopleEntered: false,
            peopleList: []
        }

        this._onClickAddPeople = this._onClickAddPeople.bind(this);
        this._getPeopleList = this._getPeopleList.bind(this);
        this._onClickCancelPeople = this._onClickCancelPeople.bind(this);
        this._onClickSubmitPeople = this._onClickSubmitPeople.bind(this);
        this._displayPeopleList = this._displayPeopleList.bind(this);
    }

    render() {
        const { peopleAdded, people } = this.state;
        return (
            <div>
                <div>
                    <label>Number of People:</label>
                    <input
                        type="number"
                        onChange={this._onInputChange.bind(this, "peopleCount")}
                        value={this.state.peopleCount}
                        disabled={this.state.peopleAdded} />
                    <button disabled={!this.state.peopleCount || this.state.peopleAdded} onClick={this._onClickAddPeople}>Add</button>
                    <button onClick={this._onClickCancelPeople} className="btn-cancel">Reset All</button>
                </div>
                {this.state.peopleSubmitted ?
                    (<div>
                        {this._displayPeopleList()}
                        <ExpenseManger peopleSubmitted={this.state.peopleSubmitted} peopleList={this.state.peopleList} />
                    </div>)
                    : (this.state.peopleAdded && !this.state.peopleSubmitted ?
                        <div>
                            {this._getPeopleList()}
                            <button disabled={!this.state.peopleEntered} onClick={this._onClickSubmitPeople}>Add</button>
                            <button disabled={!this.state.peopleEntered} onClick={this._onClickCancelPeople} className="btn-cancel">Cancel</button>
                            <button onClick={this._onClickCancelPeople} className="btn-cancel">Reset All</button>
                        </div> :
                        null)
                }
            </div>
        );
    }

    _displayPeopleList() {
        let peopleDisplayListHtml = [];
        this.state.peopleList && this.state.peopleList.forEach((people, index) => {
            peopleDisplayListHtml.push(<li key={index-1}>{people}</li>)
        });

        return (
            <ul className="people-display-list">{peopleDisplayListHtml}</ul>
        )
    }

    _getPeopleList() {
        let peopleListHtml = [];
        for(let i = 0; i<this.state.peopleCount; i++) {
            peopleListHtml.push(<li key={i} ><input type="text" name='people[]' onChange={this._onInputPeopleChange.bind(this, i)}/></li>);
        }
        return (
            <ul className="people-form-list">{peopleListHtml}</ul>
        )
    }

    _onInputPeopleChange(field, event) {
        const { peopleList } = this.state;
        peopleList[field] = event.target.value;

        const peopleEntered = peopleList.length === parseInt(this.state.peopleCount, 10);
        this.setState({
            peopleList,
            peopleEntered
        });
    }

    _onInputChange(field, event) {
        let entry = {};
        entry[field] = event.target.value;
        this.setState(entry)
    }

    _onClickAddPeople() {
        if(this.state.peopleCount > MAX_PEOPLE_LENGTH) {
            swal({
              title: 'Error!',
              text: 'Please enter less then '+MAX_PEOPLE_LENGTH+' People',
              type: 'error'
            })
        } else {
            this.setState({
                peopleAdded: true
            });
        }
    }

    _onClickCancelPeople() {
        this.setState({
            peopleList: [],
            peopleSubmitted: false,
            peopleEntered: false,
            peopleCount: 0,
            peopleAdded: false
        });
    }

    _onClickSubmitPeople() {
        // Remove unneccessary entry
        var { peopleList } = this.state;
        var filteredPeopleList = [];
        peopleList.forEach(people => {
            if(filteredPeopleList.indexOf(people) === -1) {
                filteredPeopleList.push(people);
            }
        });

        this.setState({peopleSubmitted: true, peopleList: filteredPeopleList});
    }
}

People.propTypes = {
    people: PropTypes.array
}

module.exports = People;
