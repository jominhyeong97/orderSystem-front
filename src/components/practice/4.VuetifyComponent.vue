<template>
    <v-container>
        <v-row>
            <!-- row의 전체 cols는 12이다. -->
            <v-col cols="8">
                helloworld1
            </v-col>
            <v-col cols="4">
                helloworld2
            </v-col>
        </v-row>
        <v-row>
           <v-card>
                <v-card-title>
                    회원가입
                </v-card-title>
                <v-card-text>
                    회원가입을 해주세요
                </v-card-text>
           </v-card> 
        </v-row>
        <v-row>
            <v-simple-table>
                <thead>
                    <tr>
                        <th>이름</th><th>이메일</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <th>test</th><th>test@naver.com</th>
                    </tr>
                    <tr>
                        <th>test2</th><th>test2@naver.com</th>
                    </tr>
                </tbody>
            </v-simple-table>
        </v-row>
    </v-container>

    <v-card>
        <v-card-title id="signup-title" style="font-size:50px">회원가입</v-card-title>
        <v-card-text>
            <v-from>
                <v-text-field
                    label="name"
                    type="text"
                />
                <v-text-field
                    label="email"
                    type="text"
                />
                <v-text-field
                    label="password"
                    type="password"
                />
                <v-btn color="secondary">제출하기</v-btn>
            </v-from>
        </v-card-text>
    </v-card>

    <!-- 모달창(팝업) 위한 v-dialog -->
    <v-btn @click="cancel()">취소버튼</v-btn>
    <!-- v-dialog는 내부적으로 true/false 값을 가지고 외부 공개될지 안될지 여부가 결정 -->
    <v-dialog v-model="trueOrFalse" max-width="400px">
        <v-card>
            <v-card-title>
                정말 취소하시겠습니까?
            </v-card-title>
            <v-card-actions>
                <v-btn @click="modalOff" color="primary">예</v-btn>
                <v-btn @click="modalOff" color="secondary">아니오</v-btn>
            </v-card-actions>
        </v-card>
    </v-dialog>
</template>

<script>
    export default {
        data() {
            return {
                trueOrFalse : false,
            
            }
        },
        methods : {
            cancel() {
                this.trueOrFalse = true;
            },

            modalOff() {
                this.trueOrFalse = false;
            }
        }
    }
</script>

<style>
#signup-title{
    color: red;
}
</style>