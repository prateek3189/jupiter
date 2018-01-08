import React from "react";
import PropTypes from "prop-types";

function getState(props) {
    const expenses = props.expenses;
    const peopleList = props.peopleList;

    let newExpenses = [];

    // Get Total Amount
    let total = 0;
    expenses && expenses.forEach(exp => {
        total += parseInt(exp.amount, 10);

        if(newExpenses[exp.people] && newExpenses[exp.people] !== '') {
            newExpenses[exp.people] += parseInt(exp.amount, 10);
        } else {
            newExpenses[exp.people] = parseInt(exp.amount, 10);
        }
    });

    return {
        totalAmount: total,
        avgAmount: Math.round(total/Object.keys(newExpenses).length),
        newExpenses,
        expenses
    }
}

class Calculations extends React.Component {
    constructor(props) {
        super(props);
        this.state = Object.assign({
            peopleList: props.peopleList,
            expenses: props.expenses
        }, getState(props));
    }

    componentWillReceiveProps(nextProps) {
        this.setState(getState(nextProps));
    }

    render() {
        return (
            <div>
                <h3>Expenses</h3>
                <table cellspadding="0" cellspacing="0" className="expense-table">
                    <tr>
                        <th>Total:</th>
                        <th>{this.state.totalAmount}</th>
                    </tr>
                    <tr>
                        <th>Per Head Amount:</th>
                        <th>{this.state.avgAmount}</th>
                    </tr>
                </table>

                <h3>Calculations</h3>
                <table cellspadding="0" cellspacing="0">
                    <tr>
                        <th>Name</th>
                        <th>Description</th>
                        <th>Amount</th>
                    </tr>
                    {this.getCalculations()}
                </table>
            </div>
        );
    }

    getCalculations() {
        const newExpenses = this.state.newExpenses;
        let rowDataHtml = [];

        for(const user in newExpenses) {
            let description = '';
            const userExpenses = (this.state.avgAmount - newExpenses[user]);

            description = userExpenses <= 0 ? 'Will Get': 'Owe';
            rowDataHtml.push(<tr>
                    <td>{user}</td>
                    <td>{description}</td>
                    <td>{userExpenses < 0 ? (0-userExpenses) : userExpenses}</td>
                </tr>);
        }

        return rowDataHtml;
    }
}

Calculations.propTypes = {
    expenses: PropTypes.array,
    peopleList: PropTypes.array
}

module.exports = Calculations;
