
<template>
    <v-container>
        <v-row justify="center">
            <v-col cols="6">
                <v-card>
                    <v-card-title class="text-h5 text-center">
                        회원가입
                        <v-card-text>
                            <v-form>
                                <v-text-field v-model="name"
                                    label="이름"
                                    type="text"
                                    prepend-icon="mdi-account"
                                />
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
                                        <!-- block은 속한 row에서 너비를 꽉 채움 -->
                                        <v-btn color="primary" block @click="memberCreate()">
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
                name : "",
                email : "",
                password : "",
            }
        },
        methods:{
            async memberCreate() {
                try {
                const data = {name:this.name,email:this.email,password:this.password} 
                console.log(data)
                await axios.post("http://localhost:8080/member/create", data)
                this.$router.push("/")
                }
                
                // 에러가 터지는 경우 error변수 안에 서버에서 주는 error 메세지가 담김
                catch(error) {
                    console.log(error)
                    alert(error.response.data.status_message)
                }
            },
        }
    }
</script>