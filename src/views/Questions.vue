<template>
    <n-grid x-gap="12" :cols="1">
        <n-gi>
            <n-input v-model:value="inputText" type="textarea"
                placeholder="Please type in your interview questions here!" />
        </n-gi>
        <n-gi>
            <n-button type="primary" @click="callApiData()">
                Submit Question
            </n-button>
        </n-gi>
        <n-gi>
            <n-input v-model:value="outputText" type="textarea" placeholder="Your answers would be here!" :autosize="{
                minRows: 3
            }" />

        </n-gi>
    </n-grid>
</template>
  
<script>

import { onMounted, defineComponent, ref } from 'vue';
import { NButton, NSpace, NInput, NGrid, NGi, NH1 } from 'naive-ui';
import axios from 'axios';

export default defineComponent({
    name: 'Home',
    components: {
        NButton,
        NSpace,
        NInput,
        NGrid,
        NGi,
        NH1
    },
    setup() {
        const apiData = ref(null)
        const inputText = ref(null)
        const outputText = ref(null)

        const callApiData = async () => {

            const headers = {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${import.meta.env.VITE_OPENAI_API_KEY}`
            }
            const jsonData = {
                "model": "text-davinci-003",
                "prompt": inputText.value,
                "temperature": 0.5,
                "max_tokens": 150,
                "top_p": 1.0,
                "frequency_penalty": 0.0,
                "presence_penalty": 0.0
            }
            try {
                const responseData = await axios.post(import.meta.env.VITE_OPENAI_API_URL, jsonData, {
                    headers: headers
                })
                console.log(responseData)
                outputText.value = responseData.data.choices[0].text;
            } catch (err) {
                console.log(err)
            }

        }

        return {
            apiData,
            inputText,
            outputText,

            callApiData
        }
    }
})

</script>
<style scoped>
.n-input {
    margin: 1.5rem auto;
    width: 500px;
}
</style>  