import React from 'react'
import { connect } from 'react-redux'

import FloatingActionButton from 'material-ui/FloatingActionButton'
import FileFileDownload from 'material-ui/svg-icons/file/file-download'

import { ReadJSON } from '../util/ReadJSON'

const mapStateToProps = ({ participants, question_text }) => ({
  participants, question_text
})

const DownloadButton = ({ participants, question_text, style, disabled }) => (
  <FloatingActionButton
    style={style}
    disabled={disabled}
    onClick={() => {
      const text = ReadJSON().static_text
      var fileName = "allais_paradox.csv"

      var content 
      = text["title"] + "\n" 
      + text["download"]["date"] + "," + new Date() + "\n"
      + text["download"]["people"] + "," + Object.keys(participants).length + "\n"
      + text["id"] + "," + text["download"]["questions"][0] + "," + text["download"]["questions"][1] + "\n"
      + Object.keys(participants).map(id => [id, (participants[id].question1 != 0)? question_text["question1"].title[participants[id].question1 - 1] : "未回答", (participants[id].question2 != 0)? question_text["question2"].title[participants[id].question2 - 1] : "未回答"].join(',')).join("\n")
      var bom = new Uint8Array([0xEF, 0xBB, 0xBF]);
      var blob = new Blob([bom,content]);
      var url = window.URL || window.webkitURL;
      var blobURL = url.createObjectURL(blob);

      if(window.navigator.msSaveBlob){
        window.navigator.msSaveBlob(blob, fileName)
      }
      else{
        var a = document.createElement('a');
         a.download = fileName;
         a.href = blobURL;
         a.click();  
       }
      }
    }
    ><FileFileDownload /></FloatingActionButton>
)

export default connect(mapStateToProps)(DownloadButton) 
