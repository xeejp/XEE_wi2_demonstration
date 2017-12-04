import React, { Component } from 'react'
import { connect } from 'react-redux'

import {Card, CardText, CardTitle } from 'material-ui/Card'
import CircularProgress from 'material-ui/CircularProgress'
import TextField from 'material-ui/TextField'
import FlatButton from 'material-ui/FlatButton'
import RaisedButton from 'material-ui/RaisedButton'

const mapStateToProps = ({}) => ({
})

let isnan = false
let endQ = true

class EndQuestion extends Component {
  constructor(props) {
    super(props)
    this.state = {
    }
  }

  handleChange(event) {
    const value = event.target.value
    isnan=isNaN(value)
    this.setState({ value })
  }

  handleClick(){
    const { manyTypeData, arrayResult } = this.props
    const { value } = this.state
    console.log("result"+JSON.stringify(arrayResult))
    endQ=false
    manyTypeData("dnd",JSON.parse(JSON.stringify(arrayResult.concat(value))))
 this.setState({ value })
  }

  render() {
    const { value } = this.state
    if(endQ){
      return (
        <Card>
          <CardTitle title="ボルダルール実験" subtitle="AグループはBグループの何倍？" />
          <CardText>
            <p>AグループはBグループの何倍くらい結果に与える影響が大きいと思いますか？</p>
            <p>何倍大きいかを数字でお答えください</p>
            <TextField
              hintText=""
              value={value}
              onChange={this.handleChange.bind(this)}
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
        <Card>
          <CardTitle title="ボルダルール実験" subtitle="質問終了画面" />
          <CardText>
            <p>これで質問を終了します。</p>
            <p>しばらくお待ちください。</p>
          </CardText>
          <div style={{textAlign: "center"}}>
            <CircularProgress size={2}/>
          </div>
        </Card>
      )
    }
  }
}

export default connect(mapStateToProps)(EndQuestion)



