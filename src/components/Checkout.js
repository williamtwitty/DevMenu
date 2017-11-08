import React, { Component } from 'react';
import { connect } from 'react-redux';
import { getCheckByTable } from '../ducks/reducer';
import {deleteItem} from '../ducks/reducer'
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
 
    sendEmail() {
        axios.post('/api/sendEmail', {
          'email': this.state.email,
          'message': this.state.message
        }).catch((err) => {
          console.log(err);
          alert('Email Sent!', err);
        })
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
                      <div className='cart-delete' onClick={()=> this.props.deleteItem(item.id, this.props.match.params.table)} > X </div>
                      <div className='cart-img-box'><img src={item.image} alt="punk" className="punks"/> </div>
                      <div className='cart-product'> 
                          <div> {item.name} </div>
                      </div>
                      <div className='cart-price'>{item.price} </div>
                  </div>
                 ) 
              })
        } else{
             orderList = []
        }
        // console.log("url", this.props.match.params.table);
        // console.log("checkbytable", this.props.checkByTable)


        let receiptList = []
        if (this.props.checkByTable[1]) {
             receiptList = this.props.checkByTable[1].map((item, i)=>{
                return  (
                      
                      <div className='receipt-item' key={i}>
                        
                        <div className='receipt-product'> 
                            <div> {item.name} </div>
                        </div>
    
                      <div className='receipt-price'>{item.price} </div>
                  </div>
                 ) 
              })
        } else{
             receiptList = []
        }
      
        return (
            
            <div>
                <button className='back'><Link className='back-link' to ='/menu'>Back to menu</Link></button> 
                <div className= 'top'>
                        <div className='dev'>Fullstack Co.</div>
                   <div className='fork'>
                    <img src='http://renewecoblasting.com/wp-content/uploads/2016/05/blackline.png' width='15%' height='3%'alt=""/> 
                    &nbsp; &nbsp;
                    <img src ='http://www.clker.com/cliparts/A/D/6/r/B/X/gray-silverware-hi.png' width='3%' height='5%'alt=""/>
                    &nbsp; &nbsp;
                    <img src='http://renewecoblasting.com/wp-content/uploads/2016/05/blackline.png' width='15%' height='3%' alt=""/>
                    </div>
                </div>

                <div className='cart-title'> 
                    <div></div>
                        <div> Checkout </div>
                       
                    </div>
                <div className='cart-container'>
                    <div className='cart-titles'>
                        <div className='Product'>Product</div>
                        <div className='Price'>Price</div>
                    </div>
                 {orderList}
                    <div className='cart-coupon'>
                      
                        <input className='coupon-code' placeholder='&nbsp; Coupon code'></input>
                        <button className='apply-coupon'>Apply Coupon</button>
                    </div>
                    <div className='Totals-container'>
                        <div className='TOTALS'>
                            <div className='cart-total-title flex'>Total</div>
                            <div className='subtotal flex'>
                                <div className="sub">Subtotal</div>
                            </div>
                            <div className='receipt'>{receiptList}</div>
                            <div className='total'>
                                <div className="sub">{this.props.checkByTable[0]}</div>
                          
                            </div>
                            <div className='btn-totalbox'>
                                <div className="email-box">
                                    <div className="email">Email your receipt</div>
                                    <input className="email" placeholder="enter email"/>
                                </div>

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

export default connect(mapStateToProps, {getCheckByTable, deleteItem})(CheckOut);