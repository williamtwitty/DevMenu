import React, { Component } from 'react';
import { connect } from 'react-redux';
import FoodItems from './FoodItems';
import { getMenuType } from '../ducks/reducer';
import {newOrder} from '../ducks/reducer';
import { Link } from 'react-router-dom';


class MenuItems extends Component {
    constructor(props){
        super(props)
       this.state = {
           menu: []
       }
    }
   
    componentDidMount(){
        this.props.getMenuType(this.props.match.params.type)
   } 


   componentWillUpdate() {
    this.props.getMenuType(this.props.match.params.type)
   }

    render() {
        // console.log("menu bladgfoSIJD",this.props.menu);
        const item = this.props.menu.map((type)=>{
                   // console.log(type);
            //this.props.newOrder(item.id, this.props.tableNumber)
            return(
                //<div>{type.name}</div>
               <div className='fooditemsbox'>
                <FoodItems key={type.name} type={type}/>     
                </div>     
            )
        })
        return (
            <div className='full'>
                <div className='title'>Fullstack Co.</div>
                    <div className='Nav'>
                        <div className='nav-container'>
                            <div className='drinks'><Link className='linkk' to= '/drinks'>Drinks</Link></div>

                            <div className='apps'><Link className='linkk' to ='/appetizers'>Appetizers</Link></div>

                            <div className='entrees'><Link className='linkk' to ='/entrees'>Entrees</Link></div>

                            <div className='desserts'><Link className='linkk' to ='/desserts'>Desserts</Link></div>
                        </div>
                    </div>
                        <div className='checkoutbutton'><Link to ={`/checkout/${this.props.tableNumber}`}>Checkout</Link></div>
                    <div className='space'>
                        <div className='foods'>
                            {item}
                        </div>
                    </div>
                </div>
            
        ); 
    }
}
function mapStateToProps(state){
    return {
        menu: state.menu,
        tableNumber: state.tableNumber
    }
}

export default connect(mapStateToProps,{getMenuType, newOrder})(MenuItems);