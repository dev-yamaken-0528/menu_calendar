var app = new Vue({
  el: '#app',
  data: {
    savedata: [],
    selectedRowIndex: 0,
    selectedColIndex: 0,
    selected: '',
    options: [
      { text: '5x5', value: 5 },
      { text: '10x10', value: 10 },
      { text: '15x15', value: 15 },
      { text: '20x20', value: 20 },
      { text: '25x25', value: 25 },
      { text: '30x30', value: 30 }
    ]
  },
  created: function(){
    let lastTouch = 0
    document.addEventListener('touchend', event => {
      const now = window.performance.now()
      if(now - lastTouch <= 500){
        event.preventDefault()
      }
    }, {passive: false})
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
    changeSize: function(size){
      this.savedata = []
      for(var i=0; i<size; i++){
        this.savedata[i] = Array(size)
        this.savedata[i].fill(0)
      }
      document.getElementById('savedata').value = this.savedata
      this.selectedRowIndex = 0
      this.selectedColIndex = 0
    },
  }
})
