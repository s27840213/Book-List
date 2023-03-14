<template lang="pug">
div(class="home w-full h-full flex flex-col justify-center items-center")
  span(class="text-3xl font-bold underline underline-offset-8") {{ `x: ${x}` }} {{ `y: ${y}` }}
  <img src="/vite.svg" class="logo" alt="Vite logo" />
  hello-world(:msg="'Vite + Vue'")
</template>

<script lang="ts" setup>
import { useMouse } from '@vueuse/core'
const { x, y } = useMouse()
</script>
