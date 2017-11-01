import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { FoodItems } from './FoodItems';

class Menu extends Component {
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

export default Menu;