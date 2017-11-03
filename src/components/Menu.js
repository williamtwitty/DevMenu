import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
// import { getMenuType } from '../ducks/reducer';
// import io from 'socket.io-client';
// const socket = io('http://localhost:3030');


class Menu extends Component {
    constructor(props) {
        super(props)
        this.state = {
    
        }
    }

    render() {
        console.log( this.props.tableNumber)
        return (
            <div className='Wrap-Menu'>
               <div className='dessert111'>
                    <div className='dessert1'><Link to ='/drinks'>Drinks</Link></div>
                    <div className='dessert2'><Link to ='/appetizers'>Appetizers</Link></div>
                    <div className='dessert3'><Link to ='/salads'>Salads</Link></div>
                    <div className='dessert4'><Link to ='/entrees'>Entrees</Link></div>
                    <div className='dessert5'><Link to ='/desserts'>Desserts</Link></div>
               </div>
            </div>
        );
    }
}

function mapStateToProps(state){
    return {
        tableNumber: state.tableNumber
    }
}

export default connect(mapStateToProps)(Menu);