import React, { Component, PropTypes } from 'react'
import {Card, CardHeader, CardText} from 'material-ui/Card';
import ItemTypes from './ItemTypes'
import { DragSource } from 'react-dnd'

import EvaluationAxis from 'util/EvaluationAxis'

const style = {
  marginBottom: '.5rem',
  textAlign:'left',
}

const mapStateToProps = ()=> {
}

const cardSource= {
  beginDrag(props) {
    return {
      index: props.index,
      id : props.id,
      text: props.text

    };
  }
}

function dragCollect(connect, monitor){
  return {
    connectDragSource: connect.dragSource(),
    isDragging: monitor.isDragging()
  }
}

class FirstCard extends Component{
  render(){
    const { isDragging, connectDragSource } = this.props;
    const { text, pageCounter,index } = this.props;
    const opacity = isDragging ? 0.4 : 1;
    return (
      connectDragSource(
        <div style={{ ...style, opacity }}>
          <Card>
            <div style={{padding: '20px',}}>
              {text}
            </div>
          </Card>
        </div>
      )
    );
  }
}
Card.propTypes = {
  connectDragSource: PropTypes.func.isRequired,
  isDragging: PropTypes.bool.isRequired,
  text: PropTypes.string.isRequired
};

export default DragSource(ItemTypes.CARD, cardSource, dragCollect)(FirstCard)

