import React, { Component } from 'react';
//import logo from './logo.svg';
import './App.css';
import axios from 'axios';

class App extends Component {
  constructor() {
    super();
    this.state = {
      company: [],
      selected: [],
      history: []
    }
  }

  getCompany = () => {
    axios.get('/company')
      .then(res => {
        console.log("data:", res.data);
        this.setState({
          company: res.data
        })
      })
  }

  componentDidMount = () => {
    this.getCompany();
  }

  onPerson = (child) => {
    const { history } = this.state;

    let find = history.filter(el => {
      if (el.name === child.name) {
        return el;
      }
    })

    if (!find.length) {
      this.setState({
        selected: [child],
        history: [...history, child]
      })
    } else {
      this.setState({
        selected: [child],
      })
    }

  }

  render() {
    const { company, selected, history } = this.state;
    return (
      <div className="App">
        <h1>Search the Organization</h1>

        <div className="flex">

          {/* Search History */}
          <div className="box search">
            <ul>Search History:
            {history.map(el =>
                <li key={el.name} onClick={() => this.onPerson(el)}>{el.name}</li>
              )}
            </ul>
          </div>

          {/* First response from Company API */}
          {company.map((el) =>
            <div className="box card" key={el.name}>
              <h3>{el.name}</h3>
              <p>Title:{" "}{el.title}</p>
              <p>Email:{" "}{el.email}</p>
              <p>Office:{" "}{el.office}</p>
              <p>Manager:</p>
              {el.manager.map((child) =>
                <p className="link" style={{ textDecoration: "underline" }} key={child.name} onClick={() => this.onPerson(child)}>{child.name}</p>
              )}
            </div>
          )}

          {/* Person selected by user */}
          {selected.map((el) =>
            <div className="box card" key={el.name}>
              <h3>{el.name}</h3>
              <p>Title:{" "}{el.title}</p>
              <p>Email:{" "}{el.email}</p>
              <p>Office:{" "}{el.office}</p>
              <p>Manager:</p>
              {!el.manager ? "none" : el.manager.map((child) =>
                <p className="link" style={{ textDecoration: "underline" }} key={child.name} onClick={() => this.onPerson(child)}>{child.name}</p>
              )}
            </div>
          )}
        </div>
      </div>
    );
  }
}

export default App;
