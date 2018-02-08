import React, {Component} from 'react';
import isElectron from 'is-electron'
import os, {homedir} from 'os'
import DirectoryTreeNode from '../Assets/JS/DirectoryTreeNode'
import fbStyles from '../Assets/CSS/file-browser.global.css'
import fs from 'fs'
import path from 'path'

class FileBrowser extends Component {
    constructor(props) {
        super(props)

        this.expandCallback = this
            .expandCallback
            .bind(this)

        const rootNode = new DirectoryTreeNode(null, props.startingDir
            ? props.startingDir
            : os.homedir())
        rootNode.expand(this.expandCallback)

        this.state = {
            currentNode: rootNode
        }

    }

    componentWillMount() {
        console.log("isElectron: ", isElectron());
    }

    expandCallback = (success) => {
        if (success) {
            console.log("expand success. update")
            this.forceUpdate()
        } else {
            console.error("Error expanding node")
        }
    }

    backDirectory = () => {
        if (this.state.currentNode.parent) {
            this.setState({currentNode: this.state.currentNode.parent})
        }
    }

    selectedChild = (child) => {
        //Expand the child
        child.expand(this.expandCallback)

        //Set the current node to the child node
        this.setState({currentNode: child})
    }

    selectedFile = (node) => {
        console.log("Selected file: ", node.dir)
        // Ensure is file
        if (fs.statSync(node.dir).isFile()) {
            // Ensure file extension is .json
            if (path.extname(node.dir) == '.json') {
                this
                    .props
                    .onSelectJSONFile(node.dir)
            } else {
                console.log("File is not .json!")
            }
        } else {
            console.log("Selected child is not a file!")
        }

    }

    render() {
        if (isElectron()) {
            return (
                <div className="file-browser">
                    <span className="horizontal">
                        <button onClick={this.backDirectory} disabled={!this.state.currentNode.parent}>Back</button>
                        <p>
                            {this.state.currentNode.dir}
                        </p>
                    </span>
                    <ul className="menu">
                        {this
                            .state
                            .currentNode
                            .children
                            .map((child, index) => {
                                if (child.isDir) {
                                    return <li key={index} className="dir" onClick={() => this.selectedChild(child)}>
                                        {child.name}
                                    </li>
                                } else {
                                    return <li
                                        key={index}
                                        className={"file" + (path.extname(child.dir) == '.json'
                                        ? " available"
                                        : null)}
                                        onClick={() => this.selectedFile(child)}>
                                        {child.name}
                                    </li>
                                }
                            })}
                    </ul>
                </div>
            )

        } else {
            return (
                <div>
                    this is the react version
                </div>
            )
        }

    }
}

export default FileBrowser