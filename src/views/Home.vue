<template>
  <n-h1>
    Interview Questions App
  </n-h1>
  <n-gradient-text type="warning">
    An AI app which would display list of interview questions related to a given topic.
  </n-gradient-text>
  <br>
  <n-text type="warning">
    <p>
      Let's say you have a Javascript interview lined up, try typing "10 Javascript interview questions" and see the AI response.
    </p>
  </n-text>
  <n-grid x-gap="12" :cols="1">
    <n-gi>
      <n-input v-model:value="inputText" type="textarea" placeholder="Please type in your interview questions here!" />
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
  <n-gradient-text v-if="errorText" type="danger">
    {{ errorText }}
  </n-gradient-text>
</template>

<script>

import { defineComponent, ref } from 'vue';
import { NButton, NInput, NGrid, NGi, NH1, NGradientText, NText } from 'naive-ui';
import axios from 'axios';

export default defineComponent({
  name: 'Home',
  components: {
    NButton,
    NInput,
    NGrid,
    NGi,
    NH1,
    NText,
    NGradientText
  },
  setup() {
    const apiData = ref(null)
    const inputText = ref(null)
    const outputText = ref(null)
    const errorText = ref(null)

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
        // console.log(responseData)
        outputText.value = responseData.data.choices[0].text;
        errorText.value = '';
      } catch (err) {
        errorText.value = 'Some error occurred in the request';
      }
    }

    return {
      apiData,
      inputText,
      outputText,
      errorText,

      callApiData
    }
  }
})

</script>
<style scoped>
.n-input {
  margin: 1.5rem auto;
  width: 650px;
  text-align: left;
}

.n-text {
  font-size: 16px;
  font-weight: 600;
}

.n-gradient-text {
  font-size: 18px;
  margin: 1rem auto;
}
</style>  