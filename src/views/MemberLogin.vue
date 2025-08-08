
<template>
    <v-container>
        <v-row justify="center">
            <v-col cols="6">
                <v-card>
                    <v-card-title class="text-h5 text-center">
                        로그인
                        <v-card-text>
                            <v-form>
                                <v-text-field v-model="email"
                                    label="이메일"
                                    type="email"
                                    prepend-icon="mdi-email"
                                />
                                <v-text-field v-model="password"
                                    label="비밀번호"
                                    type="password"
                                    prepend-icon="mdi-lock"
                                />
                                <v-row>
                                    <v-col>
                                        <v-btn color="primary" block @click="memberLogin()">
                                            등록
                                        </v-btn>
                                    </v-col>
                                </v-row>
                            </v-form>
                        </v-card-text>
                    </v-card-title>
                </v-card>
            </v-col>
        </v-row>
    </v-container>
</template>


<script>
    import axios from 'axios'


    export default {
        data() {
            return{
                email : "",
                password : "",
            }
        },
        methods:{
            async memberLogin() {
                try {
                const data = {email:this.email,password:this.password} 
                const response = await axios.post("http://localhost:8080/member/doLogin", data)
                const accessToken = response.data.result.accessToken
                const refreshToken = response.data.result.refreshToken
                localStorage.setItem("accessToken",accessToken)
                localStorage.setItem("refreshToken",refreshToken)
                window.location.href = "/";
                
                }
                
                catch(error) {
                    console.log(error)
                    alert(error.response.data.status_message)
                }
            },
        }
    }
</script>