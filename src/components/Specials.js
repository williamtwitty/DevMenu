import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class Specials extends Component {
    render() {
        return (
            <div className='Specials'>
            <div className='Menu-Appetizers'>
            <div className='appetizers-container2'>TODAYS SPECIAL</div>
                <div className='appetizers-container'>
                    <div className='threecourse'>Fullstack Meal for $33/person</div>
                    <div className='appentdes'>1 Appetizer, 1 Entree, 1 Dessert</div>
                    <Link to='menu' className='orderNow'>Order Now!</Link>
                    </div>
            </div>
            <div className='bottom-div'></div>
            <div id="container">
                            <div className='container-shadow'></div>
                <div class="photobanner">
                    <img className="first" src="image-1.jpg" alt="" width='260' height='260'/>
                    <img src="https://imgur.com/XVrmEY5.jpg " alt=""width='260' height='260' />
                    <img src="https://imgur.com/nNUdzke.jpg " alt="" width='260' height='260'/>
                    <img src="https://imgur.com/TQgkvjt.jpg " alt="" width='260' height='260'/>
                    <img src="https://i.imgur.com/P5VSNEf.jpg" alt="" width='260' height='260'/>
                    <img src="https://i.imgur.com/bWwWQzy.jpg" alt="" width='260' height='260'/>
                    <img src="https://imgur.com/cjlyAGy.jpg " alt="" width='260' height='260'/>
                    <img src="https://imgur.com/UDqUQav.jpg " alt="" width='260' height='260'/>
                    <img src="https://imgur.com/BKR4ZiQ.jpg" alt="" width='260' height='260'/>
                    <img src="https://imgur.com/0McTeHf.jpg	" alt="" width='260' height='260'/>
                    <img src="https://imgur.com/21e5kaX.jpg" alt="" width='260' height='260'/>
                    <img src="https://i.imgur.com/mXi08OH.jpg" alt="" width='260' height='260'/>
                    <img src="https://imgur.com/rfpaPdy.jpg" alt="" width='260' height='260'/>
                    <img src="https://imgur.com/9EZgBiA.jpg " alt="" width='260' height='260'/>
                    <img src="https://imgur.com/NS3BMNR.jpg" alt="" width='260' height='260'/>
                    <img src="https://imgur.com/I2X6nee.jpg" alt="" width='260' height='260'/>
                    <img src="https://i.imgur.com/6l9bshf.jpg" alt="" width='260' height='260'/>
                </div>
            </div>
    
            </div>
        );
    }
}

export default Specials;