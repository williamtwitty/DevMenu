import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux'

class Menu extends Component {
    constructor(props) {
        super(props)
        this.state = {
            
        }
    }



    render() {
        return (
            <div className='Wrap-Menu'>
               <div className='dessert111'>
                    <div className='dessert1'><Link to ='/item'>Drinks</Link></div>
                    <div className='dessert2'><Link to ='/item'>Appetizers</Link></div>
                    <div className='dessert3'><Link to ='/item'>Salads</Link></div>
                    <div className='dessert4'><Link to ='/item'>Entrees</Link></div>
                    <div className='dessert5'><Link to ='/item'>Desserts</Link></div>
               </div>
            </div>
        );
    }
}

function mapStateToProps(state){
    return {

    }
}

export default connect(mapStateToProps)(Menu);