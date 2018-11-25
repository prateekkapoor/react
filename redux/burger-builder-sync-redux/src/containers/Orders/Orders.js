import React, { Component } from 'react';
import classes from './Orders.css';
import Order from '../../components/Order/Order';
import axios from '../../axios-orders';
class Orders extends Component {
    state = {
        orders: [],
        loading: false
    }
    componentDidMount() {
        axios.get('/orders.json').then(response => {
            let transformedOrder = [];
            for (let key in response.data) {
                transformedOrder.push({ ...response.data[key], id: key })
            }
            this.setState({ orders: transformedOrder, loading: false });
            console.log(response);
        }).catch(error => {
            this.setState({ loading: false });
        });

    }
    render() {
        let orders = this.state.orders.map(order => {
            return <Order key={order.id}
                ingridients={order.ingredients}
                price={order.price} />
        })
        return (
            <div className={classes.Orders}>
                {orders}
            </div>
        );
    }
}

export default Orders;