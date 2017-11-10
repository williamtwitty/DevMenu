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

    markedAsRead(e) {

    }



    render() {
        console.log('test messages admin', this.props.adminOrders);

        let table1 = []
        let table2 = []
        let table3 = []
        let table4 = []
        let table5 = []
        let table6 = []
        let table7 = []
        let table8 = []
        const order = this.props.adminOrders.filter((elem) => {
            console.log(elem, 'ekekd');
            if (elem.table_number === 1) {
                return table2.push(elem)
            
            }
        })
        const tests = this.props.adminOrders.map(test => {
            if (test.table_number === 1) {
                return table1.push(test)
            } else if (test.table_number === 2) {
                return table2.push(test)
            } else if (test.table_number === 3) {
                return table3.push(test)
            } else if (test.table_number === 4) {
                return table4.push(test)
            } else if (test.table_number === 5) {
                return table5.push(test)
            } else if (test.table_number === 6) {
                return table6.push(test)
            } else if (test.table_number === 7) {
                return table7.push(test)
            } else if (test.table_number === 8) {
                return table8.push(test)
            }
            return console.log('hi');
        })

        // console.log('table1', table1);
        // console.log('table2', table2);
        // console.log('table3', table3);
        // console.log('table4', table4);
        // console.log('table5', table5);




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
                        <div className='Orders-container'>
                            <div className='Orders'>
                                <div className='table flex'>TableNumber: { parseInt(message.table, 10) }</div>
                                    <div className='orders'> {
                                    message.message.map((item, i) =>{
                                        return(
                                            <div key={i}className="item">{item}
                                            <button>Read</button>
                                            <button>Completed</button>
                                            </div>
                                        )
                                    })
                                }
                                    </div>
                                </div>
                            </div>
                         </div>
                    )
                })


        var groups = {};

        for (var i = 0; i < this.props.adminOrders.length; i++) {
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
                    <div className='Orders-container'>
                        <div className='Orders'>
                            <div className='table flex'>TableNumber: { parseInt(order.group, 10) }</div>
                            <div className='orders'>
                                {
                                    order.name.map((item, i) => {
                                        return (
                                            <div  key={i} className="item">{item}</div>
                                        )
                                    })
                                }     
                            </div>

                            <div className='btn-totalbox'>
                            <button className='btn'
                                onClick={() => this.props.completedOrder(parseInt(order.group, 10) )}> 
                                Delete </button>
                            </div>
                        </div>
                    </div>
                </div>
            )
        })
        

        return (
            <div>
                <div className="admin-title"> Orders
                    <div className="top">
                    <a href='http://localhost:3030/auth/logout'><button>LOGOUT</button></a>
                    </div>
                </div>
                <div>
                     <div className='newOrders'> {orders} </div>
                    <div className='newOrders'>{messages}</div>
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
