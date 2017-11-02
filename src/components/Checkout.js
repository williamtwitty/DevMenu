import React, { Component } from 'react';
import { connect } from 'react-redux'
import { getCheckByTable } from '../ducks/reducer'

class CheckOut extends Component {
    constructor(props) {
        super(props)
        this.state = {
            checkByTable: []
        }
    }
    componentDidMount() {
        this.props.getCheckByTable(this.props.tableNumber)
    }
    
    render() {
        console.log(this.props.tableNumber, 'checkout table number');
       // console.log(this.props.checkByTable);
        return (
            <div>
                
            </div>
        );
    }
}
function mapStateToProps(state){
    return {
        tableNumber: state.tableNumber,
        checkByTable: state.checkByTable
    }
}

export default connect(mapStateToProps, {getCheckByTable})(CheckOut);