import React, { Component } from 'react';
import axios from 'axios'

class MenuItems extends Component {
    constructor(){
        super()
       this.state={
           menu: []
       }
    }
   
    componentDidMount(){
       axios.get(`/api/${this.props.match.params.type}`).then( response => {
           console.log(response)
           this.setState({
               menu: response.data
           })
       })
   } 
    render() {
        const menu = this.state.menu.map((type)=>{
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
                {menu}
            </div>
        );
    }
}

export default MenuItems;