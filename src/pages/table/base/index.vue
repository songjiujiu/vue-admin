<!--
/**
 * @intro: 基本表格.
 */
-->
<template>
  <ui-container>
    <div slot="header" style="display:flex;">
      <div style="flex:1; margin-right:15px;">
        <el-input v-model="value1" placeholder="请输入大哥名"></el-input>
      </div>
      <div style="flex:1; margin-right:15px;">
        <el-date-picker
          v-model="value2"
          type="daterange"
          align="right"
          unlink-panels
          range-separator="至"
          start-placeholder="开始日期"
          end-placeholder="结束日期"
          :picker-options="pickerOptions">
        </el-date-picker>
      </div>
      <div style="flex:1; margin-right:10px;">
        <el-radio-group v-model="resource" style="margin-top:12px;">
          <el-radio label="最近一周"></el-radio>
          <el-radio label="最近一个月"></el-radio>
          <el-radio label="最近半年"></el-radio>
        </el-radio-group>
      </div>
      <div><el-button type="primary">获取</el-button></div>
    </div>
    <div class="ul-itemlist">
      <ul>
        <li v-for="(item,index) in tableData.icansee_group_roles" :key="index" >
          <div class="xuhao-num">{{index+1}}</div>
          <div @click="linkNameFn(item)" style="width:20%;cursor: pointer; float:left;">
            <div class="head-img"><img :src="item.role_avatar" /></div>
            <div class="text-content"><span>{{item.role_name}}</span><i>直播中</i></div>
          </div>
          <div style="display:flex; justify-content: end; cursor: pointer;" @click="clickZbMessage(item)">
            <div class="text-tanmu">
              <span>弹幕</span>
              <span>{{item.role_stat_data_in.total.chat}}</span>
            </div>
            <div class="text-liwu">
              <span>礼物</span>
              <span>{{item.role_stat_data_in.total.gift}}</span>
            </div>
            <div class="text-dage">
              <span>大哥</span>
              <span>{{item.role_stat_data_in.total.golddaddy}}</span>
            </div>
          </div>
        </li>
      </ul>
    </div>
  </ui-container>
</template>
<script type="text/javascript">
export default {
  data () {
    return {
      pickerOptions: {
          disabledDate(time) {
            return time.getTime() > Date.now();
          },
          shortcuts: [{
            text: '今天',
            onClick(picker) {
              picker.$emit('pick', new Date());
            }
          }, {
            text: '昨天',
            onClick(picker) {
              const date = new Date();
              date.setTime(date.getTime() - 3600 * 1000 * 24);
              picker.$emit('pick', date);
            }
          }, {
            text: '一周前',
            onClick(picker) {
              const date = new Date();
              date.setTime(date.getTime() - 3600 * 1000 * 24 * 7);
              picker.$emit('pick', date);
            }
          }]
        },
      value1:"",
      value2:"",
      resource:"",
      tableData:[],
    }
  },
  mounted(){
     this.zbListItemFn()
  },
  methods: {
    async zbListItemFn(){
      const {$refs, $api, form, $message, $notify, setUserInfo, $router} = this
      try{
        const result = await $api.zhubo.zbindex()
        this.tableData = result.data
      }catch(error){
        console.log(error)
      }
    },
    clickZbMessage(row){
      this.$router.push('/table/sort?roleId='+row.role_id)
    },
    linkNameFn(row){
      this.$router.push('/table/anchorProfile?roleId='+row.role_id)
    }
  }
}
</script>
<style scoped>
.ul-itemlist{
  width: 100%;
  height: auto;
}
.ul-itemlist ul{
  margin: 0px;
  padding: 0px;
  list-style: none;
}
.ul-itemlist ul li{
  list-style: none;
  width: 100%;
  min-height: 50px;
  line-height: 25px;
  border:1px solid #eee;
  padding: 10px 0 10px 10px;
}
.xuhao-num{
  width: 24px;
  height: 24px;
  line-height: 24px;
  text-align: center;
  color: #fff;
  background: #333;
  border-radius: 100% 100%;
  margin-right: 8px;
  margin-top: 13px;
  float: left;
}
.head-img{
  width: 31px;
  height: 32px;
  margin-right: 8px;
  margin-top: 8px;
  float: left;
}
.text-content{
  line-height: 50px;
}
.text-content span,.text-content i{
  display: block;
  float: left;
}
.text-content i{
  padding: 3px 5px;
  color: #fff;
  background: #4b7828;
  line-height: 16px;
  font-size: 14px;
  border-radius: 4px 4px;
  font-style: normal;
  margin: 13px 10px 0 5px;
}
.text-tanmu{
    padding: 0px 24px;
    text-align: center;
}
.text-tanmu span{
  display: block;
}
.text-liwu{
    padding: 0px 24px;
    text-align: center;
}
.text-liwu span{
  display: block;
}
.text-dage{
    padding: 0px 24px;
    text-align: center;
}
.text-dage span{
  display: block;
}
</style>