import React, { Component } from 'react';
import { connect } from 'react-redux';
import io from 'socket.io-client'
import { sendNewMessage, getTableMessages } from '../ducks/reducer';
const customerSocket = io('http://localhost:3030')
class ChatBox extends Component {
    constructor(props) {
        super(props);
        this.state ={
            text: ''
        }
        this.updateMessageData = this.updateMessageData.bind(this)
    }
    // componentDidMount() {
    //     this.props.newMessage(this.props.match.params.table)
    // }

    componentDidMount() {
        this.props.getTableMessages(this.props.table)
        customerSocket.on('marked as read', (table) => {
            this.updateMessageData(table)
        })
        customerSocket.on('message completed', (table) =>{
            this.updateMessageData(table)
        })
    }
    

    updateMessage(e){
        this.setState({
            text: e.target.value
        })
    }

    handleOnClick () {
        this.setState({
            text: ''
        })
    }

    updateMessageData(table) {
        console.log('workingonit', this.props.table);
        this.props.getTableMessages(table)
    }

    render() {
        // console.log('chat msgs', this.props.tableMessages);
        const messages = this.props.tableMessages.map(msg => {
           return <div>{msg.message} {msg.has_been_read ? 'Working on it': 'unread'}</div>
        })

        return (
            <div className='chatbox-comp'>
               <div className='chat-messages'> {messages} </div>
                <div className='enter-message'>
                    <input
                      placeholder="question here"
                      value={this.state.text}
                      className='chat-input'
                      onChange={(e) => {this.updateMessage(e)}}
                  />
                <button className='chat-btn' onClick={()=>{ this.props.sendNewMessage(this.state.text, this.props.tableNumber); this.handleOnClick()}}
                >SEND</button>
                </div>
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