import React, { Component } from 'react';
import { connect } from 'react-redux';

import CounterControl from '../../components/CounterControl/CounterControl';
import CounterOutput from '../../components/CounterOutput/CounterOutput';
import * as actionTypes from '../../stores/actionTypes';

class Counter extends Component {
    state = {
        counter: 0
    }

    counterChangedHandler = (action, value) => {
        switch (action) {
            case 'inc':
                this.setState((prevState) => { return { counter: prevState.counter + 1 } })
                break;
            case 'dec':
                this.setState((prevState) => { return { counter: prevState.counter - 1 } })
                break;
            case 'add':
                this.setState((prevState) => { return { counter: prevState.counter + value } })
                break;
            case 'sub':
                this.setState((prevState) => { return { counter: prevState.counter - value } })
                break;
        }
    }

    render() {
        return (
            <div>
                <CounterOutput value={this.props.ctr} />
                <CounterControl label="Increment" clicked={this.props.onCounterIncrement} />
                <CounterControl label="Decrement" clicked={this.props.onCounterDecrement} />
                <CounterControl label="Add 5" clicked={this.props.onCounterAdd} />
                <CounterControl label="Subtract 5" clicked={this.props.onCounterSubtract} />
                <hr />
                <div>
                    Store Results:
                    <hr />
                    <button onClick={() => this.props.onStoreResult(this.props.ctr)}>Add Result</button>
                    {this.props.storeResults.map(storeResult => {
                        return <li key={storeResult.id}
                            onClick={() => this.props.onDeleteResult(storeResult.id)}>
                            {storeResult.value}</li>
                    })}
                </div>
            </div>
        );
    }
}
const mapStateToProps = state => {
    return {
        ctr: state.ctr.counter,
        storeResults: state.res.results
    }
}
const mapStateToDispatch = dispatch => {
    return {
        onCounterIncrement: () => dispatch({ type: actionTypes.INCREMENT }),
        onCounterDecrement: () => dispatch({ type: actionTypes.DECREMENT }),
        onCounterAdd: () => dispatch({ type: actionTypes.ADD_COUNTER, value: 5 }),
        onCounterSubtract: () => dispatch({ type: actionTypes.SUBTRACT_COUNTER, value: 5 }),
        onStoreResult: (result) => dispatch({ type: actionTypes.STORE_RESULT, counterResult: result }),
        onDeleteResult: (id) => dispatch({ type: actionTypes.DELETE_RESULT, resultElId: id }),
    }
}
export default connect(mapStateToProps, mapStateToDispatch)(Counter);