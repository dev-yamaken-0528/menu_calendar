var app = new Vue({
  el: "#app",
  data: {
    items: [
      { date:"20171231", menus:["aa","bb","cc","dd","ee","ff","gg"], materials:[] },
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
    ],
  },
  created: function(){
  },
  mounted: function(){
  },
  methods: {
    clickDay: function(event){
      console.log(event.target.id);
    },
    dstart: function(event){
      event.dataTransfer.setData("text", event.target.id);
    },
    dover: function(event){
      event.preventDefault();
    },
    ddrop: function(event){
      var fromdate = event.dataTransfer.getData("text");
      var todate = event.target.id;
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
      event.preventDefault();
    },
  }
})
