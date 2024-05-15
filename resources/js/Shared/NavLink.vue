<script setup>
    import {Link} from "@inertiajs/vue3";
    defineProps({
      active: Boolean,
    })
</script>

<template>
  <Link
        class="text-blue-700 hover:underline text-xl"
        :class="{'font-bold text-blue-800 underline': active }">
    <slot/>
  </Link>
</template>

