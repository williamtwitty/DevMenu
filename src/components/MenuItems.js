import React, { Component } from 'react';
import { connect } from 'react-redux';
import FoodItems from './FoodItems'
import { getMenuType } from '../ducks/reducer';
import {newOrder} from '../ducks/reducer'


class MenuItems extends Component {
    constructor(){
        super()
       this.state={
           menu: []
       }
    }
   
    componentDidMount(){
        this.props.getMenuType(this.props.match.params.type)
   } 
    render() {
        console.log("menu bladgfoSIJD",this.props.tableNumber);
        const item = this.props.menu.map((type)=>{
                    console.log(type);
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
                        <div className='drinks'>Drinks</div>
                        <div className='drinks'>Appetizers</div>
                        <div className='drinks'>Salads</div>
                        <div className='drinks'>Entrees</div>
                        <div className='drinks'>Desserts</div>
                    </div>
                </div>
                {item}
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
