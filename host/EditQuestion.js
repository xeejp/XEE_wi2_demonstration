import React, { Component } from 'react'
import { connect } from 'react-redux'

import {Tabs, Tab} from 'material-ui/Tabs'
import Paper from 'material-ui/Paper'
import SwipeableViews from 'react-swipeable-views'
import FloatingActionButton from 'material-ui/FloatingActionButton'
import ImageEdit from 'material-ui/svg-icons/image/edit'
import RaisedButton from 'material-ui/RaisedButton'
import Dialog from 'material-ui/Dialog'
import TextField from 'material-ui/TextField'
import Snackbar from 'material-ui/Snackbar'

import { ReadJSON } from '../util/ReadJSON'

import { updateQuestion, fetchContents } from './actions'

const mapStateToProps = ({ question_text, page }) => ({
  question_text, page
})

class EditQuestion extends Component {
  constructor(props){
    super(props)
    const { question_text } = this.props
    var default_text = question_text
    var static_text = ReadJSON().static_text
    if(!question_text) {
      default_text = ReadJSON().dynamic_text
      const { dispatch } = this.props
      dispatch(updateQuestion(default_text))
    }
    this.state = {
      static_text: static_text,
      question_text: default_text,
      open: false,
      snack: false,
      message: static_text["send_message"],
      slideIndex: 0,
      mainSlideIndex: 0,
      default_text: ReadJSON().dynamic_text,
    }
  }

  QuestionTab(){
    return (
      <div>
        <TextField
          hintText={this.state.static_text["question_description"]}
          defaultValue={this.state.question_text["question"].text}
          onBlur={this.handleChange.bind(this, ["question", "text"])}
          multiLine={true}
          fullWidth={true}
        /><br />

        <div style={{ marginLeft: "2%", marginRight: "2%"}}>
        <Tabs
          onChange={this.handleSlide.bind(this)}
          value={this.state.slideIndex}
        >
          <Tab label={this.state.static_text["questions"][0]} value={0} style={{color: '#000000', background: '#CCCCCC'}} />
          <Tab label={this.state.static_text["questions"][1]} value={1} style={{color: '#000000', background: '#CCCCCC'}} />
        </Tabs>
        <SwipeableViews
          index={this.state.slideIndex}
          onChangeIndex={this.handleSlide.bind(this)}
        >
          <div style={{ marginLeft: "2%", marginRight: "2%"}}>
            <TextField
              hintText={this.state.static_text["question_details"][0]}
              defaultValue={this.state.question_text["question1"].text}
              onBlur={this.handleChange.bind(this, ["question1", "text"])}
              multiLine={true}
              fullWidth={true}
            /><br />
            <div style={{marginLeft: "2%"}}>
          <Paper zDepth={1} style={{ marginLeft: "2%", padding: 10, marginBottom: 10}}>
           <TextField
             hintText={this.state.default_text["question1"].title[0]}
             defaultValue={this.state.question_text["question1"].title[0]}
             onBlur={this.handleChange.bind(this, ["question1", "title", 0])}
           /><br />
           <div style={{marginLeft: "2%"}}><TextField
              hintText={this.state.static_text["question_details"][0]}
              defaultValue={this.state.question_text["question1"].question[0]}
              onBlur={this.handleChange.bind(this, ["question1", "question", 0])}
              multiLine={true}
              fullWidth={true}
           /></div></Paper><br />
          <Paper zDepth={1} style={{ marginLeft: "2%", padding: 10, marginBottom: 10}}>
          <TextField
              hintText={this.state.default_text["question1"].title[1]}
             defaultValue={this.state.question_text["question1"].title[1]}
             onBlur={this.handleChange.bind(this, ["question1", "title", 1])}
            /><br />
            <div style={{marginLeft: "2%"}}><TextField
               hintText={this.state.static_text["question_details"][1]}
               defaultValue={this.state.question_text["question1"].question[1]}
               onBlur={this.handleChange.bind(this, ["question1", "question", 1])}
               multiLine={true}
              fullWidth={true}
            /></div></Paper><br />
            </div>
          </div>

          <div style={{ marginLeft: "2%", marginRight: "2%"}}>
            <TextField
              hintText={this.state.static_text["question_details"][1]}
              defaultValue={this.state.question_text["question2"].text}
              onBlur={this.handleChange.bind(this, ["question2", "text"])}
              multiLine={true}
              fullWidth={true}
            /><br />
            <div style={{marginLeft: "2%"}}>
          <Paper zDepth={1} style={{ marginLeft: "2%", padding: 10, marginBottom: 10}}>
           <TextField
             hintText={this.state.default_text["question2"].title[0]}
             defaultValue={this.state.question_text["question2"].title[0]}
             onBlur={this.handleChange.bind(this, ["question2", "title", 0])}
           /><br />
           <div style={{marginLeft: "2%"}}><TextField
              hintText={this.state.default_text["question2"].title[0] + "の詳細"}
              defaultValue={this.state.question_text["question2"].question[0]}
              onBlur={this.handleChange.bind(this, ["question2", "question", 0])}
              multiLine={true}
              fullWidth={true}
           /></div></Paper><br />
          <Paper zDepth={1} style={{ marginLeft: "2%", padding: 10, marginBottom: 10}}>
          <TextField
              hintText={this.state.default_text["question2"].title[1]}
             defaultValue={this.state.question_text["question2"].title[1]}
             onBlur={this.handleChange.bind(this, ["question2", "title", 1])}
            /><br />
            <div style={{marginLeft: "2%"}}><TextField
               hintText={this.state.default_text["question2"].title[1] + "の詳細"}
               defaultValue={this.state.question_text["question2"].question[1]}
               onBlur={this.handleChange.bind(this, ["question2", "question", 1])}
               multiLine={true}
              fullWidth={true}
            /></div></Paper><br />
            </div>
          </div>
        </SwipeableViews>
        </div>
        </div>
    )
  }

