import React, { Component } from 'react';
import { connect } from 'react-redux';
import axios from 'axios';
import { getMenuType } from '../ducks/reducer';


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
        const item = this.props.menu.map((type)=>{
            return(
                //<div>{type.name}</div>
                <div className='contain'>
                <div className="food-container">
                <div className="food-together">
                  <div className="food-img">
                  <img src={type.image} width='400px' height='300px' />
                  </div>
                  <div className="food-info">
                    <div className="food-title">{type.name}</div>
                    <div className="food-desc">{type.details}</div>
                    <div className="food-to-cart">
                      <button className="btn-cart">Add to cart </button> &nbsp; &nbsp; {type.price}
                    </div>
                  </div>
                </div>
              </div>
              </div>
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
        menu: state.menu
    }
}

export default connect(mapStateToProps, {getMenuType})(MenuItems);
