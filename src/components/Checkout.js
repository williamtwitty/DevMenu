import React, { Component } from 'react';
import { connect } from 'react-redux';
import { getCheckByTable } from '../ducks/reducer';
import { Link } from 'react-router-dom';
import Footer from '../components/Footer';
import StripeCheckout from 'react-stripe-checkout';
import axios from 'axios';
// import swal from 'sweetalert2';

class CheckOut extends Component {
    constructor(props) {
        super(props)
        this.state = {
            checkByTable: []
        }

        this.onToken=this.onToken.bind(this);

    }
    componentDidMount() {
        this.props.getCheckByTable(this.props.match.params.table)
    }

    onToken(token) {
        token.card = void 0;
        swal({
            title: 'Custom width, padding, background.'
          })
        console.log('token', this.state);
        axios.post('/api/payment', { token, amount: this.props.checkByTable[0], options: this.state} ).then(response => {
            // alert('thanks for your purchase!')
            // swal({
            //     title: null,
            //     text: 'You order is complete!',
            //     type: null,
            //     confirmButtonText: 'Sweeeet!'
            //   })
        });
      }
    
    render() {
        console.log("url", this.props.match.params.table);
        // console.log('its working',this.props.newOrder);
        // console.log(this.props.tableNumber, 'checkout table number');
       console.log('test',this.props.checkByTable);
        return (
            
            <div>

<a href="#" class="a-btn">
	<span class="a-btn-text"><Link className='back-link' to ='/menu'>DevMENU</Link></span> 
	<span class="a-btn-slide-text">Go Back</span>
	<span class="a-btn-icon-right"><span></span></span>
</a>



                <div className='cart-title'> <button className='back'><Link className='back-link' to ='/menu'>Back to menu</Link></button> Cart <div></div></div>
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
                                amount={+this.props.checkByTable[0] * 100}
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
        checkByTable: state.checkByTable,
        newOrder: state.newOrder
    }
}

export default connect(mapStateToProps, {getCheckByTable})(CheckOut);