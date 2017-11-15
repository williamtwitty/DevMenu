import React, { Component } from 'react';
import { connect } from 'react-redux';
import {newOrder} from '../ducks/reducer';

class FoodItems extends Component {
  render() {
    const {type} = this.props
    
    return (
      <div className="food-container">
                <div className="food-together">
                  <div className="food-img">
                  <img className='foodItems-img'src={type.image} alt=""/>
                  </div>
                  <div className="food-info">
                    <div className="food-title">{type.name}</div>
                    <div className="food-desc">{type.details}&nbsp; &nbsp;{type.price}</div>
                    <div className="food-to-cart">
                      <button className="btn-cart" onClick={()=>this.props.newOrder(type.id, this.props.tableNumber)}>ORDER </button> &nbsp; &nbsp;
                    </div>
                  </div>
                </div>
              </div>
    )
  }
}

function mapStateToProps(state){
  return {
      tableNumber: state.tableNumber,
  }
}

export default connect(mapStateToProps,{ newOrder})(FoodItems);
