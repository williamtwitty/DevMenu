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
        console.log("menu bladgfoSIJD",this.props.menu);
        const item = this.props.menu.map((type)=>{
                   // console.log(type);
            //this.props.newOrder(item.id, this.props.tableNumber)
            return(
                //<div>{type.name}</div>
               
                <FoodItems key={type.name} type={type}/>          
            )
        })
        return (
            <div>
                <div className='title'>DevMENU</div>
                    <div className='Nav'>
                        <div className='nav-container'>
                            <div className='drinks'><Link to ='/drinks'>Drinks</Link></div>
                            <div className='drinks'><Link to ='/appetizers'>Appetizers</Link></div>
                            <div className='drinks'><Link to ='/salads'>Salads</Link></div>
                            <div className='drinks'><Link to ='/entrees'>Entrees</Link></div>
                            <div className='drinks'><Link to ='/desserts'>Desserts</Link></div>
                        </div>
                    </div>
                        <div><Link to ={`/checkout/${this.props.tableNumber}`}>Checkout</Link></div>
                    <div className='space'>
                        <div className='foods'>
                            {item}
                        </div>
                    </div>
                </div>
          
        )
    }
}
function mapStateToProps(state){
    return {
        menu: state.menu,
        tableNumber: state.tableNumber
    }
}

export default connect(mapStateToProps,{getMenuType, newOrder})(MenuItems);