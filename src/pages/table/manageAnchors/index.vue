<!--
/**
 * @intro: 基本表格.
 */
-->
<template>
  <ui-container>
    <div slot="header" style="display:flex;">
      <div style="flex:1; margin-right:15px;">
        <span style="display: block;">平台：</span>
        <el-select v-model="value1" placeholder="请选择平台">
          <el-option v-for="item in options" :key="item.value" :value="item.value" :label="item.title"></el-option>
        </el-select>
      </div>
      <div style="flex:1; margin-right:15px;">
        <span>主播：</span>
        <el-input v-model="zhuboName" placeholder="请输入主播名"></el-input>
      </div>
      <div style="flex:1; margin-right:15px;">
        <span>监控时间：</span>
        <el-input v-model="timeValue" placeholder="请输入监控时间N天"></el-input>
      </div>
      <div><el-button type="primary" style="margin-top:18px;" @click="addPayHandel">付费添加</el-button></div>
    </div>
    <div class="ul-itemlist">
      <ul>
        <li v-for="(item,index) in manageData.all_roles" :key="index">
          <div class="xuhao-num">{{index+1}}</div>
          <div class="head-img"><img :src="item.role_avatar" /></div>
          <div class="text-content"><span>{{item.role_name}}</span><i>直播中</i></div>
          <div style="display:flex; justify-content: end;">
            <div class="text-time"><span>到期时间：</span><i>{{item.expiry_date}}</i></div>
            <div class="text-tanmu">
              <el-button @click="renevalAddFn(item)">续期</el-button>
            </div>
            <div class="text-liwu">
              <el-button @click="deleteHandel(item)">删除</el-button>
            </div>
          </div>
        </li>
      </ul>
    </div>
    <el-dialog
    title="提示"
    :visible.sync="dialogVisible"
    width="40%"
    :before-close="handleClose">
      <el-form ref="form" :model="formData" label-width="80px">
        <el-form-item label="时间类型" prop="timeType">
          <el-select v-model="formData.timeType" placeholder="请选择时间类型">
            <el-option v-for="item in optionsTimeType" :key="item.id" :value="item.name" :label="item.name"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="时间值" prop="timeValue">
          <el-input v-model="formData.timeValue" placeholder="请输入时间值"></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="resultHandelFn">确 定</el-button>
      </span>
    </el-dialog>
  </ui-container>
</template>
<script type="text/javascript">
export default {
  name: 'TableBase',
  data(){
    return{
      value1:'',
      zhuboName:'',
      timeValue:'',
      options:[
        {
          value:"1",
          title:'douyin'
        },
        {
          value:"2",
          title:'bilibili'
        },
        {
          value:"3",
          title:'xiaohongshu'
        }
      ],
      optionsTimeType:[
        {
          id:1,
          name:'hours'
        },{
          id:2,
          name:'days'
        },
        {
          id:3,
          name:'week'
        }
      ],
      manageData:[],
      dialogVisible:false,
      formData:{
        timeType:undefined,
        timeValue:'',
      },
      roleIdNumber:''
    }
  },

   mounted(){
     this.zbManageItemFn()
  },
  methods: {
    async zbManageItemFn(){
      const {$refs, $api, form, $message, $notify, setUserInfo, $router} = this
      try{
        const result = await $api.zhubo.zbManage()
        this.manageData = result.data
      }catch(error){
        console.log(error)
      }
    },
    renevalAddFn(row){
      this.dialogVisible = true;
      this.roleIdNumber = row.role_id
    },
    
    async resultHandelFn(){
      const {$refs, $api, form, $message, $notify, setUserInfo, $router} = this
      const data={
        role_id:this.roleIdNumber,
        renewal_type:this.formData.timeType,
        renewal_value:this.formData.timeValue
      }
      try{
        const result = await $api.zhubo.zbRenewal(data)
        this.dialogVisible = false;
        if(result.code === 0){
          this.zbManageItemFn();
          this.$message('续期成功');
        }
      }catch(error){
        console.log(error)
      }
    },
    handleClose(){
      this.dialogVisible = false;
    },

    //添加付费
    async addPayHandel(){
      const {$refs, $api, form, $message, $notify, setUserInfo, $router} = this
      const data={
        plat_type:this.value1,
        role_name:String(this.zhuboName),
        renewal_days:this.timeValue
      }
      try{
        const result = await $api.zhubo.zbPayadd(data)
        this.dialogVisible = false;
        if(result.code === 0){
          this.zbManageItemFn();
          this.$message('付费添加成功');
        }
      }catch(error){
        console.log(error)
      }
    },

    //取消关注主播  deleteHandel
    async deleteHandel(row){
      const {$refs, $api, form, $message, $notify, setUserInfo, $router} = this
      const data={
        role_id:row.role_id,
      }
      try{
        const result = await $api.zhubo.zbGroupdel(data)
        this.dialogVisible = false;
        if(result.code === 0){
          this.zbManageItemFn();
          this.$message('公司取消关注主播');
        }
      }catch(error){
        console.log(error)
      }
    },
  }
}
</script>
<style lang="scss" scoped>
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
.text-liwu{
    padding: 0px 14px;
    text-align: center;
}
.text-time{
  line-height: 40px;
}
.text-time i{
 font-style: normal;
}
</style>
