import React, { Component } from 'react';
import { connect } from 'react-redux'

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
            </div>
        );
    }
}
function mapStateToProps(state){
    return {

    }
}

export default connect(mapStateToProps)(MenuItems);
