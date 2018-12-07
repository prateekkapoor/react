import React, { Component } from 'react';
import { connect } from 'react-redux';

import classes from './ContactData.css';
import Button from '../../../components/UI/Button/Button';
import axios from '../../../axios-orders';
import Spinner from '../../../components/UI/spinner/spinner';
import Input from '../../../components/UI/Input/input'
import withErrorHandler from '../../../hoc/withErrorHandler/withErrorHandler';
import * as actionCreators from '../../../store/actions/index';
//import { stat } from 'fs';

class ContactData extends Component {
    state = {
        orderForm: {
            name: {
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'Your Name'
                },
                value: '',
                validation: {
                    required: true
                },
                valid: false,
                touched: false
            },
            zipCode: {
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'Zipcode'
                },
                value: '',
                validation: {
                    required: true,
                    minLength: 5,
                    maxLength: 5
                },
                valid: false,
                touched: false
            },
            country: {
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'Country'
                },
                value: '',
                validation: {
                    required: true
                },
                valid: false,
                touched: false
            },
            email: {
                elementType: 'input',
                elementConfig: {
                    type: 'email',
                    placeholder: 'Your Email'
                },
                value: '',
                validation: {
                    required: true
                },
                valid: false,
                touched: false
            },
            deliveryType: {
                elementType: 'select',
                elementConfig: {
                    options: [{ value: 'fastest', displayValue: 'Fastest' },
                    { value: 'cheapest', displayValue: 'Cheapest' },
                    ]
                },
                value: 'fastest',
                valid: true,
                validation: {}
            },
        },
        isFormValid: false,
    }
    orderHandler = (event) => {
        event.preventDefault();
        //console.log(this.props.ingredients);
        //console.log(this.props.price);
        //this.setState({ loading: true })
        const formData = {}
        for (let key in this.state.orderForm) {
            formData[key] = this.state.orderForm[key].value
        }
        const order = {
            ingredients: this.props.ings,
            price: this.props.price,
            orderData: formData
        }
        /*axios.post('/orders.json', order).then(response => {
            console.log(response);
            this.setState({ loading: false })
            this.props.history.push('/');

        }).catch(error => {
            console.log(error)
            this.setState({ loading: false })
        })*/
        this.props.onOrderBurger(order);

    }
    checkValidity = (rule, value) => {
        let isValid = true
        if (rule.required) {
            isValid = value.trim() !== '' && isValid;
        }
        if (rule.minLength) {
            isValid = value.length >= rule.minLength && isValid;
        }
        if (rule.maxLength) {
            isValid = value.length <= rule.minLength && isValid;
        }

        return isValid;
    }
    inputChangedHandler = (event, inputIdentifier) => {
        const updatedOrderForm = { ...this.state.orderForm }
        const updatedFormElement = { ...updatedOrderForm[inputIdentifier] }
        updatedFormElement.value = event.target.value;
        updatedFormElement.valid = this.checkValidity(
            updatedFormElement.validation, event.target.value)
        updatedFormElement.touched = true;
        updatedOrderForm[inputIdentifier] = updatedFormElement;
        let isFormValid = true;
        for (let key in updatedOrderForm) {
            isFormValid = updatedOrderForm[key].valid && isFormValid
        }
        console.log(updatedOrderForm)
        this.setState({ orderForm: updatedOrderForm, isFormValid: isFormValid })
    }
    render() {
        let form = null;
        if (this.props.loading) {
            form = <Spinner />
        } else {
            let formElementArray = [];
            for (let key in this.state.orderForm) {
                formElementArray.push({ id: key, config: this.state.orderForm[key] })
            }
            form = (<form>
                {formElementArray.map(formElement => (
                    <Input key={formElement.id}
                        elementType={formElement.config.elementType}
                        elementConfig={formElement.config.elementConfig}
                        value={formElement.config.value}
                        inValid={!formElement.config.valid}
                        shouldValidate={formElement.config.validation}
                        touched={formElement.config.touched}
                        changed={(event) => { this.inputChangedHandler(event, formElement.id) }}
                    />)
                )}
                <Button btnType="Success"
                    disabled={!this.state.isFormValid}
                    clicked={this.orderHandler}>ORDER</Button>
            </form>)
        }
        return (
            <div className={classes.ContactData}>
                <h4>Enter your contact data.</h4>
                {form}
            </div>
        )
    }
}

const mapStateToProps = state => {
    return {
        ings: state.burgerBuilder.ingredients,
        price: state.burgerBuilder.totalPrice,
        loading: state.order.loading
    }
}
const mapDispatchtoProps = dispatch => {
    return {
        onOrderBurger: (orderData) => dispatch(actionCreators.purchaseBurger(orderData))
    }
}
export default connect(mapStateToProps, mapDispatchtoProps)(withErrorHandler(ContactData, axios));