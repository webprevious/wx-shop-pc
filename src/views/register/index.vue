<template>
  <div class="register">
      <el-input class="input" v-model="userName" placeholder="用户名"></el-input>
      <el-input class="input" v-model="classId" placeholder="班级"></el-input>
      <el-input class="input" v-model="gender" placeholder="性别"></el-input>
      <el-input class="input" v-model="score" placeholder="分数"></el-input>
      <el-button class="btn" @click="register">注册</el-button>
  </div>
</template>

<script>
export default {
  name: 'register',
  data () {
    return {
      userName: '',
      classId: '',
      gender: '',
      score: ''
    }
  },
  methods: {
    async register () {
      let data = {
        userName: this.userName,
        classId: Number(this.classId),
        gender: this.gender,
        score: Number(this.score)
      }
      const res = await this.$axios('/register', data, 'POST')
      console.log(res)
    }
  }
}
</script>

<style lang="less">
.register {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  .input {
    width: 500px;
    margin-bottom: 20px;
  }
  .btn {
    width: 500px;
    margin-bottom: 20px;
  }
}
</style>
