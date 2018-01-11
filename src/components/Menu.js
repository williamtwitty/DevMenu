import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';

class Menu extends Component {
    constructor(props) {
        super(props)
        this.state = {
    
        }
    }    

render() {
          
        return (
            <div className='menu-page'>
                <div className='bottom-Menu'>
                    <Link to='/drinks' className='MenuDrinks'>DRINKS</Link>
                    <Link to ='/appetizers'className='MenuAppetizers'>APPETIZERS</Link>
                    <Link to ='/entrees' className='MenuEntrees'>ENTREES</Link>
                    <Link to ='/desserts' className='MenuDesserts'>DESSERTS</Link>
                </div>
                <div className='top-Menu'>
                    <Link to='/drinks' className='MenuDrinks1'>DRINKS</Link>
                    <Link to ='/appetizers'className='MenuAppetizers1'>APPETIZERS</Link>
                    <Link to ='/entrees' className='MenuEntrees1'>ENTREES</Link>
                    <Link to ='/desserts' className='MenuDesserts1' >DESSERTS</Link>
                    <Link to='/specials' className='MenuSpecials'>OUR SPECIALS</Link>
                </div>
            <div className='Wrap-Menu'>
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
