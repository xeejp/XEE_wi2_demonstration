import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'

import FlatButton from 'material-ui/FlatButton'
import RaisedButton from 'material-ui/RaisedButton'

const mapStateToProps = ()=> {
}

const style = {
  marginLeft: '3%',
  float: 'left',
  marginBottom: '.5rem',
}


class Button extends Component{
  render(){
    const { next, array, data} = this.props;
    return (
      <div>
        <RaisedButton  
          label="次へ"
          onClick={next.bind(this,array)} 
          style={{...style}}
          primary={true} 
          disabled={data != 0}
        />
      </div>
    );

  }
}

export default connect()(Button)





