import React, { Component } from 'react';
// import { Link } from 'react-router-dom';
import { connect } from 'react-redux'
import { selectTableNumber } from '../ducks/reducer'
import video from '../video/624065871.mp4';


class HomePage extends Component {
    constructor(props) {
        super(props)
        this.state = {
            // tableNum: ''
        }
        this.handleOnChange = this.handleOnChange.bind(this);
        // this.handleOnClick = this.handleOnClick.bind(this);
    }

    handleOnChange(e) {
        // this.setState = {
        //     tableNum: e
        //     }
        return this.props.selectTableNumber(e); 
    }

    handleOnClick(e) {
        // this.setState = {
        //     tableNum: e
        //     }
        // return this.props.selectTableNumber(e);
    }
        
    

    render() {
        return (
            <div className='div'>
            <div className='HomePage-container'>  <video loop muted preload='auto' autoPlay width='100%' height='100%'>
<source src={video} type="video/mp4"/>
</video></div>
                <div className='HomePage-img'>
                    <div className='login'><a className='log'href={process.env.REACT_APP_LOGIN}>Log In</a></div>
                <div className='HomePage'>
                <div className='menu-access'>
                    <div className='home-title'>Fullstack Co.</div>
                    <div className='tableInput'>
                    <div className='chooseTable'>CHOOSE YOUR TABLE<select className='home-input' defaultValue={0} onChange={(e)=>{
                        this.handleOnChange(e.target.value)}} >
                        <option className='option' value='0'></option>
                        <option value='1'>1</option>
                        <option value='2'>2</option>
                        <option value='3'>3</option>
                        <option value='4'>4</option>
                        <option value='5'>5</option>
                        <option value='6'>6</option>
                        <option value='7'>7</option>
                    </select></div>
                  
                  

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
                            <img alt="" src='https://imgur.com/KdSyY3c.jpg'width='25px'height='25px'/>
                            <img alt="" className='hover-arrow' src='https://imgur.com/KdSyY3c.jpg'width='20px'height='20px'/>
                            <img alt="" className='hover-arrow2' src='https://imgur.com/KdSyY3c.jpg'width='16.5px'height='16.5px'/>
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
