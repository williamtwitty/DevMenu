import React, { Component } from 'react';
// import { Link } from 'react-router-dom';
import { connect } from 'react-redux'
import { selectTableNumber } from '../ducks/reducer'


class HomePage extends Component {
    constructor(props) {
        super(props)
        this.state = {
        }
        this.handleOnChange = this.handleOnChange.bind(this)
    }

    handleOnChange(e) {
     return this.props.selectTableNumber(e); 
    }

    handleOnClick(e) {
        // if (e === undefined) {
        //     return alert('please select a table first...');
        // } 
        // else {
        //     return this.props.selectTableNumber(e);
        // }
    }

    render() {
        return (
            <div className='div'>
            <div className='HomePage-container'></div>
                <div className='HomePage-img'>
                    <div className='login'><a className='log'href={process.env.REACT_APP_LOGIN}>Log In</a></div>
                <div className='HomePage'>
                <div className='menu-access'>
                    <div className='home-title'>Fullstack Co.</div>
                    <div className='chooseTable'>Choose Your Table</div>
                    <div className='tableInput'>
                    <select className='home-input' defaultValue={0} onChange={(e)=>{
                        this.handleOnChange(e.target.value)}} >
                        <option value='0'>#</option>
                        <option value='1'>1</option>
                        <option value='2'>2</option>
                        <option value='3'>3</option>
                        <option value='4'>4</option>
                        <option value='5'>5</option>
                        <option value='6'>6</option>
                        <option value='7'>7</option>
                    </select>

                    <button className='next-btn' defaultValue={0} onClick={(e)=>{ 

                        if (this.props.tableNumber > 0) {
                            this.props.history.push("/menu");
                            
                        } else {
                            this.props.history.push("/");
                        }
                   
                        // (e.target.value === undefined) 
                        // ?
                        // this.handleOnClick(e.target.value)}}> 
                        // <Link to = '/'>  orders</Link> </button>
                        // :
                        // this.handleOnClick(e.target.value)}}> 
                        // <Link to = '/menu'>  orders</Link> </button>
                        
                         this.handleOnClick(e.target.value)}}> 
                            <img src='https://imgur.com/KdSyY3c.jpg'width='19px'height='19px'/>
                            <img className='hover-arrow' src='https://imgur.com/KdSyY3c.jpg'width='15px'height='15px'/>
                            <img className='hover-arrow2' src='https://imgur.com/KdSyY3c.jpg'width='12.5px'height='12.5px'/>
                         </button>  
                        </div>
                    </div>
                </div>
            </div>
            </div>
        );
    }
}

function mapStateToProps(state){
    return {
        tableNumber: state.tableNumber
    }
}

export default connect(mapStateToProps, {selectTableNumber})(HomePage);
