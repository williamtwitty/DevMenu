import React, { Component } from 'react';
import { connect } from 'react-redux'

class Admin extends Component {
    constructor(props) {
        super(props)
        this.state = {

        }
    }


    render() {
        return (
            <div>
                haley
                <a href='http://localhost:3030/auth/logout'><button>LOGOUT</button></a>
            </div>
        );
    }
}
function mapStateToProps(state){
    return {

    }
}

export default connect(mapStateToProps)(Admin);
