import React, { Component } from 'react'
import { connect } from 'react-redux'

import {Card, CardText, CardTitle } from 'material-ui/Card'
import {
  Table,
  TableBody,
  TableHeader,
  TableHeaderColumn,
  TableRow,
  TableRowColumn,
} from 'material-ui/Table'

import EvaluationAxis from 'util/EvaluationAxis'
import Subjects from 'util/Subjects'

const mapStateToProps = ({}) => ({
})

let calculationsResult = Object()



class Calculation extends Component {
  constructor(props) {
    super(props)
    this.state = {
    }
    const { arrayResult ,comparisonAxis} = this.props
    let calculations = Array()
    let loopCounter = 0
    let printResult = Array()

    for(let i=0; i<Subjects.length; i++){
      calculations[i] = 0;
    }

    for(let i=0; i<EvaluationAxis.length; i++){
      for(let g=0; g<Subjects.length; g++){
        if(g == 0){
          if(arrayResult[loopCounter] == Subjects[0]){
            calculations[0] += 3*comparisonAxis[i]
          }
          if(arrayResult[loopCounter] == Subjects[1]){
            calculations[1] += 3*comparisonAxis[i]
          }
          if(arrayResult[loopCounter] == Subjects[2]){
            calculations[2] += 3*comparisonAxis[i]
          }
        }
        if(g == 1){
          if(arrayResult[loopCounter] == Subjects[0]){
            calculations[0] += 2*comparisonAxis[i]
          }
          if(arrayResult[loopCounter] == Subjects[1]){
            calculations[1] += 2*comparisonAxis[i]
          }
          if(arrayResult[loopCounter] == Subjects[2]){
            calculations[2] += 2*comparisonAxis[i]
          }
        }
        if(g == 2){
          if(arrayResult[loopCounter] == Subjects[0]){
            calculations[0] += 1*comparisonAxis[i]
          }
          if(arrayResult[loopCounter] == Subjects[1]){
            calculations[1] += 1*comparisonAxis[i]
          }
          if(arrayResult[loopCounter] == Subjects[2]){
            calculations[2] += 1*comparisonAxis[i]
          }
        }
        loopCounter++
      }
    }
    calculationsResult = [
      {name:Subjects[0], value:calculations[0]},
      {name:Subjects[1], value:calculations[1]},
      {name:Subjects[2], value:calculations[2]},
    ]
    console.log("calculationsResult")
    console.log(JSON.stringify(calculationsResult))
    calculationsResult.sort(function(a,b){
      if(a.value > b.value) return -1
      if(a.value < b.value) return 1
      return 0
    })
    console.log(JSON.stringify(calculationsResult))
  }

  render() {
    console.log(JSON.stringify(calculationsResult))
    return (
      <Card>
        <CardTitle title="好きな飲み物アンケート" subtitle="結果画面" />
        <CardText>
          <p>これでアンケートを終了します。</p>
          <p>集計結果を表に示します。</p>
        </CardText>

        <Table>
          <TableBody displayRowCheckbox = {false} >
            <TableRow>
              <TableRowColumn>1位</TableRowColumn>
              <TableRowColumn>{calculationsResult[0].name}</TableRowColumn>
              <TableRowColumn>{calculationsResult[0].value}点</TableRowColumn>
            </TableRow>
            <TableRow>
              <TableRowColumn>2位</TableRowColumn>
              <TableRowColumn>{calculationsResult[1].name}</TableRowColumn>
              <TableRowColumn>{calculationsResult[1].value}点</TableRowColumn>
            </TableRow>
            <TableRow>
              <TableRowColumn>3位</TableRowColumn>
              <TableRowColumn>{calculationsResult[2].name}</TableRowColumn>
              <TableRowColumn>{calculationsResult[2].value}点</TableRowColumn>
            </TableRow>
          </TableBody>
        </Table>

      </Card>

    )
  }
}

export default connect(mapStateToProps)(Calculation)











