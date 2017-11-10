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
            list: [],
          
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

    
        
   

 
    // sendEmail() {
    //     axios.post('/api/sendEmail', {
    //       'email': this.state.email,
    //       'message': this.state.message
    //     }).catch((err) => {
    //       console.log(err);
    //       alert('Email Sent!', err);
    //     })
    //   }

    
  
 
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
        console.log(this.state.coupon)
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

        let total = 0
        if (this.props.checkByTable[1]){
            
            total = this.props.checkByTable[1].reduce((sum, item)=>{
                 return sum + (parseFloat (item.price,10))
                 
             },0)
             
            console.log(total)          
        } 
      
      
        return (
            
            <div>
                <ChatBox table={this.props.match.params.table}/>
                <div className='cart-title'> <button className='back'><Link className='back-link' to ='/menu'>Back to menu</Link></button> Cart <div></div></div>
                <div className='cart-container'>
                    <div className='cart-titles'>
                        <div className='Product'>Product</div>
                        <div className='Price'>Price</div>
                    </div>
                 {orderList}
                    <div className='cart-coupon'>
                      
                        <input className='coupon-code' placeholder='&nbsp; Coupon code' 
                        value = {this.state.input}
                        onChange={(e)=>{this.handleCoupon(e.target.value)}}></input>
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
                                <div className="sub">
                                {total}
                                {/* {this.props.checkByTable[0]} */}
                                </div>
                          
                            </div>
                            <div className='btn-totalbox'>
                                <div className="email-box">
                                    <div className="email" onClick={()=>{this.validateEmail(this.state.email)}}>Email your receipt</div>
                                    <input className="email" placeholder="enter email"  value = {this.state.email}
                        onChange={(e)=>{this.handleEmail(e.target.value)}}/>
                                {/* <Mailer/> */}
                                <div className='formContainer'>
                                    Email Receipt
                                    <input type='text' placeholder='Email' onChange={(e)=>{
                                        this.handleEmail(e.target.value)}}/>

                                    <button className='submit' onClick={()=>{
                                        this.sendEmail()
                                    }}>send receipt</button>
                                </div>
                                    
                                </div>

                                <StripeCheckout
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