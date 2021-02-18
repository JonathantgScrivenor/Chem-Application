const http = require('http')
const fs = require('fs')
const port = 8080

const server = http.createServer(function(req, res) {
    res.writeHead(200, {'Content-Type': 'text/html'})//if was on plain will be seen as text file
    fs.readFile('project.html', function(error, data){
        if(error){
            res.writeHead(404)
            res.write('Error: File Not Found')
        } else{
            res.write(data)
        }
        res.end()
    })
    //res.write('This app will contain help for Chemistry I students')
    //res.end()
})

server.listen(port, function(error){
    if(error){
        console.log('Problem here', errror)
    }else{
        console.log('Yes we hear you on port ' + port)
    }
})

