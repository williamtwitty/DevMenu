import React, { Component } from 'react';
import { connect } from 'react-redux';
import { getAdminOrders, completedOrder, getAdminMessages } from '../ducks/reducer';
import io from 'socket.io-client';

 const adminSocket = io('/admin');

class Admin extends Component {
    constructor(props) {
        super(props)
        this.state = {
            adminOrders: [],
            adminMessages: [],
            tables: [1,2,3,4,5,6,7,8]
        }
    }
    componentDidMount() {
        this.props.getAdminOrders()
        this.props.getAdminMessages()
        adminSocket.on('new customer message', this.props.getAdminMessages)
        adminSocket.on('new item ordered', this.props.getAdminOrders)
    }

    markedAsRead(e) {

    }

    

    render() {

        const eachTable = this.state.tables.map((table) => {
            return <div key={table} className="Orders-container">{table}
                        <div>{this.props.adminOrders.filter(order=>{
                             if (order.table_number === table) {
                                 return order
                             }
                         }).map((order) => {
                           return <div key={order.id} className="item">{order.name}</div>
                })
                }</div>Messages for table: {table}
                <div>{this.props.adminMessages.filter(message => {
                    if (message.table_number === table) {
                        return message
                    }
                }).map((message)=> {
                    return <div key={message.id}>{message.message}</div>
                }) 
                }</div>
            </div>
        })


        console.log('test messages admin', eachTable);






        // const orders = myOrders.map((order, i) => {

        //     return( 
        //         <div key={i} >
        //             <div className='Orders-container'>
        //                 <div className='Orders'>
        //                     <div className='table flex'>TableNumber: { parseInt(order.group, 10) }</div>
        //                     <div className='orders'>
        //                         {
        //                             order.name.map((item, i) => {
        //                                 return (
        //                                     <div  key={i} className="item">{item}</div>
        //                                 )
        //                             })
        //                         }     
        //                     </div>

        //                     <div className='btn-totalbox'>
        //                     <button className='btn'
        //                         onClick={() => this.props.completedOrder(parseInt(order.group, 10) )}> 
        //                         Delete </button>
        //                     </div>
        //                 </div>
        //             </div>
        //         </div>
        //     )
        // })
        

        return (
            <div>
                <div className="admin-title"> Orders
                    <div className="top">
                    <a href='http://localhost:3030/auth/logout'><button>LOGOUT</button></a>
                    </div>
                </div>
                    <div className='newOrders'>{eachTable}</div>
                </div>
          
        );
    }
}
function mapStateToProps(state){
    return {
        adminOrders: state.adminOrders,
        adminMessages: state.adminMessages
    }
}

export default connect(mapStateToProps, {getAdminOrders, completedOrder, getAdminMessages})(Admin);
