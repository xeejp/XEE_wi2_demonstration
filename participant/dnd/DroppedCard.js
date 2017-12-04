import React, { Component, PropTypes } from 'react'
import { findDOMNode } from 'react-dom'
import {Card, CardHeader} from 'material-ui/Card';
import ItemTypes from './ItemTypes'
import MiniBox from './MiniBox'
import { DragSource } from 'react-dnd'
import { DropTarget } from 'react-dnd'

const mapStateToProps = ()=> {
}

const cardStyle = {
  marginBottom: '.5rem',
  textAlign:'left',
}
const style = {
  border: '1px dashed gray',
  padding: '1rem 2rem',
  marginBottom: '.5rem',
}

const cardSource = {
  beginDrag(props) {
    return {
      id: props.id,
      index: props.index
    }
  }
}

const cardTarget = {
  hover(props, monitor, component) {
    const dragIndex = monitor.getItem().index;//dragされてる要素のindexを取得
    const hoverIndex = props.index;

    if (dragIndex === hoverIndex) {
      return;
    }

    const hoverBoundingRect = findDOMNode(component).getBoundingClientRect();

    const hoverMiddleY = (hoverBoundingRect.bottom - hoverBoundingRect.top) / 2;//高さ割２

    const clientOffset = monitor.getClientOffset();//dropしていた最後の座標

    const hoverClientY = clientOffset.y - hoverBoundingRect.top;

    if (dragIndex < hoverIndex && hoverClientY < hoverMiddleY) {
      return;
    }

    if (dragIndex > hoverIndex && hoverClientY > hoverMiddleY) {
      return;
    }

    props.dragDropCard(dragIndex, hoverIndex);

    monitor.getItem().index = hoverIndex;
  }
}

function dragCollect(connect, monitor){
  return {
    connectDragSource: connect.dragSource(),
    isDragging: monitor.isDragging()
  }
}

function dropCollect(connect, monitor){
  return {
    connectDropTarget: connect.dropTarget(),
  }
}

class DroppedCard extends Component{
  constructor(props, context) {
    super(props, context)
    this.state = {}
  }

  render(){
    const { flag, text, index, pageCounter, isDragging, connectDragSource, connectDropTarget } = this.props;
    const opacity = isDragging ? 0 : 1;
    const no = index+1;
    const title=no+"位 "+text;

    if( flag == false ){
      return connectDragSource(connectDropTarget(
        <div style={{ ...style ,opacity}}>
          <div>{index+1}位</div>
        </div>
      ));
    }
    else{
      return connectDragSource(connectDropTarget(
        <div style={{ ...cardStyle ,opacity}}>
          <Card>
            <div style={{padding: '20px',}}>
              {title}
          </div>
          </Card>
        </div>
      ));
    }

  }
}

DroppedCard.propTypes = {
  connectDragSource: PropTypes.func.isRequired,
  connectDropTarget: PropTypes.func.isRequired,
  index: PropTypes.number.isRequired,
  isDragging: PropTypes.bool.isRequired,
  id: PropTypes.any.isRequired,
  text: PropTypes.string.isRequired,
  dragDropCard: PropTypes.func.isRequired
}
const x = DropTarget(ItemTypes.DRAGGED, cardTarget, dropCollect)(DroppedCard) 
export default DragSource(ItemTypes.DRAGGED, cardSource, dragCollect)(x)



