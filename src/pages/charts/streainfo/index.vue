<!--
/**
 * @intro: 排序表格.
 */
-->
<template>
  <ui-container>
    <div class="text-content" style="position: relative; height:100%;">
      <div style="width:100%; height: 100%; overflow: hidden;">
        <div class="content-header">
          <div class="head-img"><img :src="messageData.role_avatar?messageData.role_avatar:''" /></div>
          <div class="text-content-pople"><span>{{messageData.role_name?messageData.role_name:''}}</span></div>
          <div style="display:flex; justify-content: right; padding-top:8px;">
            <div class="text-tanmu">
              <span>弹幕</span>
              <span>{{messageData.chat?messageData.chat:''}}</span>
            </div>
            <div class="text-guankan">
              <span>打赏金额</span>
              <span>{{messageData.total_gift_monetary_value}}</span>
            </div>
            <div class="text-liwu">
              <span>观看主播</span>
              <span>{{messageData.gift?messageData.gift:''}}</span>
            </div>
            <div style="float:right; margin-left:55%">
              <el-button>档案</el-button>
            </div>
          </div>
        </div>
        <div class="content-message" style="border-top:1px solid #eee; margin-top:15px;">
          <div style="margin-top:15px; width:100%;">
            <div style="float:left; margin-right:40px;">
              <el-checkbox-group v-model="resource.type" style="margin-top:12px;">
                <el-checkbox label="弹幕" name="type"></el-checkbox>
                <el-checkbox label="礼物" name="type"></el-checkbox>
              </el-checkbox-group>
            </div>
            <div style="float:left; margin-right:40px;">
              <el-input v-model="value1" placeholder="请输入主播名"></el-input>
            </div>
            <div style="float:left;">
              <el-date-picker
                v-model="value2"
                type="date"
                placeholder="选择日期">
              </el-date-picker>
            </div>
            <div style="display:flex; justify-content: right; margin-right: 30px; line-height:40px;">
              <span>总条数：</span><font>{{messageData.record_count}}</font>
            </div>
          </div>
        </div>
        <div class="content-msg-item" style="width:100%; border-top:1px solid #eee; margin-top:15px;">
          <div style="display:flex; width:70%; margin-top:15px;">
            <span style="color:#65c2ee; min-width:15%; margin-right:10px;">[主播直播间]</span>
            <span style="margin-right:10px;">[时间]</span>
            <span style="margin-right:10px;">[大哥行为]</span>
          </div>
          <div style="display:flex; width:70%; margin-top:10px;" v-for="(item,index) in messageListData" :key="index">
            <span style="min-width:15%; color:#65c2ee; margin-right:10px;">{{item.anchor_role_name}}</span>
            <span style="margin-right:10px;">{{item.created_at}}</span>
            <span style="margin-right:10px;">{{item.record_content}}</span>
          </div>
        </div>
      </div>
      <div style="position:absolute; right:5%; bottom:10%;"><img src="../../../assets/images/vido.png" /></div>
    </div>
  </ui-container>
</template>
<script type="text/javascript">
export default {
  name: 'streainfo',
  data(){
    return {
      resource:{
        type:""
      },
      value1:"",
      value2:"",
      messageData:{},
      messageListData:[]
    }
  },
  mounted(){
     this.zbMessageFn()
  },
  methods: {
    async zbMessageFn(){
      const {$refs, $api, form, $message, $notify, setUserInfo, $router} = this
      const roleIdNum = this.$route.query.roleId
      try{
        const result = await $api.eldestbrother.golddaddyIdLive(roleIdNum)
        this.messageData = result.data
        this.zbrecordsFn(result.data)
      }catch(error){
        console.log(error)
      }
    },
    async zbrecordsFn(row){
      const {$refs, $api, form, $message, $notify, setUserInfo, $router} = this
      const roleIdNum = this.$route.query.roleId
      const dataObj={
        role_id:String(roleIdNum),
        start_ts:String(row.stat_start),
        end_ts:String(row.stat_end),
        // type:this.resource.type,
        // content:this.value2,
        page:1,
      }
      try{
        const result = await $api.eldestbrother.goldrRecords(dataObj)
        this.messageListData = result.data.records_info.records
      }catch(error){
        console.log(error)
      }
    },
  }
}
</script>
<style lang="scss" scoped>
.head-img{
  width: 31px;
  height: 32px;
  margin-right: 8px;
  margin-top: 8px;
  float: left;
}
.text-content-pople{
  line-height: 50px;
  float: left;
  color: #65c2ee;
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
.text-guankan{
    padding: 0px 24px;
    text-align: center;
}
.text-guankan span{
  display: block;
}
.top-content span{
  display: block;
  width: 49%;
  float: left;
  margin-top: 15px;
}
.top-content span i{
  font-style: normal;
  margin-right: 15px;
  color: #65c2ee;
}
.top-content span u{
  text-decoration:none;
}
</style>
