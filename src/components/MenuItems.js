import React, { Component } from 'react';
import { connect } from 'react-redux'
import axios from 'axios'
import { getMenuType } from '../ducks/reducer'

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
                <div>{type.name}</div>
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
<<<<<<< HEAD

                <div>
                    <FoodItems/>
                </div>

=======
                {item}
>>>>>>> master
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
