import React, { Component } from 'react';
import Total from './components/total/Total';
import History from './components/history/History';
import Operation from './components/operation/Operation';

class App extends Component {

  state = {
    transactions: JSON.parse(localStorage.getItem('transactions')) || [],
    description: '',
    amount: '',
    income: JSON.parse(localStorage.getItem('income')) || 0,
    expenses: JSON.parse(localStorage.getItem('expenses')) || 0,
  }

  addTransaction = add => {
    const transactions = [...this.state.transactions]

    transactions.push({
      id: `cmr${(+new Date()).toString(16)}`,
      description: this.state.description,
      amount: this.state.amount,
      add
    });

    this.setState({ 
      transactions, 
      description: '', 
      amount: '',
      income: add * this.state.amount + this.state.income,
      expenses: !add * this.state.amount + this.state.expenses 
    }, this.addStorage)
  }

  deleteTransaction = (id) => {
    let add = false;
    let amount = 0;
    const transactions = this.state.transactions.filter(function(item) {
      if (item.id === id) {
        add = item.add;
        amount = item.amount;
      }
      return item.id !== id
    });
    this.setState({ 
      transactions, 
      income: this.state.income - add * amount,
      expenses: this.state.expenses - !add * amount, 
    })
  }

  addAmount = elem => {
    this.setState({amount: elem.target.value });
  }

  addDescription = elem => {
    this.setState({description: elem.target.value})
  }

  addStorage() {
    localStorage.setItem('transactions', JSON.stringify(this.state.transactions));
    localStorage.setItem('income', JSON.stringify(this.state.income));
    localStorage.setItem('expenses', JSON.stringify(this.state.expenses));
  }

  render() {
    return (
      <>
        <header>
            <h1>Кошелек</h1>
            <h2>Калькулятор расходов</h2>
        </header>
  
        <main>
          <div className="container">
            <Total 
              income={this.state.income} 
              expenses={this.state.expenses}
            />
            <History
              transactions={this.state.transactions}
              deleteTransaction={this.deleteTransaction}
            />
            <Operation 
              addTransaction={this.addTransaction}
              addAmount={this.addAmount}
              addDescription={this.addDescription}
              description={this.state.description}
              amount ={this.state.amount}
            />
          </div>
        </main>
      </>
    );
  }
}

export default App;
