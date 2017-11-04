import React, { Component } from 'react';
import { connect } from 'react-redux';
import { getAdminOrders, completedOrder } from '../ducks/reducer';

class Admin extends Component {
    constructor(props) {
        super(props)
        this.state = {
            adminOrders: []
        }
    }
    componentDidMount() {
        this.props.getAdminOrders()
    }

    render() {
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
        // console.log('groups', groups);
        // console.log('myOrders', myOrders);

        const orders = myOrders.map((order, i) => {
            return( 
                <div key={i} >
                    <div className='Orders-container'>
                        <div className='Orders'>
                            <div className='order-title flex'>Orders</div>
                            <div className='table flex'>TableNumber: { parseInt(order.group) + 1 }</div>
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
                                onClick={() => this.props.completedOrder(parseInt(order.group) )}> 
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
                <div className='newOrders'> {orders} </div>
            </div>
        );
    }
}
function mapStateToProps(state){
    return {
        adminOrders: state.adminOrders
    }
}

export default connect(mapStateToProps, {getAdminOrders, completedOrder})(Admin);
