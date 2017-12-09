import React, { Component } from 'react'
import { connect } from 'react-redux'

import {Card, CardText, CardTitle } from 'material-ui/Card'
import {List, ListItem} from 'material-ui/List'
import { ReadJSON } from '../util/ReadJSON'

const mapStateToProps = ({ question_text }) => ({
  question_text
})

const Description = ({ question_text }) => (
  <Card>
    <CardTitle title="好きな飲み物アンケート" subtitle={ReadJSON().static_text["description"]} />
    <CardText>
      <p>紅茶、コーラ、珈琲の中で好きな飲み物は何ですか？</p>
      <p>「味」「価格」「手軽さ」の観点から考えてみてください。</p>
      <p>また、これらの評価軸の中で重視したい項目は何ですか？</p>
    </CardText>
  </Card>
)
export default connect(mapStateToProps)(Description)
