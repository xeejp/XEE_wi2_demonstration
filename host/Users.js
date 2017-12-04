import React, { Component } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import throttle from 'react-throttle-render'

import { Card, CardHeader, CardText } from 'material-ui/Card'

import { openParticipantPage } from './actions'

import { ReadJSON } from '../util/ReadJSON'

const User = ({ id, status, openParticipantPage }) => (
  <tr><td><a onClick={openParticipantPage(id)}>{id}</a></td><td>{status}</td></tr>
)

const mapStateToProps = ({ participants, page }) => ({ participants, page })

const mapDispatchToProps = (dispatch) => {
  const open = bindActionCreators(openParticipantPage, dispatch)
  return {
    openParticipantPage: (id) => () => open(id)
  }
}

const UsersList = ({participants, page, openParticipantPage }) => (
  <table>
    <thead><tr><th>{ReadJSON().static_text["id"]}</th><th>{ReadJSON().static_text["status"]["title"]}</th></tr></thead>
    <tbody>
      {
        Object.keys(participants).map(id => (
          <User
            key={id}
            id={id}
            status={(page == "waiting" || !participants[id].active)? ReadJSON().static_text["status"]["text"][0] : (page == "description")? ReadJSON().static_text["status"]["text"][1] : (page == "result")? ReadJSON().static_text["status"]["text"][2] : ReadJSON().static_text["status"]["text"][3][participants[id].sequence]}
            openParticipantPage={openParticipantPage}
          />
        ))
      }
    </tbody>
  </table>
)

const Users = ({ participants, page, openParticipantPage }) => (
  <div>
    <Card>
      <CardHeader
        title={ReadJSON().static_text["people"] + " " + Object.keys(participants).length + ReadJSON().static_text["person_unit"]}
        actAsExpander={true}
        showExpandableButton={true}
      />
      <CardText expandable={true}>
        <UsersList
          participants={participants}
          page={page}
          openParticipantPage={openParticipantPage}
        />
      </CardText>
    </Card>
  </div>
)

export default connect(mapStateToProps, mapDispatchToProps)(throttle(Users, 500))
