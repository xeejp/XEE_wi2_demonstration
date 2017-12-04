import React, { Component, PropTypes } from 'react'
import ItemTypes from './ItemTypes'
import { DropTarget } from 'react-dnd'
import DroppedCard from './DroppedCard'

const mapStateToProps = ()=> {
}

const boxTarget = {
	drop(props, monitor, component) {
		const dragId    = monitor.getItem().id;
		const dragText  = monitor.getItem().text;
		const dragIndex = monitor.getItem().index;
		const hoverIndex = props.index;

		props.dragCard(dragIndex, dragId, dragText, hoverIndex);

	}
}

function dropCollect(connect, monitor){
	return {
		connectDropTarget: connect.dropTarget(),
		isOver: monitor.isOver()
	}
}

class MiniBox extends Component{
	render(){
		const {
			key, 
			index, 
			id, 
			text, 
      pageCounter,
			dragDropCard, 
			isHover, 
			isOver, 
			connectDropTarget
		} = this.props;

		const color = isOver ? 1 : 0;

		if(id == -1 && color == 0){
			return connectDropTarget(
				<div>
				<DroppedCard 
				flag={false}
				key={key}
				index={index} 
				text={text}
        pageCounter={pageCounter}
				dragDropCard={dragDropCard}
				/>
				</div>
			);
		}
		if(id == -1 && color == 1){
			return connectDropTarget(
				<div style={{float: 'center', backgroundColor: 'yellow'}}>
				<DroppedCard 
				flag={false}
				key={key}
				index={index} 
				text={text}
        pageCounter={pageCounter}
				dragDropCard={dragDropCard}
				/>
				</div>
			);
		}
		else {
			return (
				<div>
				<DroppedCard 
				flag={true}
				key={key}
				index={index} 
				text={text}
        pageCounter={pageCounter}
				dragDropCard={dragDropCard}
				/>
				</div>
			);
		}
	}
}

MiniBox.propTypes = {
	connectDropTarget: PropTypes.func.isRequired,
	dragCard: PropTypes.func.isRequired
};

export default DropTarget(ItemTypes.CARD, boxTarget, dropCollect)(MiniBox)
