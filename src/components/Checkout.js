import React, { Component } from 'react';
import { connect } from 'react-redux';
import { getCheckByTable } from '../ducks/reducer';
import {deleteItem} from '../ducks/reducer'
import { Link } from 'react-router-dom';
import Footer from '../components/Footer';
import StripeCheckout from 'react-stripe-checkout';
import axios from 'axios';
import ChatBox from './ChatBox'
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

        // var forEach = function (array, callback, scope) {
        //     for (var i = 0; i < array.length; i++) {
        //       callback.call(scope, i, array[i]);
        //     }
        //   };
          
        //   var containers = document.querySelectorAll(".container");
          
        //   forEach(containers, function(index, value) {
        //     value.addEventListener("click", function() {
        //       this.classList.toggle("alert-is-shown");
        //     });
        //   });
      
        return (
            <div className='Checkout'>
                <div className='cart-title'> <button className='back'><Link className='back-link' to ='/menu'>Back to menu</Link></button> Cart <div></div></div>
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
                            <div className='cart-total-title flex'>Cart Totals</div>
                            <div className='subtotal flex'>
                                <div className="sub">Subtotal</div>
                            </div>
                            <div className='receipt'>{receiptList}</div>
                            <div className='total'>
                                <div className="sub">{this.props.checkByTable[0]}</div>
                          
                            </div>
                            <div className='btn-totalbox'>
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