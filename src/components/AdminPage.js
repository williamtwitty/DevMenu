import React, { Component } from 'react';
import { connect } from 'react-redux';
import { getAdminOrders, completedOrder, getAdminMessages, adminMessageRead, adminMessageCompleted } from '../ducks/reducer';
import io from 'socket.io-client';

 const adminSocket = io('/admin', {forceNew: true});

class Admin extends Component {
    constructor(props) {
        super(props)
        this.state = {
            adminOrders: [],
            adminMessages: [],
            tables: [1,2,3,4,5,6,7,8]
        }
        this.handleOnClick=this.handleOnClick.bind(this);
    }
    componentDidMount() {
        this.props.getAdminOrders()
        this.props.getAdminMessages()
        adminSocket.on('new customer message', this.props.getAdminMessages)
        adminSocket.on('new item ordered', this.props.getAdminOrders)
        adminSocket.on('marked as read', this.props.getAdminMessages)
        adminSocket.on('message completed', this.props.getAdminMessages)
    }

    handleOnClick() {
        this.props.getAdminOrders()
    }

render() {

const eachTable = this.state.tables.map((table) => {
    return( <div key={table} className="orderChat">
    <div>
        <div className="Orders-container">
            <div className="Orders">
                <div className="table"> Table Number: {table}</div>
                <div className="orders">{this.props.adminOrders.filter(order=>{
                    if (order.table_number === table) {
                        return order
                        }
                        }).map((order) => {
                            return(<div key={order.id} className="item">{order.name}</div>
                            
                        )})
                    }</div>
                    <div className="btn-totalbox"> 
                        <button className="btn" onClick={() => {this.props.completedOrder(table), this.handleOnClick()}}>Complete Order</button> 
                    </div>
            </div>
        </div> 
        </div>
        <div className="Orders-container">
            <div className="Orders">
              <div className="table">Messages for table: {table}</div> 
                <div className="orders">{this.props.adminMessages.filter(message => {
                    if (message.table_number === table) {
                        return message
                    }
                }).map((message)=> {
                    return <div key={message.id} className="item">
                    {message.has_been_read ? <div style={{color: 'green'}}>{message.message}</div> : <div style={{color: 'red'}}>{message.message}</div>}
                                <div>
                                    <button onClick={() => this.props.adminMessageRead(message.id, message.table_number)}>Read</button>
                                    <button onClick={() => this.props.adminMessageCompleted(message.id, message.table_number)}>Completed</button>
                                </div>
                            </div>
                    }) 
                }</div>
            </div>
        </div>
    </div>
)})


        console.log('test messages admin', eachTable);

        return (
            <div>
                <div className="admin-title"> Orders
                    <div className="top">
                    <a href={process.env.SERVERHOST_LOGOUT}><button>LOGOUT</button></a>
                    </div> 
                </div>
                    <div>{eachTable}</div>
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

export default connect(mapStateToProps, {getAdminOrders, completedOrder, getAdminMessages, adminMessageRead, adminMessageCompleted})(Admin);
