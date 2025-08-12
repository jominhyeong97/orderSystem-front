<template>
    <v-container>
        <v-row justify="center">
            <v-col cols="6">
                <v-card>
                    <v-card-title class="text-h5 text-center">
                        상품등록
                        <v-card-text>
                            <v-form>
                                <v-text-field v-model="name"
                                    label="상품명"
                                />
                                <v-text-field v-model="category"
                                    label="카테고리"
                                />
                                <v-text-field v-model.number="price"
                                    label="가격"
                                />
                                <v-text-field v-model="stockQuantity"
                                    label="재고수량"
                                />
                                <v-file-input
                                    label="상품이미지"
                                    accept="image/**"
                                    @change="fileupload"
                                    multiple
                                />
                                <v-row>
                                    <v-col>
                                        <!-- block은 속한 row에서 너비를 꽉 채움 -->
                                        <v-btn color="primary" block @click="productCreate()">
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
import axios from 'axios';

    export default {
        data() {
            return{
                name:"",
                category:"",
                price:null,
                stockQuantity:null,
                productImage:[],
            }
        },
        methods:{
            fileupload(event) {
                // 여러개의 상품일 경우 for문을 실행하여 productImage에 값 할당
                this.productImage = event.target.files[0]
            },
            async productCreate() {

                try{
                    // multipart-formdata 또는 url인코딩 방식인 경우에 formdata클래스 사용하여 객체 조립
                    let data = new FormData();
                    data.append("name",this.name)
                    data.append("category",this.category)
                    data.append("price",this.price)
                    data.append("stockQuantity",this.stockQuantity)
                    data.append("productImage",this.productImage)
                    await axios.post(`${process.env.VUE_APP_API_BASE_URL}/product/create`,data)
                    this.$router.push("/product/manage")
                } catch(e) {
                    console.log(e)
                }
                
            }
        }
    }
</script>