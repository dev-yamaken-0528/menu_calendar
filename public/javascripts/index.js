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
    copyfrom: "",
  },
  created: function(){
  },
  mounted: function(){
  },
  methods: {
    ts: function(event){
      this.copyfrom = event.target.id;
      this.selectedDay = event.target.id;
    },
    te: function(event){
      this.copyTo(this.copyfrom, event.target.id);
      this.copyfrom = "";
    },
    md: function(event){
      this.copyfrom = event.target.id;
      this.selectedDay = event.target.id;
    },
    mu: function(event){
      this.copyTo(this.copyfrom, event.target.id);
      this.copyfrom = "";
    },
    copyTo: function(fromdate, todate){
      var fromidx=0;
      var toindex=0;
      for(var i=0; i<this.items.length; i++){
        if(this.items[i].date == fromdate){
          fromidx = i;
        }
        if(this.items[i].date == todate){
          toidx = i;
        }
      }
      this.items[toidx].menus = this.items[fromidx].menus;
      this.items[toidx].materials = this.items[fromidx].materials;
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
      var ret=[];
      for(var i=0; i<this.items.length; i++){
        if(this.selectedDay == this.items[i].date){
          ret=this.items[i].materials;
        }
      }
      return ret;
    },
    selectedMenus: function(){
      var ret=[];
      for(var i=0; i<this.items.length; i++){
        if(this.selectedDay == this.items[i].date){
          ret=this.items[i].menus;
        }
      }
      return ret;
    },
  },
})


