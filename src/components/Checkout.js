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
        this.props.getCheckByTable(this.props.match.params.table)
    }
    
    render() {
        console.log(this.props.checkByTable);
        return (
            <div>
                
            </div>
        );
    }
}
function mapStateToProps(state){
    return {
        checkByTable: state.checkByTable
    }
}

export default connect(mapStateToProps, {getCheckByTable})(CheckOut);