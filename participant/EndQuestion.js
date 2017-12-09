import React, { Component } from 'react'
import { connect } from 'react-redux'

import {Card, CardText, CardTitle } from 'material-ui/Card'
import CircularProgress from 'material-ui/CircularProgress'
import TextField from 'material-ui/TextField'
import FlatButton from 'material-ui/FlatButton'
import RaisedButton from 'material-ui/RaisedButton'
import {
  Table,
  TableBody,
  TableHeader,
  TableHeaderColumn,
  TableRow,
  TableRowColumn,
} from 'material-ui/Table'

import EvaluationAxis from 'util/EvaluationAxis'
import Calculation from './Calculation'

const mapStateToProps = ({}) => ({
})

let isnan = false
let endQ = true
let q1=0
let q2=0

class EndQuestion extends Component {
  constructor(props) {
    super(props)
    this.state = {
    }
    console.log("q1="+q1)
    console.log("q2="+q2)
  }

  handleChange1(event) {
    const { arrayResult } = this.props
    const value1 = event.target.value
    isnan=isNaN(value1)
    q1=value1
    console.log("q1="+q1)
    console.log("q2="+q2)
    console.log("arrayResult="+JSON.stringify(arrayResult))
    
    this.setState({ value1 })
  }

  handleChange2(event) {
    const value2 = event.target.value
    isnan=isNaN(value2)
    q2=value2
    this.setState({ value2 })
    console.log("q1="+q1)
    console.log("q2="+q2)
  }

  handleClick(){
    const { manyTypeData, arrayResult } = this.props
    const { value } = this.state
    console.log("result"+JSON.stringify(arrayResult))
    endQ=false
    this.setState({ value })
  }

  render() {
    const { value } = this.state
    const { arrayResult } = this.props
    const comparisonAxis = [q1,q2,1]

    if(endQ){
      return (
        <Card>
          <CardTitle title="ボルダルール実験" subtitle="AグループはBグループの何倍？" />
          <CardText>
            <p>{arrayResult[9]}は{arrayResult[10]}の何倍くらい重要ですか？</p>
            <p>何倍重要かを数字でお答えください</p>
            <TextField
              hintText=""
              value={value}
              onChange={this.handleChange1.bind(this)}
              floatingLabelText="数値を入力してください"
            /><br /><br /><br />
            <p>{arrayResult[10]}は{arrayResult[11]}の何倍くらい重要ですか？</p>
            <p>何倍重要かを数字でお答えください</p>
            <TextField
              hintText=""
              value={value}
              onChange={this.handleChange2.bind(this)}
              floatingLabelText="数値を入力してください"
            /><br /><br /><br />
            <RaisedButton
              label="回答" 
              style={{marginLeft: '3%'}}
              primary={true} 
              onClick={this.handleClick.bind(this)} 
              disabled={isnan || value == 0 || value > 100}
            />
          </CardText>
        </Card>
      )
    }
    else{
      return (
        <Calculation 
          arrayResult = {arrayResult}
          comparisonAxis = {comparisonAxis}
        />
      )
    }
  }
}

export default connect(mapStateToProps)(EndQuestion)



