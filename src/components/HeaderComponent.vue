<template>
    <v-app-bar>
        <v-container>
            <v-row>
                <!-- justfy-start : 왼쪽 기준 정렬 -->
                <v-col class="d-flex justify-start">
                    <div v-if="role==='ADMIN'">
                    <v-btn :to="'/member/list'">회원관리</v-btn>
                    <v-btn :to="'/product/manage'">상품관리</v-btn>
                    <v-btn href="/order/list">실시간 주문건수 {{ liveOrderCount }}</v-btn>
                    <!-- <v-btn :to="'/practice/store'">스토어 테스트</v-btn> -->
                    </div>
                </v-col>
                <v-col class="text-center">
                    <v-btn :to="'/'">java shop</v-btn>
                </v-col>
                <v-col class="d-flex justify-end">
                    <v-btn v-if="isLogined" :to="'/order/cart'">장바구니 {{ totalQuantity }}</v-btn>
                    <v-btn :to="'/product/list'">상품목록</v-btn>
                    <v-btn v-if="isLogined" :to="'/member/mypage'">마이페이지</v-btn>
                    <v-btn v-if="!isLogined" :to="'/member/create'">회원가입</v-btn>
                    <v-btn v-if="!isLogined" :to="'/member/login'">로그인</v-btn>
                    <v-btn v-if="isLogined" @click="doLogout()">로그아웃</v-btn>
                </v-col>
            </v-row>
        </v-container>
    </v-app-bar>
</template>

<script>
import { EventSourcePolyfill } from 'event-source-polyfill'
import { jwtDecode } from 'jwt-decode'

    export default {
        data() {
            return{
                role : null,
                isLogined : false,
                cartProductCount : 0,
                liveOrderCount : 0,
            }
        },
        created() {
            const accessToken = localStorage.getItem("accessToken",)
            if(accessToken) {
                const payload = jwtDecode(accessToken)
                console.log(payload)
                this.role = payload.role;
                this.isLogined = true
            }
            // sse 연결 및 메시지 수신
            if(this.role === 'ADMIN') {
            // sse연결요청을 위한 event-source-polyfill라이브러리 사용
            let sse = new EventSourcePolyfill(`${process.env.VUE_APP_API_BASE_URL}/sse/connect`, {
                headers: {
                    Authorization : `Bearer ${accessToken}`
                }
            })

            sse.addEventListener('connect',(event)=>{
                console.log(event)
            })

             sse.addEventListener('ordered',(event)=>{
                console.log(event)
                this.liveOrderCount++
            })

            }
        },
        methods:{
            doLogout() {
                localStorage.clear()
                this.isLogined = false;
                this.$router.push("/");
                this.role - null;
            },
        },
        computed: {
            totalQuantity() {
                return this.$store.getters.getTotalQuantity
            }
        }
    }
</script>