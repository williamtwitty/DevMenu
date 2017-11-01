import React, { Component } from 'react';
import { Link } from 'react-router-dom';


class Menu extends Component {


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

export default Menu;