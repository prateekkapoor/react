import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import Person from './Person/Person';
import { throws } from 'assert';
import Radium, { StyleRoot } from 'radium';
class App extends Component {
  state = {
    persons: [
      { id: 1, name: 'Prateek', age: 30 },
      { id: 2, name: 'Vipin', age: 29 },
      { id: 3, name: 'Shikhar', age: 29 },

    ],

  };
  switchNameHandler = (newName) => {
    this.setState({
      persons: [
        { name: newName, age: 30 },
        { name: 'Vipin', age: 29 },
        { name: 'Shikhar', age: 30 },

      ]
    });
  };
  onChangeHandler = (event, id) => {
    console.log(event.target.value);
    const personIndex = this.state.persons.findIndex(p => {
      return p.id === id;
    });

    const person = {
      ...this.state.persons[personIndex]
    }
    person.name = event.target.value;
    const persons = [...this.state.persons];
    persons[personIndex] = person;
    this.setState({ persons: persons });
  };

  togglePersonsHandler = () => {
    const doesShow = this.state.showPersons;
    this.setState({ showPersons: !doesShow });

  };

  deletePersonHandler = (index) => {
    console.log('i am clicked');
    //const persons = this.state.persons.slice();
    const persons = [...this.state.persons];
    persons.splice(index, 1);
    this.setState({ persons: persons });
  };

  render() {
    const style = {
      backgroundColor: 'green',
      color: 'white',
      font: 'inherit',
      border: '1px solid blue',
      padding: '8px',
      cursor: 'pointer',
      ':hover': {
        backgroundColor: 'lightgreen',
        color: 'black'
      }
    };
    let persons = null;
    if (this.state.showPersons) {
      persons = (
        <div>
          {this.state.persons.map((person, index) => {
            return <Person
              clicked={() => this.deletePersonHandler(index)}
              changed={(event) => { this.onChangeHandler(event, person.id) }}
              name={person.name}
              age={person.age}
              key={person.id}
            />
          })
          }
        </div>
      );
      style.backgroundColor = 'red';
      style[':hover'] = {
        backgroundColor: 'salmon',
        color: 'black'
      }
    }
    const classes = [];
    if (this.state.persons.length <= 2) {
      classes.push('red');
    }
    if (this.state.persons.length <= 1) {
      classes.push('bold');
    }
    return (
      <StyleRoot>
        <div className="App">
          <h1>I'm mew React APP</h1>
          <p className={classes.join(' ')}>This is really working!!!</p>
          <button style={style}
            onClick={this.togglePersonsHandler}>Toggle Persons</button>
          {persons}
        </div>
      </StyleRoot>
    );
  }
}

export default Radium(App);
