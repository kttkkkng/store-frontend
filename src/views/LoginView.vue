<template>
  <div class="flex flex-col items-center justify-center h-screen">
    <form @submit.prevent="Login" class="login-panel space-y-4">
      <p>Username</p>
      <InputText v-model="username" placeholder="username" />
      <p>Password</p>
      <InputText v-model="password" placeholder="password" type="password" />
      <button type="submit" class="w-full border border-black rounded-lg">submit</button>
    </form>
  </div>
</template>

<script setup>
import { backend } from '@/api/backend.js';
import { useUserStore } from '@/stores/UserStore.js';
import { ref } from 'vue';
import { useRouter } from 'vue-router';

const UserStore = useUserStore()
const router = useRouter()

const username = ref()
const password = ref()

async function Login () {
  try {
    const { data } = await backend.post('/auth/login', { username: username.value, password: password.value })
    UserStore.nickname = data.nickname
    UserStore.access_token = data.access_token
    UserStore.refresh_token = data.refresh_token

    router.push({ name: 'sale' })
  } catch (error) {
    
  }
}
</script>

<style scoped>
.login-panel {
  padding: 2rem;
  border: 1px solid var(--color-text);
  border-radius: 12px;
}
</style>