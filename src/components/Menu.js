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
                    <Link to ='/salads' className='MenuEntrees'>ENTREES</Link>
                    <Link to ='/desserts' className='MenuDesserts'>DESSERTS</Link>
                </div>
                <div className='top-Menu'>
                    <Link to='/drinks' className='MenuDrinks1'>DRINKS</Link>
                    <Link to ='/appetizers'className='MenuAppetizers1'>APPETIZERS</Link>
                    <Link to ='/salads' className='MenuEntrees1'>ENTREES</Link>
                    <Link to ='/desserts' className='MenuDesserts1' >DESSERTS</Link>
                    <Link to='/specials' className='MenuSpecials'>OUR SPECIALS</Link>
                </div>
            <div className='Wrap-Menu'>
                {/* <div className= 'top'>
                    <div className='top-border'>
                    <img src="https://imgur.com/0McTeHf.jpg	" alt="" width='300px' height='300px'/>
                    <div className='top-border2'> 
                        <div className='dev'>Fullstack Co.</div>
                   <div className='fork'>
                    <img src='http://renewecoblasting.com/wp-content/uploads/2016/05/blackline.png' width='15%' height='3%'alt=""/> 
                    &nbsp; &nbsp;
                    <img src ='http://www.clker.com/cliparts/A/D/6/r/B/X/gray-silverware-hi.png' width='3%' height='5%'alt=""/>
                    &nbsp; &nbsp;
                    <img src='http://renewecoblasting.com/wp-content/uploads/2016/05/blackline.png' width='15%' height='3%' alt=""/>
                    </div>
                    </div>
                    </div>
                </div> */}
                {/* <div className='top2'>
               <div className='dessert111'>
                    <div className='dessert1'><Link className='Link-menu' to='/drinks'>Drinks</Link></div>
                    <div className='dessert2'><Link className='Link-menu' to ='/appetizers'>Appetizers</Link></div>
                    <div className='dessert3'><Link className='Link-menu' to ='/salads'>Salads</Link></div>
                    <div className='dessert4'><Link className='Link-menu' to ='/entrees'>Entrees</Link></div>
                    <div className='dessert5'><Link className='Link-menu' to ='/desserts'>Desserts</Link></div>
               </div>
               <div className='dessert1111'>
                    <div className='dessert11'><Link className='Link-menu' to='/drinks'>Drinks</Link></div>
                    <div className='dessert21'><Link className='Link-menu' to ='/appetizers'>Appetizers</Link></div>
                    <div className='dessert31'><Link className='Link-menu' to ='/salads'>Salads</Link></div>
                    <div className='dessert41'><Link className='Link-menu' to ='/entrees'>Entrees</Link></div>
                    <div className='dessert51'><Link className='Link-menu' to ='/desserts'>Desserts</Link></div>
               </div>
               </div> */}
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