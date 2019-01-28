Vue.component('modal', {
  template: '#modal-template'
})

var app = new Vue({
  el: "#app",
  data: {
    yyyymm: "",
    items: [
      { date:"", day:0, menus:[], materials:[] },
      { date:"", day:0, menus:[], materials:[] },
      { date:"", day:0, menus:[], materials:[] },
      { date:"", day:0, menus:[], materials:[] },
      { date:"", day:0, menus:[], materials:[] },
      { date:"", day:0, menus:[], materials:[] },
      { date:"", day:0, menus:[], materials:[] },
      { date:"", day:0, menus:[], materials:[] },
      { date:"", day:0, menus:[], materials:[] },
      { date:"", day:0, menus:[], materials:[] },
      { date:"", day:0, menus:[], materials:[] },
      { date:"", day:0, menus:[], materials:[] },
      { date:"", day:0, menus:[], materials:[] },
      { date:"", day:0, menus:[], materials:[] },
      { date:"", day:0, menus:[], materials:[] },
      { date:"", day:0, menus:[], materials:[] },
      { date:"", day:0, menus:[], materials:[] },
      { date:"", day:0, menus:[], materials:[] },
      { date:"", day:0, menus:[], materials:[] },
      { date:"", day:0, menus:[], materials:[] },
      { date:"", day:0, menus:[], materials:[] },
      { date:"", day:0, menus:[], materials:[] },
      { date:"", day:0, menus:[], materials:[] },
      { date:"", day:0, menus:[], materials:[] },
      { date:"", day:0, menus:[], materials:[] },
      { date:"", day:0, menus:[], materials:[] },
      { date:"", day:0, menus:[], materials:[] },
      { date:"", day:0, menus:[], materials:[] },
      { date:"", day:0, menus:[], materials:[] },
      { date:"", day:0, menus:[], materials:[] },
      { date:"", day:0, menus:[], materials:[] },
      { date:"", day:0, menus:[], materials:[] },
      { date:"", day:0, menus:[], materials:[] },
      { date:"", day:0, menus:[], materials:[] },
      { date:"", day:0, menus:[], materials:[] },
      { date:"", day:0, menus:[], materials:[] },
      { date:"", day:0, menus:[], materials:[] },
      { date:"", day:0, menus:[], materials:[] },
      { date:"", day:0, menus:[], materials:[] },
      { date:"", day:0, menus:[], materials:[] },
      { date:"", day:0, menus:[], materials:[] },
      { date:"", day:0, menus:[], materials:[] },
    ],
    toDay: "",
    selectedDay: "",
    isCopy: false,
    copyFrom: "",
    msg: "",
		showModal: false,
    modalMenus: [],
    modalMaterials: [],
    menuText: "",
    materialText: "",
    materialWeek: [],
    selectedWeek: "",
  },
  created: function(){
  },
  mounted: function(){
    var d = new Date()
    this.yyyymm = d.getFullYear() + ('00'+(d.getMonth()+1)).slice(-2)
    axios.get('/menucalendar/yyyymm/'+this.yyyymm)
      .then((res)=>{
        this.items = res.data
      })
      .then(()=>{
        this.toDay = d.getFullYear() + ('00'+(d.getMonth()+1)).slice(-2) + ('00'+d.getDate()).slice(-2)
        this.selectedDay = this.toDay
        document.getElementById(this.selectedDay).style.backgroundColor = "gray"
      })
  },
  methods: {
    saveBtnClick: function(){
      axios.post('/menucalendar/save', {saveitems:this.items})
        .then((res)=>{
          this.msg = "保存しました"
        })
    },
    prevBtnClick: function(){
      if(this.yyyymm <= '201811'){
        return false;
      }
      var d = new Date( this.yyyymm.slice(0,4) + "-" + this.yyyymm.slice(4,6) + "-01" )
      d.setMonth(d.getMonth()-1)
      this.yyyymm = d.getFullYear() + ('00'+(d.getMonth()+1)).slice(-2)
      axios.get('/menucalendar/yyyymm/'+this.yyyymm)
        .then((res)=>{
          if(this.selectedDay != ""){
            document.getElementById(this.selectedDay).style.backgroundColor = "white"
          }
          this.selectedDay = ""
          this.selectedWeek = ""
          this.items = res.data
        })
    },
    nextBtnClick: function(){
      var d = new Date( this.yyyymm.slice(0,4) + "-" + this.yyyymm.slice(4,6) + "-01" )
      d.setMonth(d.getMonth()+1)
      this.yyyymm = d.getFullYear() + ('00'+(d.getMonth()+1)).slice(-2)
      axios.get('/menucalendar/yyyymm/'+this.yyyymm)
        .then((res)=>{
          if(this.selectedDay != ""){
            document.getElementById(this.selectedDay).style.backgroundColor = "white"
          }
          this.selectedDay = ""
          this.selectedWeek = ""
          this.items = res.data
        })
    },
    clickWeek: function(week){
      this.selectedWeek = week
      this.materialWeek = []
      var weekItems = this.weekItems(week)
      for(var i=0; i<weekItems.length; i++){
        for(var j=0; j<weekItems[i].materials.length; j++){
          if(this.materialWeek.indexOf(weekItems[i].materials[j]) == -1){
            this.materialWeek.push(weekItems[i].materials[j])
          }
        }
      }
    },
    closeModal: function(){
      this.showModal = false
      var idx = this.getIdx(this.selectedDay)
      this.items[idx].menus = this.modalMenus.slice()
      this.items[idx].materials = this.modalMaterials.slice()
      this.menuText = ""
      this.materialText = ""
    },
    delMenu: function(idx){
      this.modalMenus.splice(idx,1)
    },
    delMaterial: function(idx){
      this.modalMaterials.splice(idx,1)
    },
    getIdx: function(date){
      var ret=-1;
      for(var i=0; i<this.items.length; i++){
        if(this.items[i].date==date){
          ret = i
        }
      }
      return ret
    },
    addMenu: function(){
      this.modalMenus.push(this.menuText)
      this.menuText = ""
    },
    addMaterial: function(){
      this.modalMaterials.push(this.materialText)
      this.materialText = ""
    },
    editBtnClick: function(){
      var idx = this.getIdx(this.selectedDay)
      this.modalMenus = this.items[idx].menus.slice()
      this.modalMaterials = this.items[idx].materials.slice()
      this.showModal = true
    },
    select: function(event){
      this.msg = ""
      if(this.selectedDay != ""){
        document.getElementById(this.selectedDay).style.backgroundColor = "white"
      }
      this.selectedDay = event.target.id
      document.getElementById(this.selectedDay).style.backgroundColor = "gray"
      if(this.isCopy){
        this.copy(this.copyFrom, this.selectedDay)
        this.isCopy = false
        this.copyFrom = ""
      }
    },
    copyBtnClick: function(){
      if(this.selectedDay == ""){
        this.msg = "複製する日付を選んでね"
        return false
      }
      this.isCopy = true
      this.copyFrom = this.selectedDay
      this.msg = "複製先の日付を選んでね"
    },
    copy: function(fromdate, todate){
      var toidx = this.getIdx(todate)
      var fromidx = this.getIdx(fromdate)
      this.items[toidx].menus = this.items[fromidx].menus.slice();
      this.items[toidx].materials = this.items[fromidx].materials.slice();
    },
    weekItems: function(week){
      var idx = 0;
      var max = 0;
      if(week==1){ idx=0;  max=6; }
      if(week==2){ idx=7;  max=13; }
      if(week==3){ idx=14; max=20; }
      if(week==4){ idx=21; max=27; }
      if(week==5){ idx=28; max=34; }
      if(week==6){ idx=35; max=41; }
      var ret = [];
      for(idx; idx<=max; idx++){
        ret.push(this.items[idx])
      }
      return ret;
    },
  },
  computed: {
    selectedMaterials: function(){
      if(this.selectedDay){
        return this.items[this.getIdx(this.selectedDay)].materials
      }
    },
    selectedMenus: function(){
      if(this.selectedDay){
        return this.items[this.getIdx(this.selectedDay)].menus
      }
    },
  },
})


