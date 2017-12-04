import React, { Component } from 'react'
import { connect } from 'react-redux'
import throttle from 'react-throttle-render'

import { Card, CardHeader, CardText } from 'material-ui/Card'
import Highcharts from 'react-highcharts'
import { ReadJSON } from '../util/ReadJSON'

const mapStateToProps = ({ question_text }) => ({ question_text })

class Chart extends Component {
  constructor(props) {
    super(props)
    const { expanded } = this.props
    this.state = { expanded: expanded }
  }

  handleExpandChange(expanded) {
    this.setState({ expanded: expanded })
  }

  render() {
    const { oneone, onetwo, twoone, twotwo, question_text } = this.props
    if(question_text == null) return null
    var text = ReadJSON().static_text["result"]

    return (
    <Card
      expanded={this.state.expanded}
      onExpandChange={this.handleExpandChange.bind(this)}
    >
      <CardHeader
        title={text["title"]}
        actAsExpander={true}
        showExpandableButton={true}
      />
      <CardText expandable={true}>
        <span>
          {(oneone + onetwo != 0)?
            <Highcharts
              config={{
                  chart: {
                    type: 'pie'
                  },
                  credits : {
                    enabled: false,
                  },
                  title: {
                    text: text["graph_title"][0][0] + question_text["question1"].title[0] + text["graph_title"][0][1]
                  },
                  plotOptions: {
                      pie: {
                          dataLabels: {
                              distance: -30,
                              format: '{point.y:.0f}' + ReadJSON().static_text["person_unit"]
                          },
                          showInLegend: true
                     }
                  },

                  tooltip: {
                    headerFormat: '<span>{series.name}</span><br>',
                    pointFormat: '<span style="color:{point.color}">{point.name}</span>: <b>{point.y:.0f}' + ReadJSON().static_text["person_unit"] + '</b><br/>'
                  },
                  series: [{
                    name: text["answer"],
                    colorByPoint: true,
                    data: [{
                      name: text["graph_title"][1][0] + question_text["question2"].title[0] + text["graph_title"][1][1],
                      y: oneone,
                    }, {
                      name: text["graph_title"][1][0] + question_text["question2"].title[1] + text["graph_title"][1][1],
                       y: onetwo,
                    }]
                  }]
             }} /> : <p>{text["graph_title"][2][0] + question_text["question1"].title[0] + text["graph_title"][2][1]}</p>}
          {(twoone + twotwo != 0)?
            <Highcharts
              config={{
                  chart: {
                    type: 'pie'
                  },
                  credits : {
                    enabled: false,
                  },
                  title: {
                    text: text["graph_title"][0][0] + question_text["question1"].title[1] + text["graph_title"][0][1]
                  },
                  plotOptions: {
                      pie: {
                          dataLabels: {
                              distance: -30,
                              format: '{point.y:.0f}' + ReadJSON().static_text["person_unit"]
                          },
                          showInLegend: true
                     }
                  },

                  tooltip: {
                    headerFormat: '<span>{series.name}</span><br>',
                    pointFormat: '<span style="color:{point.color}">{point.name}</span>: <b>{point.y:.0f}' + ReadJSON().static_text["person_unit"] + '</b><br/>'
                  },
                  series: [{
                    name: text["answer"],
                    colorByPoint: true,
                    data: [{
                      name: text["graph_title"][1][0] + question_text["question2"].title[1] + text["graph_title"][1][1],
                      y: twoone,
                    }, {
                      name: text["graph_title"][1][0] + question_text["question2"].title[0] + text["graph_title"][1][1],
                       y: twotwo,
                    }]
                  }]
             }} /> : <p>{text["graph_title"][2][0] + question_text["question1"].title[1] + text["graph_title"][2][1]}</p>}
        </span>
      </CardText>
    </Card>
  )
  }
}

export default connect(mapStateToProps)(throttle(Chart, 500))
