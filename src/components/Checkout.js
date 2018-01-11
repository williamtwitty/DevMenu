import React, { Component } from 'react';
import { connect } from 'react-redux';
import { getCheckByTable } from '../ducks/reducer';
import {deleteItem} from '../ducks/reducer'
import { Link } from 'react-router-dom';
import Footer from '../components/Footer';
import StripeCheckout from 'react-stripe-checkout';
import axios from 'axios';
import ChatBox from './ChatBox'
import util from '../util/util'
// import swal from 'sweetalert2';
class CheckOut extends Component {
    constructor(props) {
        super(props)
        this.state = {
            checkByTable: [],
            code : 'DEV',
            input: '',
            coupon: false,
            email: '',
       }
     this.onToken=this.onToken.bind(this);
    }
   
    componentDidMount() {
        this.props.getCheckByTable(this.props.match.params.table)
    }

    handleCoupon(e){
        this.setState({
            input: e
        })}
    sendEmail() {
        axios.post('/api/sendEmail', {
          'email': this.state.email,
          'receipt': this.props.checkByTable
        }).catch((err) => {
          console.log(err);
          alert('Email Sent!', err);
        })
    }

    coupon(e){
        if(util.coupon(e, this.state.code)){
           this.setState({
                input: '',
                coupon : true
            })
        } else {
            alert ('invalid code')
        }
    }

    handleEmail(bob){
        this.setState({
            email: bob
        })
    }
     
    validateEmail(mail)   
    {  
     if (util.validateEmail(mail))  
      {  
        return (true)  
      }  
        alert("You have entered an invalid email address!")  
        return (false)  
    } 


    onToken(token) {
       token.card = void 0;
       axios.post('/api/payment', { token, amount: this.props.checkByTable[0], options: this.state} ).then(response => {
        });
      }
    
    render() {
     
      //====================Order List===============================//  
        let orderList = []
        if (this.props.checkByTable[1]) {
             orderList = this.props.checkByTable[1].map((item, i)=>{
                return  ( 
                 <div className='cart-item' key={i}>
                      <div className='cart-delete' onClick={()=> this.props.deleteItem(item.id, this.props.match.params.table)} > <img src='https://imgur.com/6X17pRk.jpg' width='20px' height='20px' alt='delete'/> </div>
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
      
 //=============================Reciept==================================//   
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
        
  //=========================reciept total================================//

        let total = 0
        if (this.props.checkByTable[1]){
            
            total = util.reduceArr(this.props.checkByTable[1])
            util.checkArr(this.props.checkByTable[1])
        } if(this.state.coupon === true){
           total= util.discount(total)
        }
        return (
            
          <div className='CART'>
            <div className='cart-title'>  Cart <div>
                </div>
                <div className='cartandreceipt'>
                <div className='cart-container'>
                    <div className='cart-titles'>
                        <div className='Product'>Product</div>
                        <div className='Price'>Price</div>
                    </div>

                 {orderList}

                    <div className='cart-coupon'>
                      <input className='coupon-code' placeholder='&nbsp; Coupon code' 
                        value = {this.state.input}
                        onChange={(e)=>{this.handleCoupon(e.target.value)}}>
                      </input>
                      <button onClick={()=>{this.coupon(this.state.input)}} className='apply-coupon'>Apply Coupon</button>
                    </div>

                    <div className='Totals-container'>
                        <div className='TOTALS'>
                            <div className='cart-total-title flex'>Total</div>
                              <div className='subtotal flex'>
                                 <div className="sub">Subtotal</div>
                              </div>
                            <div className='receipt'>{receiptList}</div>
                          <div className='total'>
                            <div className="sub">{total}</div>
                          </div>

//=======================================Email=========================================================//
                            <div className='btn-totalbox'>
                                <div className="email-box">
                                <div className='formContainer' >
                                   <div className='formContainer' onClick={()=>{this.validateEmail(this.state.email)}}>Email Receipt</div> 
                                    <input type='text' 
                                           placeholder='Email' 
                                           onChange={(e)=>{this.handleEmail(e.target.value)}}/>
                                    <button className='submit' onClick={()=>{this.sendEmail()}}>send receipt</button>
                                   </div>
                                </div>

//=======================================Stripe=========================================================//
                                <StripeCheckout className="stripe"
                                token={this.onToken}
                                stripeKey={ process.env.REACT_APP_STRIPE_SECRETKEY }
                                amount={+this.props.checkByTable[0] * 100}
                                />
                            </div>
                        </div>

                        <div className='CHATBOX'>
                        <div className="container">
                            <div className="container-contained">
                                <div className='chatbox'>
                                <ChatBox table={this.props.match.params.table}/>
                                </div>
                            </div>
                        </div>
                        </div>
                    </div>
                 
                <div className='empty-space'> </div>
                </div>
                <div className='secondreceiptbox'> &nbsp;</div>
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
