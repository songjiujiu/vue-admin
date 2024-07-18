<template>
  <ui-container>
    <div slot="header" style="display: flex">
      <div class="text-tanmu">
        <el-button type="primary" @click="addUser">添加用户</el-button>
      </div>
      <div class="text-tanmu">
        <el-button type="primary" @click="editPassword">修改密码</el-button>
      </div>
      <div class="text-liwu">
        <el-button type="primary" @click="bindPhone">绑定手机</el-button>
      </div>
    </div>
    <div class="ul-itemlist">
      <div style="margin-bottom:15px;">用户管理</div>
      <el-table :data="tableData" border style="width: 100%">
        <el-table-column prop="userName" label="用户名" width="220">
        </el-table-column>
        <el-table-column prop="desc" label="描述">
        </el-table-column>
        <el-table-column fixed="right" label="操作" width="120">
          <template slot-scope="scope">
            <el-button @click="handleClick(scope.row)" type="text" size="small"
              >重置密码</el-button
            >
            <el-popconfirm title="确定删除此数据吗？">
                <el-button type="text" slot="reference">删除</el-button>
            </el-popconfirm>
          </template>
        </el-table-column>
      </el-table>
    </div>
    <el-dialog
        title="添加用户"
        :visible.sync="dialogVisible"
        width="30%"
        :before-close="handleClose">
        <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
            <el-form-item label="用户名" prop="userName">
                <el-input v-model="ruleForm.userName"></el-input>
            </el-form-item>
            <el-form-item label="角色" prop="role">
                <el-select v-model="ruleForm.role" placeholder="请选择角色">
                    <el-option label="角色一" value="1"></el-option>
                    <el-option label="角色二" value="2"></el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="描述" prop="desc">
                <el-input type="textarea" v-model="ruleForm.desc"></el-input>
            </el-form-item>
        </el-form>
        <span slot="footer" class="dialog-footer">
            <el-button @click="dialogVisible = false">取 消</el-button>
            <el-button type="primary" @click="dialogVisible = false">确 定</el-button>
        </span>
    </el-dialog>
    <el-dialog
        title="绑定手机"
        :visible.sync="dialogPhoneVisible"
        width="30%"
        :before-close="handleClose">
        <el-form :model="ruleFormPhone" :rules="rulesPhone" ref="ruleFormPhone" label-width="100px" class="demo-ruleForm">
            <el-form-item label="手机号" prop="userName">
                <el-input v-model="ruleFormPhone.phone"></el-input>
            </el-form-item>
            <el-form-item label="验证码" prop="verCode">
                <el-input v-model="ruleFormPhone.verCode"></el-input>
            </el-form-item>
        </el-form>
        <span slot="footer" class="dialog-footer">
            <el-button @click="dialogPhoneVisible = false">取 消</el-button>
            <el-button type="primary" @click="dialogPhoneVisible = false">确 定</el-button>
        </span>
    </el-dialog>
    <el-dialog
        title="修改密码"
        :visible.sync="dialogEditVisible"
        width="30%"
        :before-close="handleClose">
        <el-form :model="ruleFormEdit" :rules="rulesEdit" ref="ruleFormEdit" label-width="100px" class="demo-ruleForm">
            <el-form-item label="用户名" prop="userName">
                <el-input v-model="ruleFormEdit.userName"></el-input>
            </el-form-item>
            <el-form-item label="密码" prop="password">
                <el-input v-model="ruleFormEdit.password"></el-input>
            </el-form-item>
            <el-form-item label="手机号" prop="phone">
                <el-input v-model="ruleFormEdit.phone"></el-input>
            </el-form-item>
        </el-form>
        <span slot="footer" class="dialog-footer">
            <el-button @click="dialogEditVisible = false">取 消</el-button>
            <el-button type="primary" @click="dialogEditVisible = false">确 定</el-button>
        </span>
    </el-dialog>
  </ui-container>
</template>
<script>
export default {
  data() {
    return {
      dialogVisible:false,
      dialogPhoneVisible:false,
      dialogEditVisible:false,
      ruleForm:{
        userName:"",
        role:"",
        desc:""
      },
      rules:{},
      ruleFormPhone:{
        userName:"",
        verCode:""
      },
      rulesPhone:{},
      ruleFormEdit:{
        userName:"",
        password:"",
        phone:""
      },
      rulesEdit:{},
      tableData: [
        {
          id: 1,
          userName: "王小虎",
          desc: "这是管理员账号",
        },
        {
          id: 2,
          userName: "王小虎",
          desc: "这是管理员账号",
        },
        {
          id: 3,
          userName: "王小虎",
          desc: "这是管理员账号",
        },
        {
          id: 4,
          userName: "王小虎",
          desc: "这是管理员账号",
        },
        {
          id: 5,
          userName: "王小虎",
          desc: "这是管理员账号",
        },
        {
          id: 6,
          userName: "王小虎",
          desc: "这是管理员账号",
        },
      ],
    };
  },
  methods: {
    //关闭
    handleClose(){

    },
    //重置密码
    handleClick(row) {
      console.log(row);
    },
    //添加用户
    addUser(){
       this.dialogVisible = true 
    },
    //修改密码
    editPassword(){
        this.dialogEditVisible = true
    },
    //绑定手机
    bindPhone(){
        this.dialogPhoneVisible = true
    },
    //删除数据

  },
};
</script>
  
  <style scoped>
  .ul-itemlist{
    width: 100%;
  }
.text-tanmu {
  margin-right: 15px;
}
</style>