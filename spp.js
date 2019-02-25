'use strict'

const express = require('express')
const fs = require('fs')
const ejs = require("ejs")
const bodyParser = require("body-parser")

const app = express()
app.set("view engine", "ejs")

app.use('/css', express.static(process.cwd() + '/css/'))

const urlencodedParser = bodyParser.urlencoded({extended: false})

var tasks = [{name: "Standard beginning task", date: "2019--01", file: "", cheked: "false"}]
 
app.get("/", urlencodedParser, function (request, response) {
    response.render("main", {
        title: "My Tasks",
		array: tasks
    })
})

app.post("/task", urlencodedParser, function (request, response) {
    if(!request.body) return response.sendStatus(400)
	tasks.push({name: request.body.taskName, date: request.body.taskDate, file: request.body.taskFile, cheked:"false"})
    response.render("main", {
        title: "My Tasks",
		array: tasks
    })
})

app.post("/ready", urlencodedParser, function (request, response) {
    if(!request.body) return response.sendStatus(400);
	if (tasks[request.body.index].cheked == "true"){
		tasks[request.body.index].cheked = "false"
	} else {
		tasks[request.body.index].cheked = "true"
	}
    response.render("main", {
        title: "My Tasks",
		array: tasks
    })
})

app.post("/del", urlencodedParser, function (request, response) {
    if(!request.body) return response.sendStatus(400)
	tasks.splice(request.body.index, 1)
    response.render("main", {
        title: "My Tasks",
		array: tasks
    })
})

app.listen(8080);
