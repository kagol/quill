<script setup lang="ts">
import Quill from 'quill'
import { onMounted } from 'vue';

onMounted(() => {
  console.log('before new Quill start====================');
  
  const quill = new Quill('#editor', {
    theme: 'snow'
  });
  console.log('quill====================', quill);
})
</script>

<template>
  <div id="editor"></div>
  <div></div>
</template>
