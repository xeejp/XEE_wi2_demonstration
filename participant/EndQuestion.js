import React, { Component } from 'react'
import { connect } from 'react-redux'

import {Card, CardText, CardTitle } from 'material-ui/Card'
import CircularProgress from 'material-ui/CircularProgress'
import TextField from 'material-ui/TextField'
import FlatButton from 'material-ui/FlatButton'
import RaisedButton from 'material-ui/RaisedButton'
import Slider from 'material-ui/Slider'

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

let endQ = true
let isNotAns1=true
let isNotAns2=true

class EndQuestion extends Component {
  constructor(props) {
    super(props)
    this.state = {
      sliderValue1:1,
      sliderValue2:1,
    }
  }

  handleSlider1 = (event, value) => {
    console.log("slider1: "+value)
    isNotAns1=false
    this.setState({sliderValue1: value})
  }

  handleSlider2 = (event, value) => {
    console.log("slider2: "+value)
    isNotAns2=false
    this.setState({sliderValue2: value})
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
    const comparisonAxis = [this.state.sliderValue1, this.state.sliderValue2,1]

    if(endQ){
      return (
        <Card>
          <CardTitle title="好きな飲み物アンケート" subtitle="質問画面" />
          <CardText>
            <p>{arrayResult[11]}の重要度を基準値1としたら、他の評価軸はどれくらい重要ですか？</p>
            <p>{arrayResult[9]} : {this.state.sliderValue1}</p>
            <Slider
              style={{marginLeft:"10%", marginRight:"10%"}}
              min={1}
              max={5}
              step={1}
              onChange={this.handleSlider1}
            />

          <p>{arrayResult[10]} : {this.state.sliderValue2}</p>
          <Slider
            style={{marginLeft:"10%", marginRight:"10%"}}
            min={1}
            max={5}
            step={1}
            onChange={this.handleSlider2}
          />
          <br /><br /><br />
          <RaisedButton
            label="回答" 
            style={{marginLeft: '3%'}}
            primary={true} 
            onClick={this.handleClick.bind(this)} 
            disabled={
              this.state.sliderValue1 == 1 ||
              this.state.sliderValue2 == 1 ||
              this.state.sliderValue1 < this.state.sliderValue2 ||
              this.state.sliderValue1  == this.state.sliderValue2
            }
          />
        <p>{
          isNotAns1 || isNotAns2 ? null :
            this.state.sliderValue1 < this.state.sliderValue2 ||
            this.state.sliderValue1  == this.state.sliderValue2 
        ?
          arrayResult[9]+"は"+arrayResult[10]+"より大きな値に設定してください"
          :null}
        </p>
        <p>{isNotAns1 || isNotAns2 ? null :
          this.state.sliderValue1 == 1 || this.state.sliderValue2  == 1
          ?
          "各値は1以上に設定してください"
          :null}
        </p>
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



