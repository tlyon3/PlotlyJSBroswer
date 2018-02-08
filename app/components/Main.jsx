import React, { Component } from 'react';
import FileBrowser from './FileBrowser'
import Plotly from './Plotly'
import SplitPane from 'react-split-pane'
import "../Assets/CSS/main.global.css"
    
class Main extends Component {
    constructor(props){
        super(props)

        this.state = {
            selectedFile: ""
        }

        this.didSelectJSONFile = this.didSelectJSONFile.bind(this)
    }

    didSelectJSONFile = (jsonFilePath) => {
        console.log("Did select json file: ", jsonFilePath)
        this.setState({
            selectedFile: jsonFilePath
        })
    }

    render() { 
        return (
            <div>
                <SplitPane split="vertical" minSize={100} defaultSize={200}>
                    <FileBrowser onSelectJSONFile={this.didSelectJSONFile}/>
                    <Plotly jsonFilePath={this.state.selectedFile}/>
                </SplitPane>
                
            </div>
        )
    }
}

export default Main