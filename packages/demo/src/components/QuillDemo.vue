<script setup lang="ts">
import Quill from 'quill'
import { onMounted } from 'vue';

onMounted(() => {
  const quill = new Quill('#editor', {
    theme: 'snow'
  });
})
</script>

<template>
  <div id="editor"></div>
  <div></div>
</template>
