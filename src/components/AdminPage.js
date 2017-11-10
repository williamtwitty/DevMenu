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
            adminMessages: []
        }
    }
    componentDidMount() {
        this.props.getAdminOrders()
        this.props.getAdminMessages()
        adminSocket.on('new customer message', this.props.getAdminMessages)
        adminSocket.on('new item ordered', this.props.getAdminOrders)
    }

    render() {
        console.log('test messages admin', this.props.adminMessages);
        // adminSocket.on('new customer admin', function(table){
        //   //  console.log('new customer sat down at table:', table);
        // })
        var tables = {}
        for (var i = 0; i < this.props.adminMessages.length; i++) {
            var tableNum = this.props.adminMessages[i].table_number
            if (!tables[tableNum]) {
                tables[tableNum] = []
            }
            tables[tableNum].push(this.props.adminMessages[i].message)
        }   
            const tableMessages = []
                for (tableNum in tables) {
                    tableMessages.push({table: tableNum, message: tables[tableNum]})
                }

                const messages = tableMessages.map((message, i) => {
                    return(<div key={i} >
                        {/* <div className='Orders-container'>
                            <div className='Orders'> */}
                                {/* <div className='table'>Chatbox for Table: { parseInt(message.table, 10) }</div>
                                    <div className='orders'> { */}
                                    {message.message.map((item, i) =>{
                                        return(
                                            <div key={i}className="item">{item}
                                            <button>Read</button>
                                            <button>Completed</button>
                                            </div>

                                        )
                                    })
                                }
                                    </div>
                                // </div>
                        //     </div>
                        //  </div>
                    )
                })

///////////////////////////////////////////////////////////////////////////////////////////
        var groups = {};

        for (i = 0; i < this.props.adminOrders.length; i++) {
            var groupName = this.props.adminOrders[i].table_number;
            if (!groups[groupName]) {
                groups[groupName] = [];
            }
            groups[groupName].push(this.props.adminOrders[i].name);
        }
        const myOrders = [];
        for (groupName in groups) {
            myOrders.push({group: groupName, name: groups[groupName]});
        }


        const orders = myOrders.map((order, i) => {
            return( 
                <div key={i} >
                    {/* <div className='Orders-container'>
                        <div className='Orders'> */}
                            {/* <div className='table'>Table Number: { parseInt(order.group, 10) }</div> */}
                            <div className='orders'>
                                {
                                    order.name.map((item, i) => {
                                        return (
                                            <div  key={i} className="item">{item}</div>
                                        )
                                    })
                                }     
                            </div>

                            {/* <div className='btn-totalbox'>
                            <button className='btn'
                                onClick={() => this.props.completedOrder(parseInt(order.group, 10) )}> 
                                Delete </button>
                            </div> */}
                        </div>
                //     </div>
                // </div>
            )
        })

        

        return (
            <div>
                <div className="admin-title"> Orders
                    <div className="top">
                    <a href='http://localhost:3030/auth/logout'><button>LOGOUT</button></a>
                    </div>
                </div>

                <div className="orderChat">
                    <div className='Orders-container'>
                        <div className='Orders'>
                            <div className='table'>Table Number: 1 </div>
                            <div className='orders'>
                                <div className='newOrders'> {orders[0]} </div>
                                <div className='btn-totalbox'>
                                    <button className='btn'
                                     onClick={() => this.props.completedOrder(0)}> 
                                    Complete Order </button>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className='Orders-container'>
                        <div className='Orders'>
                            <div className="table" > Chat for Table Number: 1 </div>
                                <div className='orders'>{messages[0]}</div>
                        </div>
                    </div>
                </div>

                <div className="orderChat">
                    <div className='Orders-container'>
                        <div className='Orders'>
                            <div className='table'>Table Number: 2 </div>
                            <div className='orders'>
                                <div className='newOrders'> {orders[1]} </div>
                                <div className='btn-totalbox'>
                                    <button className='btn'
                                    onClick={() => this.props.completedOrder(1)}> 
                                    Complete Order </button>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className='Orders-container'>
                        <div className='Orders'>
                            <div className="table" > Chat for Table Number: 2 </div>
                                <div className='orders'>{messages[1]}</div>
                            </div>
                        </div>
                    </div>

                 <div className="orderChat">
                    <div className='Orders-container'>
                        <div className='Orders'>
                            <div className='table'>Table Number: 3 </div>
                            <div className='orders'>
                                <div className='newOrders'> {orders[2]} </div>
                                <div className='btn-totalbox'>
                                    <button className='btn'
                                    onClick={() => this.props.completedOrder(2)}> 
                                    Complete Order </button>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className='Orders-container'>
                        <div className='Orders'>
                            <div className="table" > Chat for Table Number: 3 </div>
                            <div className='orders'>{messages[2]}</div>
                        </div>
                    </div>
                 </div>

                    <div className="orderChat">
                        <div className='Orders-container'>
                            <div className='Orders'>
                                <div className='table'>Table Number: 4 </div>
                                <div className='orders'>
                                    <div className='newOrders'> {orders[3]} </div>
                                    <div className='btn-totalbox'>
                                    <button className='btn'
                                    onClick={() => this.props.completedOrder(3)}> 
                                    Complete Order </button>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className='Orders-container'>
                            <div className='Orders'>
                                <div className="table" > Chat for Table Number: 4 </div>
                                    <div className='orders'>{messages[3]}</div>
                            </div>
                        </div>
                    </div>

                    <div className="orderChat">
                        <div className='Orders-container'>
                            <div className='Orders'>
                                <div className='table'>Table Number: 5 </div>
                                <div className='orders'>
                                    <div className='newOrders'> {orders[4]} </div>
                                    <div className='btn-totalbox'>
                                        <button className='btn'
                                        onClick={() => this.props.completedOrder(4)}> 
                                        Complete Order </button>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className='Orders-container'>
                            <div className='Orders'>
                                <div className="table" > Chat for Table Number: 5 </div>
                                    <div className='orders'>{messages[4]}</div>
                            </div>
                        </div>
                    </div>

                    <div className="orderChat">
                        <div className='Orders-container'>
                            <div className='Orders'>
                                <div className='table'>Table Number: 6 </div>
                                <div className='orders'>
                                    <div className='newOrders'> {orders[5]} </div>
                                    <div className='btn-totalbox'>
                                        <button className='btn'
                                        onClick={() => this.props.completedOrder(5)}> 
                                        Complete Order </button>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className='Orders-container'>
                            <div className='Orders'>
                                <div className="table" > Chat for Table Number: 6 </div>
                                    <div className='orders'>{messages[5]}</div>
                            </div>
                        </div>
                    </div>

                    <div className="orderChat">
                        <div className='Orders-container'>
                            <div className='Orders'>
                                <div className='table'>Table Number: 7 </div>
                                <div className='orders'>
                                    <div className='newOrders'> {orders[6]} </div>
                                    <div className='btn-totalbox'>
                                        <button className='btn'
                                        onClick={() => this.props.completedOrder(6)}> 
                                        Complete Order </button>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className='Orders-container'>
                            <div className='Orders'>
                                <div className="table" > Chat for Table Number: 7 </div>
                                    <div className='orders'>{messages[6]}</div>
                            </div>
                        </div>
                    </div>

                    <div className="orderChat">
                        <div className='Orders-container'>
                            <div className='Orders'>
                                <div className='table'>Table Number: 8 </div>
                                <div className='orders'>
                                    <div className='newOrders'> {orders[7]} </div>
                                    <div className='btn-totalbox'>
                                        <button className='btn'
                                        onClick={() => this.props.completedOrder(7)}> 
                                        Complete Order </button>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className='Orders-container'>
                            <div className='Orders'>
                                <div className="table" > Chat for Table Number: 8 </div>
                                    <div className='orders'>{messages[7]}</div>
                            </div>
                        </div>
                    </div>
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
