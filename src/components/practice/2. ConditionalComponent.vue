<template>
    <h1>vue 조건식</h1>
    <div v-if="!isLogined">로그인해주세요</div>
    <div v-if="isLogined">환영합니다</div>
    <button @click="dologin()">로그인버튼</button>
    <button @click="dologout()">로그아웃버튼</button>


    <h1>상품목록조회</h1>
    <table>
        <thead>
            <tr>
                <th>id</th>
                <th>상품명</th>
                <th>상품가격</th>
            </tr>
        </thead>
        <tbody>
            <tr v-for="product in productList" :key="product.id">
                <td>{{ product.id }}</td>
                <td>{{ product.name }}</td>
                <td>{{ product['price'] }}</td>
            </tr>
        </tbody>
    </table>
</template>

<script>
import axios from 'axios'

    export default {
        data() {
            return {
                isLogined : false,
                productList : []
                // productList : [{id:1,name:'사과',price:10000},{id:2,name:'바나나',price:20000},{id:3,name:'귤',price:5000}]
            }
        },
        // 화면이 열림과 동시에 실행되는 hook함수 : created
        async created() {
            const response = await axios.get("http://localhost:8080/product/list")
            console.log(response)
            // this는 data영역의 변수
            this.productList = response.data.result.content
        },

        methods: {
            dologin() {
                this.isLogined = true
            },
            dologout() {
                this.isLogined = false
            }
        }
    }



</script>