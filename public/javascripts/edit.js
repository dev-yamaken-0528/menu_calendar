var app = new Vue({
  el: '#app',
  data: {
    loaddata: [],
    savedata: [],
    selectedRowIndex: 0,
    selectedColIndex: 0
  },
  created: function(){
    var size = document.getElementById('loadsize').value
    var data = document.getElementById('loaddata').value.split(',')
    var index = 0
    for(var i=0; i<size; i++){
      var row = []
      for(var j=0; j<size; j++){
        row.push(data[index])
        index += 1
      }
      this.loaddata.push(row)
      this.savedata.push(row)
    }
    document.getElementById('savedata').value = this.savedata
  },
  mounted: function(){
    var size = document.getElementById('loadsize').value
    for(var i=0; i<size; i++){
      for(var j=0; j<size; j++){
        if(this.savedata[i][j]==1){
          document.getElementById(i+'_'+j).style.backgroundColor = 'rgba(0,0,0,0.6)'
        }
      }
    }
  },
  methods: {
    refreshColor: function(){
      for(var i=0; i<this.savedata.length; i++){
        for(var j=0; j<this.savedata.length; j++){
          document.getElementById(i+'_'+j).style.backgroundColor = 'white'
        }
      }
      for(var i=0; i<this.savedata.length; i++){
        document.getElementById(this.selectedRowIndex+'_'+i).style.backgroundColor = 'rgba(0,0,0,0.2)'
        document.getElementById(i+'_'+this.selectedColIndex).style.backgroundColor = 'rgba(0,0,0,0.2)'
      }
      for(var i=0; i<this.savedata.length; i++){
        for(var j=0; j<this.savedata.length; j++){
          if(this.savedata[i][j] == 1){
            document.getElementById(i+'_'+j).style.backgroundColor = 'rgba(0,0,0,0.6)'
          }
        }
      }
    },
    keyCross: function(key, event){
      if(key=='top'){ this.selectedRowIndex -= 1 }
      if(key=='bottom'){ this.selectedRowIndex += 1 }
      if(key=='left'){ this.selectedColIndex -= 1 }
      if(key=='right'){ this.selectedColIndex += 1 }
      if(this.selectedRowIndex <= -1){ this.selectedRowIndex = this.savedata.length -1 }
      if(this.selectedRowIndex >= this.savedata.length){ this.selectedRowIndex = 0 }
      if(this.selectedColIndex <= -1){ this.selectedColIndex = this.savedata.length -1 }
      if(this.selectedColIndex >= this.savedata.length){ this.selectedColIndex = 0 }
      this.refreshColor()
      event.preventDefault()
    },
    keySelect: function(){
      this.selectedCell(this.selectedRowIndex, this.selectedColIndex)
    },
    selectedCell: function(rowIndex, colIndex){
      if(this.savedata[rowIndex][colIndex] == 0){
        this.savedata[rowIndex][colIndex] = 1
      }else{
        this.savedata[rowIndex][colIndex] = 0
      }
      document.getElementById('savedata').value = this.savedata
      this.selectedRowIndex = rowIndex
      this.selectedColIndex = colIndex
      this.refreshColor()
    },
  },
})
