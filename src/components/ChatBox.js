import React, { Component } from 'react';
import { connect } from 'react-redux';
import io from 'socket.io-client'
import { newMessage } from '../ducks/reducer';
const customerSocket = io('/customer')


class ChatBox extends Component {
    constructor(props) {
        super(props);
        this.state ={
            text: '',
            messages: []
        }
        
    }
    // componentDidMount() {
    //     this.props.newMessage(this.props.match.params.table)
    // }
    addMessage(text)  {
        var list = this.state.messages
        list.push(text)

        this.setState({
            messages:list
        })
    }

    updateMessage(text){
        this.setState({
            text
        })
    }
    

    render() {
       var chat = this.state.messages.map((item)=>{
            return (
                <div>item</div>
            )
        })

        return (
            <div>
                {chat}
                <input
                      placeholder="question here"
                      value={this.state.text}
                      onChange={(e) => {this.updateMessage(e.target.value)}}
                  />
                <button onClick={()=>{ this.props.newMessage(this.state.text, this.props.tableNumber)}}
                ></button>
            </div>
        );
    }
}

function mapStateToProps(state){
    return {
        tableNumber: state.tableNumber
    }
}

export default connect(mapStateToProps)(ChatBox);