import React, { Component } from 'react';
import { connect } from 'react-redux';
import Aux from '../../hoc/Aux/Aux';
import Burger from '../../components/Burger/Burger';
import BuildControls from '../../components/Burger/BuildControls/BuildControls';
import Modal from '../../components/UI/Modal/Modal';
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary';
import axios from '../../axios-orders';
import Spinner from '../../components/UI/spinner/spinner';
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';
import aux from '../../hoc/Aux/Aux';
import * as burgerBuilderActions from '../../store/actions/index';


class BurgerBuilder extends Component {
    state = {
        totalPrice: 4,
        purchasing: false,
    }
    componentDidMount() {
        this.props.onInitIngridents();
    }
    updatePurchaseState(ingredients) {
        const sum = Object.keys(ingredients)
            .map(igKey => {
                return ingredients[igKey];
            })
            .reduce((sum, el) => {
                return sum + el;
            }, 0);
        return sum > 0;
    }

    purchaseHandler = () => {
        this.setState({ purchasing: true });
    }

    purchaseCancelHandler = () => {
        this.setState({ purchasing: false });
    }

    purchaseContinueHandler = () => {
        this.props.onInitPurchase();
        this.props.history.push('/checkout');

    }

    render() {
        const disabledInfo = {
            ...this.props.ings
        };
        for (let key in disabledInfo) {
            disabledInfo[key] = disabledInfo[key] <= 0
        }
        let orderSummary = null;
        let burger = this.props.error ? <p style={{ alignItems: 'center' }}>Something went wrong...</p> : <Spinner />
        //console.log('ingriendts' + this.props.ings)
        if (this.props.ings) {
            burger = (
                <aux>
                    <Burger ingredients={this.props.ings} />
                    <BuildControls
                        ingredientAdded={this.props.onIngridentAdded}
                        ingredientRemoved={this.props.onIngridentRemoved}
                        disabled={disabledInfo}
                        purchasable={this.updatePurchaseState(this.props.ings)}
                        ordered={this.purchaseHandler}
                        price={this.props.price} />
                </aux>
            );
            orderSummary = <OrderSummary
                ingredients={this.props.ings}
                price={this.props.price}
                purchaseCancelled={this.purchaseCancelHandler}
                purchaseContinued={this.purchaseContinueHandler} />;
        }
        /*if (this.state.loading) {
            orderSummary = <Spinner />;
        }*/
        // {salad: true, meat: false, ...}
        return (
            <Aux>
                <Modal show={this.state.purchasing} modalClosed={this.purchaseCancelHandler}>
                    {orderSummary}
                </Modal>
                {burger}
            </Aux>
        );
    }
}
const mapStateToProps = state => {
    return {
        ings: state.burgerBuilder.ingredients,
        price: state.burgerBuilder.totalPrice,
        error: state.burgerBuilder.error
    }
}

const mapDispatchToProps = dispatch => {
    return {
        onIngridentAdded: (ingridentName) => dispatch(burgerBuilderActions.addIngrident(ingridentName)),
        onIngridentRemoved: (ingridentName) => dispatch(burgerBuilderActions.removeIngrident(ingridentName)),
        onInitIngridents: () => dispatch(burgerBuilderActions.initIngridents()),
        onInitPurchase: () => dispatch(burgerBuilderActions.initPurchase())
    }
}


export default connect(mapStateToProps, mapDispatchToProps)(withErrorHandler(BurgerBuilder, axios));