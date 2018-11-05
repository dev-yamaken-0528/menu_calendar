Vue.component('modal', {
  template: '#modal-template'
})

var app = new Vue({
  el: "#app",
  data: {
    items: [
      { date:"20171231", menus:["カレー","味噌汁"], materials:["肉","たまご"] },
      { date:"20180101", menus:[], materials:[] },
      { date:"20180102", menus:[], materials:[] },
      { date:"20180103", menus:[], materials:[] },
      { date:"20180104", menus:[], materials:[] },
      { date:"20180105", menus:[], materials:[] },
      { date:"20180106", menus:[], materials:[] },
      { date:"20180107", menus:[], materials:[] },
      { date:"20180108", menus:[], materials:[] },
      { date:"20180109", menus:[], materials:[] },
      { date:"20180110", menus:[], materials:[] },
      { date:"20180111", menus:[], materials:[] },
      { date:"20180112", menus:[], materials:[] },
      { date:"20180113", menus:[], materials:[] },
      { date:"20180114", menus:[], materials:[] },
      { date:"20180115", menus:[], materials:[] },
      { date:"20180116", menus:[], materials:[] },
      { date:"20180117", menus:[], materials:[] },
      { date:"20180118", menus:[], materials:[] },
      { date:"20180119", menus:[], materials:[] },
      { date:"20180120", menus:[], materials:[] },
      { date:"20180121", menus:[], materials:[] },
      { date:"20180122", menus:[], materials:[] },
      { date:"20180123", menus:[], materials:[] },
      { date:"20180124", menus:[], materials:[] },
      { date:"20180125", menus:[], materials:[] },
      { date:"20180126", menus:[], materials:[] },
      { date:"20180127", menus:[], materials:[] },
      { date:"20180128", menus:[], materials:[] },
      { date:"20180129", menus:[], materials:[] },
      { date:"20180130", menus:[], materials:[] },
      { date:"20180131", menus:[], materials:[] },
      { date:"20180201", menus:[], materials:[] },
      { date:"20180202", menus:[], materials:[] },
      { date:"20180203", menus:[], materials:[] },
      { date:"20180204", menus:[], materials:[] },
      { date:"20180205", menus:[], materials:[] },
      { date:"20180206", menus:[], materials:[] },
      { date:"20180207", menus:[], materials:[] },
      { date:"20180208", menus:[], materials:[] },
      { date:"20180209", menus:[], materials:[] },
      { date:"20180210", menus:[], materials:[] },
    ],
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
  },
  methods: {
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
      this.selectedDay = event.target.id
      if(this.isCopy){
        this.copy(this.copyFrom, this.selectedDay)
        this.isCopy = false
        this.copyFrom = ""
      }
    },
    copyBtnClick: function(){
      if(this.selectedDay == ""){
        this.msg = "コピーする日付を選んでね"
        return false
      }
      this.isCopy = true
      this.copyFrom = this.selectedDay
      this.msg = "コピー先の日付を選んでね"
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


