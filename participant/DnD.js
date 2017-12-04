import React, { Component } from 'react'
import { DragDropContext } from 'react-dnd';
import HTML5Backend from 'react-dnd-html5-backend';
import TouchBackend from 'react-dnd-touch-backend';
import {Card, CardText, CardTitle } from 'material-ui/Card'

import FirstCard from './dnd/FirstCard'
import Box from './dnd/Box'
import MiniBox from './dnd/MiniBox'
import Subjects from 'util/Subjects'
import EvaluationAxis from 'util/EvaluationAxis'
import Button from './dnd/Button'

let array     = new Array();
let data      = new Array();
const length  = Subjects.length 
let pageCounter= 0
const isMobile= navigator.userAgent.match(/(Android|webOS|iPhone|iPad|iPod|BlackBerry|Windows Phone)/i) !== null
let boxText = new Array();
for(let i=0; i<=EvaluationAxis.length; i++){
  boxText[i] = i != EvaluationAxis.length ? "「"+EvaluationAxis[i]+"」について評価してください。" : "評価軸を順位付けしてください。"
}


for(let i=0; i<length; i++){
  array[i]   = new Array();
  array[i][0]=-1;
  array[i][1]= "";
  array[i][2]= i+100;

  data[i] = new Array();
  data[i][0] = i;
  data[i][1] = Subjects[i];
}
JSON.parse(JSON.stringify(array))


class App extends Component {
  constructor(props, context) {
    super(props, context)
    this.dragCard = this.dragCard.bind(this);
    this.dragDropCard = this.dragDropCard.bind(this);
    this.next= this.next.bind(this);
    this.state = {}
  }

  dragCard(dragIndex, dragId, dragText, hoverIndex){
    console.log(hoverIndex)
    array[hoverIndex][0] = dragId;
    array[hoverIndex][1] = dragText;
    console.log(JSON.stringify(array));
    data.splice(dragIndex,1);
    this.setState(data);
    console.log(JSON.stringify(data));
  }

  dragDropCard(dragIndex, hoverIndex) {
    const dragCard = array[dragIndex];
    array.splice(dragIndex, 1);
    array.splice(hoverIndex, 0, dragCard);
    this.setState(array);
    console.log(JSON.stringify(array));
  }

  next(dataarray){
    pageCounter++
    const { dataBarn } = this.props
    if(pageCounter == EvaluationAxis.length + 1){
      dataBarn(dataarray)
    }
    else {
      dataBarn(dataarray)
      data = new Array()
      for(let i=0; i<length; i++){
        array[i][0]=-1;
        array[i][1]="";
        array[i][2]= i+100;

        data[i] = new Array()
        data[i][0] = i;
        data[i][1] = pageCounter != EvaluationAxis.length ? Subjects[i] : EvaluationAxis[i];
      }
      console.log("array:%s",JSON.stringify(array))
      this.setState({array,data})
    }
  }
  render() {
    return (
        <Card style={{overflow: 'hidden'}}>
            <CardTitle title="ボルダルール実験"/>
            <p style={{marginLeft: '10%'}}>{boxText[pageCounter]}</p>
            <div style={{float:'left', marginLeft: '10%'}}>
              <Card>
                <Box pageCounter={pageCounter}>
                  {array.map((dt,i) => <MiniBox
                    key={dt[2]}
                    index={i} 
                    id={dt[0]} 
                    text={dt[1]}
                    pageCounter={pageCounter}
                    dragDropCard={this.dragDropCard}
                    dragCard={this.dragCard}
                  />)}
                </Box>
              </Card>
              <Button next={this.next} array={array} data={data.length}/>
            </div>
            <div style={{ float: 'right', marginRight: '10%'}}>
              <Card> 
                {data.map((card, i) => {
                  return (
                    <FirstCard
                      key={card[0]}
                      index={i}
                      id={card[0]}
                      text={card[1]}
                      pageCounter={pageCounter}
                    />
                  );
                })}
              </Card>
            </div>
        </Card>
    );
  }
}

export default DragDropContext(isMobile ? TouchBackend : HTML5Backend)(App)
