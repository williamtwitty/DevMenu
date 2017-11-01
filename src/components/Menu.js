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
                    <div className='dessert1'><Link to ='/drinks'>Drinks</Link></div>
                    <div className='dessert2'><Link to ='/appetizers'>Appetizers</Link></div>
                    <div className='dessert3'><Link to ='/salad'>Salads</Link></div>
                    <div className='dessert4'><Link to ='/entree'>Entrees</Link></div>
                    <div className='dessert5'><Link to ='/dessert'>Desserts</Link></div>
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