  WaitingTab() {
    return (
      <div style={{height: '100%', position: 'relative'}}>
        <TextField
         hintText={this.state.static_text["waiting_text"]}
         defaultValue={this.state.question_text["waiting_text"]}
         onBlur={this.handleChange.bind(this, ["waiting_text"])}
         multiLine={true}
         fullWidth={true}
         style={{height: 1000}}
       />
      </div>
    )
  }

  handleOpen() {
    const { dispatch } = this.props
    dispatch(fetchContents())
    this.setState({
      open: true,
      question_text: this.props.question_text,
      mainSlideIndex: 0,
      slideIndex: 0,
    })
  }

  handleClose() {
    this.setState({ open: false })
  }

  handleChange(value, event){
    var question_text = Object.assign({}, this.state.question_text)
    var temp = question_text
    for(var i = 0; i < value.length - 1; i++){
      temp = temp[value[i]]
    }
    temp[value[value.length - 1]] = event.target.value
    this.setState({ question_text: question_text })
  }

  handleSlide(value) {
    this.setState({
      slideIndex: value
    })
  }

  handleMainSlide(value){
    this.setState({
      mainSlideIndex: value
    })
  }

  handleRequestClose() {
    this.setState({ snack: false })
  }

  submit() {
    this.setState({
      open: false,
      snack: true,
      message: this.state.static_text["send_message"]
    })
    const { dispatch } = this.props
    dispatch(updateQuestion(this.state.question_text))
  }

  reset(){
    this.setState({
      question_text: this.state.default_text,
      open: false,
      snack: true,
      message: this.state.static_text["reset_message"]
    })
    const { dispatch } = this.props
    dispatch(updateQuestion(this.state.default_text))
  }

  render(){
    const { page } = this.props
    const actions = [
      <RaisedButton
        label={this.state.static_text["apply"]}
        primary={true}
        keyboardFocused={true}
        onTouchTap={this.submit.bind(this)}
      />,
      <RaisedButton
        label={this.state.static_text["cancel"]}
        onTouchTap={this.handleClose.bind(this)}
      />,
     <RaisedButton
        label={this.state.static_text["reset"]}
        onTouchTap={this.reset.bind(this)}
      />,
    ]
    return (<span>
      <FloatingActionButton style={{marginLeft: "2%"}} onClick={this.handleOpen.bind(this)} disabled={page != "waiting"}>
         <ImageEdit />
      </FloatingActionButton>
      <Dialog
        title={this.state.static_text["editor"]}
        actions={actions}
        modal={false}
        open={this.state.open}
        autoScrollBodyContent={this.state.mainSlideIndex == 1}
      >
        <Tabs
          onChange={this.handleMainSlide.bind(this)}
          value={this.state.mainSlideIndex}
        >
          <Tab label={this.state.static_text["waiting"]} value={0}/>
          <Tab label={this.state.static_text["question"]} value={1}/>
        </Tabs>
        <SwipeableViews
          index={this.state.mainSlideIndex}
          onChangeIndex={this.handleMainSlide.bind(this)}
        >
         {this. WaitingTab()}
         {this.QuestionTab()}
      </SwipeableViews>
      </Dialog>
      <Snackbar
        open={this.state.snack}
        message={this.state.message}
        autoHideDuration={2000}
        onRequestClose={this.handleRequestClose.bind(this)}
      />
    </span>)
  }
}

export default connect(mapStateToProps)(EditQuestion)