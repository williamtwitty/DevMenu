import React, { Component } from 'react';
import { connect } from 'react-redux';
import { getCheckByTable } from '../ducks/reducer';
import { Link } from 'react-router-dom';
import Footer from '../components/Footer';
import StripeCheckout from 'react-stripe-checkout';
import axios from 'axios';
import swal from 'sweetalert2';

class CheckOut extends Component {
    constructor(props) {
        super(props)
        this.state = {
            checkByTable: []
        }

        this.onToken=this.onToken.bind(this);

    }
    componentDidMount() {
        this.props.getCheckByTable(this.props.tableNumber)
    }

    onToken(token) {
        token.card = void 0;
        console.log('token', this.state);
        axios.post('/api/payment', { token, amount: 100, options: this.state} ).then(response => {
            // alert('thanks for your purchase!')
            swal({
                title: null,
                text: 'You order is complete!',
                type: null,
                confirmButtonText: 'Sweeeet!'
              })
        });
      }
    
    render() {
        console.log(this.props.tableNumber, 'checkout table number');
       // console.log(this.props.checkByTable);
        return (
            
            <div>
                     <div className='title'>DevMENU</div>
                <div className='Nav'>
                    <div className='nav-container'>
                        <div className='drinks'><Link className='Link' to ='/drinks'>Drinks</Link></div>
                        <div className='drinks'><Link  className='Link' to ='/appetizers'>Appetizers</Link></div>
                        <div className='drinks'><Link className='Link' to ='/salads'>Salads</Link></div>
                        <div className='drinks'><Link className='Link' to ='/entrees'>Entrees</Link></div>
                        <div className='drinks'><Link className='Link' to ='/desserts'>Desserts</Link></div>
                    </div>
                </div>
                <div className='cart-title'> Cart </div>
                <div className='cart-container'>
                    <div className='cart-titles'>
                        <div className='Product'>Product</div>
                        <div className='Price'>Price</div>
                        <div className='Quantity'>Quantity</div>
                        <div className='Total'>Total</div>
                    </div>
                    <div className='cart-item'>
                        <div className='cart-delete'> X </div>
                        <div className='cart-img-box'> img </div>
                        <div className='cart-product'> 
                            <h1> food item </h1>
                            <button className='edit-options'> Edit Options</button>
                        </div>
                        <div className='cart-price'> price </div>
                        <div className='cart-quantity'> <input></input> </div>
                        <div className='cart-total'> total</div>
                    </div>
                    <div className='cart-coupon'>
                        <input className='coupon-code' placeholder='&nbsp; Coupon code'></input>
                        <button className='apply-coupon'>Apply Coupon</button>
                    </div>
                    <div className='Totals-container'>
                        <div className='TOTALS'>
                            <div className='cart-total-title flex'>Cart Totals</div>
                            <div className='subtotal flex'>Subtotal</div>
                            <div className='receipt'>Receipt</div>
                            <div className='total flex'>Total</div>
                            <div className='btn-totalbox'>
                                <StripeCheckout
                                token={this.onToken}
                                stripeKey={ process.env.REACT_APP_STRIPE_SECRETKEY }
                                amount={100}
                                />
                            </div>
                        </div>
                    </div>
                    <div className='empty-space'> </div>
                </div>
                <Footer/>
            </div>
        );
    }
}
function mapStateToProps(state){
    return {
        tableNumber: state.tableNumber,
        checkByTable: state.checkByTable
    }
}

export default connect(mapStateToProps, {getCheckByTable})(CheckOut);