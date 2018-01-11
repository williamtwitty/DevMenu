import React, {Component} from 'react'
import axios from 'axios'
export default class Mailer extends Component{
    constructor(){
        super()
        this.state={
            email:''
        }
    }
    componentDidMount(){ 
    }

    sendEmail() {
        axios.post('/api/sendEmail', {
          'email': this.state.email,
          'message': this.state.
        }).catch((err) => {
          console.log(err);
          alert('Email Sent!', err);
        })
      }

    formSubmit(){
        axios.post('/form/submit', {
            email: this.state.email
        })
    }
    render(){
        return(
            <div>
                 <div className='formContainer'>
                    Email Receipt
                    <input type='text' placeholder='Email' onChange={(e)=>{
                        this.setState({
                            email: e.target.value
                        })}}/>

                    <button className='submit' onClick={()=>{
                        this.sendEmail()
                    }}>send receipt</button>
                </div>
            </div>
        )
    }
}
