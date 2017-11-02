import React, { Component } from 'react';
import { connect } from 'react-redux';
import axios from 'axios';
import { getMenuType } from '../ducks/reducer';
import { Link } from 'react-router-dom';


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

            //this.props.newOrder(item.id, this.props.tableNumber)
            return(
            <div>
                <div className="food-container">
                <div className="food-together">
                  <div className="food-img">
                  <img src={type.image} width='380px' height='300px' alt='' />
                  </div>
                  <div className="food-info">
                    <div className="food-title">{type.name}</div>
                    <div className="food-desc">{type.details}</div>
                    <div className="food-to-cart">
                      <button className="btn-cart">ORDER </button> &nbsp; &nbsp; {type.price}
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
                        <div className='drinks'><Link to ='/drinks'>Drinks</Link></div>
                        <div className='drinks'><Link to ='/appetizers'>Appetizers</Link></div>
                        <div className='drinks'><Link to ='/salads'>Salads</Link></div>
                        <div className='drinks'><Link to ='/entrees'>Entrees</Link></div>
                        <div className='drinks'><Link to ='/desserts'>Desserts</Link></div>
                    </div>
                </div>
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
        menu: state.menu
    }
}

export default connect(mapStateToProps, {getMenuType})(MenuItems);
