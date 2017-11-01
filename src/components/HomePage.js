import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux'

class HomePage extends Component {
    constructor(props) {
        super(props)
        this.state = {
            
        }
    }



    render() {
        return (
            <div className='HomePage-container'>
                    <div>
                        <a href={process.env.REACT_APP_LOGIN}><button className='Login'>Log-in</button></a>
                        </div>
                <div className='HomePage'>
                <div className='menu-access'>
                    <div className='home-title'>DevMENU</div>
                    <div className='chooseTable'>Choose Your Table</div>
                    <div className='tableInput'>
                    <select className='home-input'>
                        <option value='1'>1</option>
                        <option value='2'>2</option>
                        <option value='3'>3</option>
                        <option value='4'>4</option>
                        <option value='5'>5</option>
                        <option value='6'>6</option>
                        <option value='7'>7</option>
                    </select>
                    <button className='next-btn'> <Link to = '/menu'>  orders</Link> </button>
                    </div>
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

export default connect(mapStateToProps)(HomePage);
