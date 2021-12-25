<template>
  <div class="login-wrap">
    <div class="ms-login">
      <div class="ms-title">Tech Mely</div>
      <el-form ref="login" :model="param" :rules="rules" label-width="0px" class="ms-content">
        <el-form-item prop="username">
          <el-input v-model="param.username" placeholder="username">
            <template #prepend>
              <el-button icon="el-icon-user"></el-button>
            </template>
          </el-input>
        </el-form-item>
        <el-form-item prop="password">
          <el-input v-model="param.password" type="password" placeholder="password" @keyup.enter="submitForm()">
            <template #prepend>
              <el-button icon="el-icon-lock"></el-button>
            </template>
          </el-input>
        </el-form-item>
        <div class="login-btn">
          <el-button type="primary" @click="submitForm()">Login</el-button>
        </div>
      </el-form>
    </div>
  </div>
</template>

<script>
import { ref, reactive } from 'vue'
import { useCollapseStore } from '@/store/collapse'
import { useRouter } from 'vue-router'
import { ElMessage } from 'element-plus'

export default {
  setup() {
    const router = useRouter()
    const param = reactive({
      username: 'admin',
      password: '123123'
    })

    const rules = {
      username: [
        {
          required: true,
          message: 'please enter user name',
          trigger: 'blur'
        }
      ],
      password: [{ required: true, message: 'Please enter the password', trigger: 'blur' }]
    }
    const login = ref(null)
    const submitForm = () => {
      login.value.validate((valid) => {
        if (valid) {
          ElMessage.success('Login successfully')
          localStorage.setItem('ms_username', param.username)
          router.push('/')
        } else {
          return false
        }
      })
    }

    const collapseStore = useCollapseStore()
    collapseStore.handleCollapse()

    return {
      param,
      rules,
      login,
      submitForm
    }
  }
}
</script>

<style scoped>
.login-wrap {
  position: relative;
  width: 100%;
  height: 100%;
  background-image: url(../assets/img/login-bg.jpg);
  background-size: 100%;
}
.ms-title {
  width: 100%;
  line-height: 50px;
  text-align: center;
  font-size: 20px;
  color: #fff;
  border-bottom: 1px solid #ddd;
}
.ms-login {
  position: absolute;
  left: 50%;
  top: 50%;
  width: 350px;
  margin: -190px 0 0 -175px;
  border-radius: 5px;
  background: rgba(255, 255, 255, 0.3);
  overflow: hidden;
}
.ms-content {
  padding: 30px 30px;
}
.login-btn {
  text-align: center;
}
.login-btn button {
  width: 100%;
  height: 36px;
  margin-bottom: 10px;
}
.login-tips {
  font-size: 12px;
  line-height: 30px;
  color: #fff;
}
</style>
