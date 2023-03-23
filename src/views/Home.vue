<template>
  <div>
    <p>
        Home
    </p>
  </div>
</template>

<script>

import { onMounted } from 'vue';

export default {
    name: 'Home',
    setup() {
        onMounted(() => {
            console.log('Mounted home component..')
        })
    }
}

</script>
