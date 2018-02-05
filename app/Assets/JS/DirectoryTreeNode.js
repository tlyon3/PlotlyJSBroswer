const fs = require('fs')
const path = require('path')


class DirectoryTreeNode {
    constructor(parent, name){
        const fullDir = parent ? path.join(parent.dir, name) : name

        this.parent = parent
        this.dir = fullDir
        this.children = []
        this.expanded = false
        this.isDir = fs.statSync(fullDir).isDirectory()
        this.name = name
    }

    expand = (callback) => {
        console.log("Expanding node: ", this)
        if(!this.expanded && this.dir && this.isDir){
            return fs.readdir(this.dir, (err, files) => {
                if(err){
                    this.expanded = true
                    callback(false)
                    return false
                } else {
                    files.filter(item => !(/(^|\/)\.[^\/\.]/g).test(item)).forEach(file => {
                        this.children.push(new DirectoryTreeNode(this, file))
                    });
                    this.expanded = true
                    callback(true)
                    return true
                }
            })
            
        } else {
            callback(false)
            return false
        }
    }
}

export default DirectoryTreeNode