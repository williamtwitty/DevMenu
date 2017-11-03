import React, { Component } from 'react';
import { connect } from 'react-redux';
import { getCheckByTable } from '../ducks/reducer';
import { Link } from 'react-router-dom';
import Footer from '../components/Footer'

class CheckOut extends Component {
    constructor(props) {
        super(props)
        this.state = {
            checkByTable: []
        }
    }
    componentDidMount() {
        this.props.getCheckByTable(this.props.tableNumber)
    }
    
    render() {
        console.log('its working',this.props.newOrder);
        console.log(this.props.tableNumber, 'checkout table number');
       // console.log(this.props.checkByTable);
        return (
            <div>
                     <div className='title'>DevMENU</div>
                <div className='Nav'>
                    <div className='nav-container'>
                        <div className='drinks'><Link to ='/drinks'>Drinks</Link></div>
                        <div className='drinks'><Link to ='/appetizers'>Appetizers</Link></div>
                        <div className='drinks'><Link to ='/salads'>Salads</Link></div>
                        <div className='drinks'><Link to ='/entrees'>Entrees</Link></div>
                        <div className='drinks'><Link to ='/desserts'>Desserts</Link></div>
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
                                <button className='stripe-btn'> Checkout </button>
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
        checkByTable: state.checkByTable,
        newOrder: state.newOrder
    }
}

export default connect(mapStateToProps, {getCheckByTable})(CheckOut);