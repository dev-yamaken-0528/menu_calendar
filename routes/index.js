var express = require('express')
var router = express.Router()
var fs = require('fs')

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index')
})



router.post('/save', function(req, res, next){
  var saveitems = req.body.saveitems
  var items =  JSON.parse(fs.readFileSync('./data/data.json', 'utf8'))
  for(var i=0; i<items.length; i++){
    for(var j=0; j<saveitems.length; j++){
      if(items[i].date == saveitems[j].date){
        items[i] = saveitems[j]
      }
    }
  }
  fs.writeFileSync("./data/data.json", JSON.stringify(items))
  res.send("save")
})



router.get('/yyyymm/:yyyymm', function(req, res, next){
  var yyyy = req.params.yyyymm.slice(0,4)
  var mm = req.params.yyyymm.slice(4,6)
  // 当月 前月 次月 の 年月 を取得する
  var date = new Date(yyyy+"-"+mm+"-01")
  var currentYM = date.getFullYear() + ('00'+(date.getMonth()+1)).slice(-2)
  date.setMonth(date.getMonth()-1)
  var previousYM = date.getFullYear() + ('00'+(date.getMonth()+1)).slice(-2)
  date.setMonth(date.getMonth()+2)
  var nextYM = date.getFullYear() + ('00'+(date.getMonth()+1)).slice(-2)
  // 当月 前月 次月 の 配列 を取得する
  var currentItems = []
  var previousItems = []
  var nextItems = []
  var items =  JSON.parse(fs.readFileSync('./data/data.json', 'utf8'))
  for(var i=0; i<items.length; i++){
    var item = items[i]
    var ym = item.date.slice(0,6)
    if(ym == currentYM){
      currentItems.push(item)
    }
    if(ym == previousYM){
      previousItems.push(item)
    }
    if(ym == nextYM){
      nextItems.push(item)
    }
  }
  // 6週分(42)の配列
  var items = []
  // 前月分を追加する
  var idx = previousItems.length-1
  for(var i=currentItems[0].day; i>0; i--){
    items.unshift(previousItems[idx])
    idx--
  }
  // 当月分を追加する
  for(var i=0; i<currentItems.length; i++){
    items.push(currentItems[i])
  }
  // 次月分(42の不足分)を取得する
  var idx = 0
  for(var i=(42-items.length); i>0; i--){
    items.push(nextItems[idx])
    idx++
  }
  res.send(items)
})

module.exports = router;
