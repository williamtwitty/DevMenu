import React, { Component } from 'react';
import { connect } from 'react-redux';
import io from 'socket.io-client'
const customerSocket = io('/customer')


class ChatBox extends Component {
    constructor(props) {
        super(props);
        
    }
    componentDidMount() {
        
    }
    
    
    

    render() {

        return (
            <div>
                <input type="text"/>
                
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