
new Vue({
  el: '#app',
  data () {
    return { 
        myStar: false,
        // nav part
        nowNav: 0,
        // toogle add list section
        showAddList: false,
        showInputTop: true,
        // edit list
        nowClickNum: -1,
        
        nowList: {
          University: '',
          tTime: '',
          country: '',
          level: '',
          fileList: '',
          description: ''
        },
        filterLists: [],
        programlist: [{
          University: 'KMUTT',
          tTime: '2018-06-06',
          country: 'Japan',
          level: 'Ungraduate',
          fileList: '',
          description: 'hannah',
          status: false,
          myStar: false
        },{
          University: 'KU',
          tTime: '',
          country: 'Taiwan',
          level: 'Postgrade',
          fileList: '',
          description: 'hahaha',
          status: false,
          myStar: false,
          fileTime: ''
        }]
    }
  },
  mounted () {
    this.filterLists = this.programlist;
  },
  
  methods:{
    myDate(date){
      return(new Date(date).getMonth()+1)+'/'+new Date(date).getDate();
    },
    isStar(index){
      this.programlist[index].myStar = !this.programlist[index].myStar;
    },
    //  Add Task ----------
    goAddTask(uni = '', deadline = '', coun = '', lv = '', fileList = [], description= '') {
      //programlist.push
      this.programlist.push({
         University: uni,
          tTime: deadline,
          country: coun,
          level: lv,
          fileList: fileList,
          description: description,
          status: false,
          myStar: false
      });
      
      this.showAddList = false;
      //reset
      this.resetInput();

    },
    resetInput () {
       this.nowList =  {
          University: '',
          tTime: '',
          country: '',
          level: '',
          fileList: [],
          description: ''
        }
    },
    // upload
    handleChange(index) {
      
      if(index != undefined){
        console.log(this.$refs['fileInput'+index])
        this.programlist[index].fileList = this.$refs['fileInput'+index][0].files[0].name;
      }else{
        this.nowList.fileList = this.$refs.fileInput.files[0].name;
      }
      
    },
    //cancel
    goCancel(index){
      if(index){
        // sub list
        this.nowClickNum = -1
      }else{
        // main add list
        this.showAddList = false;
      }
      this.resetInput();
      
    },
    // Edit
    goEdit (index, uni = '', deadline = '',coun = '',lv = '', fileList = [], description= '') {
        this.programlist[index].University = uni;
        this.programlist[index].tTime = deadline;
        this.programlist[index].country = coun;
        this.programlist[index].level = lv;
        this.programlist[index].fileList = fileList;
        this.programlist[index].description = description;
       console.log('uni:  ', uni)
      console.log(index, this.programlist)
      this.nowClickNum = -1;
      //reset
      this.resetInput();
    },
    // Filter Nav
    navFilter(index, navStatus){
      // actice tab nav
      this.nowNav = index;
      this.showAddList = false;
      // filter
      if(navStatus != 'all'){
        this.showInputTop = false;
        this.filterLists =  this.programlist.filter(function(item){
            return item.status == navStatus;
        })
      }else{
        this.showInputTop = true;
        this.filterLists =  this.programlist
      }
      
      
    }
  }
})