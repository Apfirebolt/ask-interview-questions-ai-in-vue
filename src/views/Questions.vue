<template>
    <div>
        <p>
            Questions
        </p>
    </div>
    <n-space>
        <n-button>Default</n-button>
        <n-button type="primary">
            Primary
        </n-button>
    </n-space>

    <n-input
      v-model:value="inputText"
      type="textarea"
      placeholder="Please type in your interview questions here!"
    />
    {{ inputText }}


</template>
  
<script>

import { onMounted, defineComponent, ref } from 'vue';
import { NButton, NSpace, NInput } from 'naive-ui';
import axios from 'axios';

export default defineComponent ({
    name: 'Home',
    components: {
        NButton,
        NSpace,
        NInput
    },
    setup() {
        const apiData = ref(null)
        const inputText = ref(null)

        const callApiData = async () => {
            const responseData = await axios.get('https://jsonplaceholder.typicode.com/todos/1')
            apiData.value = responseData.data
            console.log(responseData)
            
        }
        onMounted(() => {
            callApiData()
        })

        return {
            apiData,
            inputText
        }
    }
})

</script>
<style scoped>
.n-input {
    margin: 1.5rem auto;
}
</style>  