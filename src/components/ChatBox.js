import React, { Component } from 'react';
import { connect } from 'react-redux';
// import io from 'socket.io-client'
import { sendNewMessage, getTableMessages } from '../ducks/reducer';
// const customerSocket = io('/customer')
class ChatBox extends Component {
    constructor(props) {
        super(props);
        this.state ={
            text: ''
        }
        
    }
    // componentDidMount() {
    //     this.props.newMessage(this.props.match.params.table)
    // }
    componentDidMount() {
        this.props.getTableMessages(this.props.table)
    }
    
    
    updateMessage(e){
        this.setState({
            text: e.target.value
        })
    }
    
    render() {
        console.log('chat msgs', this.props.tableMessages);
        const messages = this.props.tableMessages.map(msg => {
           return <div key={msg.message}>{msg.message} {msg.has_been_read ? 'read': 'unread'}</div>
        })
        return (
            <div>
                {messages}
                <input
                      placeholder="question here"
                      value={this.state.text}
                      onChange={(e) => {this.updateMessage(e)}}
                  />
                <button onClick={()=>{ this.props.sendNewMessage(this.state.text, this.props.tableNumber)}}
                >Message</button>
            </div>
        );
    }
}
function mapStateToProps(state){
    return {
        tableNumber: state.tableNumber,
        tableMessages: state.tableMessages
    }
}
export default connect(mapStateToProps, {sendNewMessage, getTableMessages})(ChatBox);