<script setup lang="ts">
import TheWelcome from '../components/TheWelcome.vue'
import { defineComponent } from 'vue';
import { logout } from '../services/authService';
// Define the handleLogout function
const handleLogout = async () => {
  await logout();
};
</script>

<template>
  <main>
     <button @click="handleLogout">Logout</button>
    <TheWelcome />
  </main>
</template>
