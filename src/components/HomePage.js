import React, { Component } from 'react';

class HomePage extends Component {
    render() {
        return (
            <div className='HomePage-container'>
                    <div>
                        <a href={process.env.REACT_APP_LOGIN}><button className='Login'>Log-in</button></a>
                        </div>
                <div className='HomePage'>
                <div className='menu-access'>
                    <div className='home-title'>DevMENU</div>
                    <select className='home-input'>
                        <option value='1'>1</option>
                        <option value='2'>2</option>
                        <option value='3'>3</option>
                        <option value='4'>4</option>
                        <option value='5'>5</option>
                        <option value='6'>6</option>
                        <option value='7'>7</option>
                    </select>
                    <button> next </button>
                    </div>
                </div>
                </div>
        );
    }
}

export default HomePage;