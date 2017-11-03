import React, { Component } from 'react';
import { connect } from 'react-redux'
import { getAdminOrders } from '../ducks/reducer'

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
        console.log(this.props.adminOrders);
        const orders = this.props.adminOrders.map((order) => {
           return( <div>
            <div>TableNumber: {order.table_number}</div>
            <div>Food: {order.name}</div> 
           </div>
           )
        })
        return (
            <div>
                <div>
                    haley
                    <a href='http://localhost:3030/auth/logout'><button>LOGOUT</button></a>
                </div>
                {orders}
            </div>
        );
    }
}
function mapStateToProps(state){
    return {
        adminOrders: state.adminOrders
    }
}

export default connect(mapStateToProps, {getAdminOrders})(Admin);
