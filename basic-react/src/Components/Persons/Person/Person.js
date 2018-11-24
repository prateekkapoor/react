import React from 'react';
import './Person.css';
import Radium from 'radium';
const person = (props) => {
    const style = {
        '@media(min-width:500px)': {
            width: '450px'
        }
    };
    return (
        <div className="Person" style={style}>
            <p onClick={props.clicked}> I'm {props.name} and I'm  {props.age} years old. </p>
            <input type='text' onChange={props.changed} value={props.name} />
            <p>{props.children}</p>
        </div>
    );
};

export default Radium(person);