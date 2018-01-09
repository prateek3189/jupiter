import React from "react";
import PropTypes from "prop-types";
import Calculations from "./calculations.jsx";

class ExpenseManger extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            peopleSubmitted: props.peopleSubmitted,
            peopleList: props.peopleList,
            expenses: [],
            calculate: false
        }

        this._getPeopleList = this._getPeopleList.bind(this);
        this._getRows = this._getRows.bind(this);
        this._isDisableCalculateButton = this._isDisableCalculateButton.bind(this);
    }

    render() {
        return (
            <div>
                <table cellspadding="0" cellspacing="0">
                    <tr>
                        <th>People</th>
                        <th>Description</th>
                        <th>Expenses</th>
                        <th>Action</th>
                    </tr>
                    {this._getRows()}
                    <tr>
                        <td colspan="5" className="add-button-td">
                            <button disabled={this._isDisableCalculateButton()} onClick={this._onClickAddRow.bind(this)}>Add More</button>
                        </td>
                    </tr>
                </table>
                <br/>
                <button disabled={this._isDisableCalculateButton()} onClick={this._onCalculateClick.bind(this)}>Calculate the Expenses</button>
                <br/>
                <br/>
                {this.state.calculate ? <Calculations expenses={this.state.expenses} peopleList={this.state.peopleList}/> : null}
            </div>
        );
    }

    _getRow(index) {
        const { expenses } = this.state;
        const description = expenses && expenses[index] ? expenses[index].description : '';
        const amount = expenses && expenses[index] ? expenses[index].amount: '';
        return (<tr key={index}>
            <td>
                {this._getPeopleList(index)}
            </td>
            <td>
                <input type="text" onChange={this._onInputDescriptionChange.bind(this, index)} value={description}/>
            </td>
            <td>
                <input type="number" onChange={this._onInputAmountChange.bind(this, index)} value={amount}/>
            </td>
            <td>
                <button onClick={this._onClickRemoveRow.bind(this, index)}>Remove</button>
            </td>
        </tr>);
    }

    _getRows() {
        const { expenses } = this.state;
        let rowHtml = [];

        if(expenses && expenses.length){
            expenses.forEach((expense, index) => {
                rowHtml.push(this._getRow(index));
            });
        } else {
            rowHtml.push(this._getRow(0));
        }

        return rowHtml;
    }

    _onChangePeople(index, event) {
        const { expenses } = this.state;

        if(expenses[index]) {
            Object.assign(expenses[index], {
                people: event.target.value
            });
        } else {
            expenses.push({people: event.target.value});
        }

        this.setState({calculate: false, expenses});
    }

    _onInputDescriptionChange(index, event) {
        const { expenses } = this.state;

        if(expenses[index]) {
            Object.assign(expenses[index], {
                description: event.target.value
            });
        } else {
            expenses.push({description: event.target.value});
        }

        this.setState({calculate: false, expenses});
    }

    _onInputAmountChange(index, event) {
        const { expenses } = this.state;

        if(expenses[index]) {
            Object.assign(expenses[index], {
                amount: event.target.value
            });
        } else {
            expenses.push({amount: event.target.value});
        }

        this.setState({calculate: false, expenses});
    }

    _onClickAddRow(index, event) {
        const { expenses } = this.state;
            expenses.push({
                people: null,
                description: '',
                amount: ''
            });
        this.setState({expenses});
    }

    _onClickRemoveRow(index, event) {
        const { expenses } = this.state;
        expenses.splice(index, 1);
        this.setState({calculate: false, expenses});
    }

    _isDisableCalculateButton() {
        let isDisabled = false;
        const { expenses } = this.state;
        if(expenses.length) {
            let flag = 0;
            expenses.forEach(expense => {
                if(
                    !expense ||
                    !expense.people || expense.people === ''  ||
                    !expense.description || expense.description === '' ||
                    !expense.amount || expense.amount === ''
                ) {
                    flag++;
                }
            });
            isDisabled = flag > 0;
        } else {
            isDisabled = true;
        }
        return isDisabled;
    }

    _onCalculateClick() {
        const { expenses } = this.state;
        this.setState({calculate: true, expenses});
    }

    _getPeopleList(index) {
        const { peopleList } = this.state;
        const selectedPeople = this.state.expenses && this.state.expenses[index] && this.state.expenses[index].people;
        let peopleListSelectHtml = [];

        peopleListSelectHtml.push(<option>--Select--</option>)
        peopleList && peopleList.forEach(people => {
            const selected =  selectedPeople === people;
            peopleListSelectHtml.push(
                <option value={people} selected={selected}>{people}</option>);
        });

        return (<select onChange={this._onChangePeople.bind(this, index)}>{peopleListSelectHtml}</select>);
    }
}

ExpenseManger.propTypes = {
    peopleSubmitted: PropTypes.bool,
    peopleList: PropTypes.array
}

module.exports = ExpenseManger;
