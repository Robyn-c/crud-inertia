<script setup>
  import Nav from "@/Shared/Nav.vue";
</script>

<template>
  <section class="p-6 bg-gray-200">
    <header class="flex justify-between items-center">
      <h1 class="text-2xl">My App</h1>
      <Nav/>
    </header>

  </section>
  <section class="p-6">
    <div class="max-w-6xl mx-auto">
      <slot/>
    </div>
  </section>
</template>
