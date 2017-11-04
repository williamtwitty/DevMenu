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
        // console.log('token', this.state);
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
        let orderList = []
        if (this.props.checkByTable[1]) {
             orderList = this.props.checkByTable[1].map((item, i)=>{
                return  (
                      
                      <div className='cart-item' key={i}>
                      <div className='cart-delete'> X </div>
                      <div className='cart-img-box'><img src={item.image}/> </div>
                      <div className='cart-product'> 
                          <h1> {item.name} </h1>
                          <button className='edit-options'> Edit Options</button>
                      </div>
                      <div className='cart-price'>{item.price} </div>
                      <div className='cart-quantity'> <input></input> </div>
                      <div className='cart-total'> </div>
                  </div>
                 ) 
              })
        } else{
             orderList = []
        }
        // console.log("url", this.props.match.params.table);
        console.log("checkbytable", this.props.checkByTable)
      
        return (
            
            <div>


                <div className='cart-title'> <button className='back'><Link className='back-link' to ='/menu'>Back to menu</Link></button> Cart <div></div></div>
                <div className='cart-container'>
                    <div className='cart-titles'>
                        <div className='Product'>Product</div>
                        <div className='Price'>Price</div>
                        <div className='Quantity'>Quantity</div>
                        <div className='Total'>Total</div>
                    </div>
                 {orderList}
                    <div className='cart-coupon'>
                      
                        <input className='coupon-code' placeholder='&nbsp; Coupon code'></input>
                        <button className='apply-coupon'>Apply Coupon</button>
                    </div>
                    <div className='Totals-container'>
                        <div className='TOTALS'>
                            <div className='cart-total-title flex'>Cart Totals</div>
                            <div className='subtotal flex'>Subtotal</div>
                            <div className='receipt'>Receipt</div>
                            <div className='total flex'>{this.props.checkByTable[0]}
                          
                            </div>
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