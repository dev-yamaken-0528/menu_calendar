var fs = require('fs');

var rows = []

var start = new Date("2018-10-28")
var end = new Date("2020-12-31")
for(var d=start; d<=end; d.setDate(d.getDate()+1)){
  var yyyy = d.getFullYear()
  var mm = ('00'+(d.getMonth()+1)).slice(-2)
  var dd = ('00'+d.getDate()).slice(-2)
  var day = d.getDay()
  var row = { "date":yyyy+mm+dd, "day": day, "menus":[], "materials":[] }
  rows.push(row)
}

fs.writeFileSync("data.json", JSON.stringify(rows))
