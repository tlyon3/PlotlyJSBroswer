import React, { Component } from 'react';
import Plot from 'react-plotly.js'
import fs from 'fs'

class Plotly extends Component {
    constructor(props){
        super(props)
        
        this.state = {
            json: null,
            filePath: ""
        }   
        
        if(props.jsonFilePath && props.jsonFilePath !== ""){
            // Load json from fs
            fs.readFile(props.jsonFilePath, "utf8", (err, data) => {
                if(err){
                    this.setState({
                        error: err
                    })
                } else if (data){
                    this.setState({
                        json: JSON.parse(data),
                        filePath: props.jsonFilePath
                    })
                } else {
                    this.setState({
                        error: "No data in file!"
                    })
                }
            })
        }
    }

    componentWillReceiveProps = (props) => {
        if(props.jsonFilePath && props.jsonFilePath !== ""){
            // Load json from fs
            fs.readFile(props.jsonFilePath, 'utf8', (err, data) => {
                if(err){
                    this.setState({
                        error: err
                    })
                } else if (data){
                    this.setState({
                        json: JSON.parse(data),
                        filePath: props.jsonFilePath
                    })
                } else {
                    this.setState({
                        error: "No data in file!"
                    })
                }
            })
        }
    }

    render() {
        return (
            <div className="plot-container">
                {this.state.json 
                ? <Plot data={this.state.json.data} layout={this.state.json.layout}/>
                : <div>
                    <h3>No data supplied</h3>
                </div> }
                {this.state.error
                ?<h2>Error reading file</h2>
                : null}
            </div>
        )
    }
}

export default Plotly