import React, { Component } from 'react';
import FileBrowser from './FileBrowser'
import Plotly from './Plotly'

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
                <FileBrowser onSelectJSONFile={this.didSelectJSONFile}/>
                <Plotly jsonFilePath={this.state.selectedFile}/>
            </div>
        )
    }
}

export default Main