import React from 'react';
import classes from './Order.css';
const order = (props) => {
    const ingridients = [];
    for (let key in props.ingridients) {
        ingridients.push({
            name: key,
            amount: props.ingridients[key]
        })
    }
    const ingridentsOutput = ingridients.map(ingridient => {
        return <span style={{
            textTransform: 'capilatlize',
            display: 'inline-block',
            margin: '0 8px',
            border: '1px solid #ccc',
            padding: '5px'

        }}>{ingridient.name}({ingridient.amount})</span>
    })
    return (
        <div className={classes.Order}>
            <p>Ingridients: {ingridentsOutput} </p>
            <p>Price: <strong>USD {Number.parseFloat(props.price).toFixed(2)}</strong></p>
        </div>
    );
}
export default order;