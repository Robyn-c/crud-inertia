<script setup>
import {Link} from "@inertiajs/vue3";
import NavLink from "@/Shared/NavLink.vue";
</script>

<template>
  <nav>
    <ul class="flex space-x-4">
      <li>
        <NavLink href="/" :active="$page.component === 'Home'">Home</NavLink>
      </li>
      <li>
        <NavLink href="/users" :active="$page.component === 'Users'">Users</NavLink>
      </li>
      <li>
        <NavLink href="/settings" :active="$page.component === 'Settings'">Settings</NavLink>
      </li>
    </ul>
  </nav>
</template>
