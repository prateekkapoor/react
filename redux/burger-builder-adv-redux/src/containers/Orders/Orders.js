import React, { Component } from 'react';
import classes from './Orders.css';
import Order from '../../components/Order/Order';
import axios from '../../axios-orders';
import * as actionCreators from '../../store/actions/index'
import { connect } from 'react-redux'
import Spinner from '../../components/UI/spinner/spinner'
class Orders extends Component {
    state = {
        orders: [],
        loading: false
    }
    componentDidMount() {
        this.props.onFetchOrders();

    }
    render() {
        let orders = <Spinner />;
        if (!this.props.loading) {
            orders = this.props.orders.map(order => {
                return <Order key={order.id}
                    ingridients={order.ingredients}
                    price={order.price} />
            })
        }
        return (
            <div className={classes.Orders}>
                {orders}
            </div>
        );
    }
}
const mapStateToProps = state => {
    return {
        orders: state.order.orders,
        loading: state.order.loading
    }
}
const mapDispatchToProps = dispatch => () => {
    return {
        onFetchOrders: () => dispatch(actionCreators.fetchOrder())
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Orders);