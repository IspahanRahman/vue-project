<template>
  <div class="login-container">
    <h2>{{ $t('login.title') }}</h2>
    <form @submit.prevent="handleLogin">
      <div class="form-group">
        <label for="username">{{ $t('login.username') }}</label>
        <input
          type="text"
          id="username"
          v-model="username"
          required
        />
      </div>
      <div class="form-group">
        <label for="password">{{ $t('login.password') }}</label>
        <input
          type="password"
          id="password"
          v-model="password"
          required
        />
      </div>
      <button type="submit">{{ $t('login.loginButton') }}</button>
      <p v-if="errorMessage" class="error">{{ errorMessage }}</p>
    </form>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'
import { useRouter } from 'vue-router'
import { login } from '../services/authService'

export default defineComponent({
  name: 'Login',
  setup() {
    const router = useRouter()
    const username = ref('')
    const password = ref('')
    const errorMessage = ref('')

    const handleLogin = async () => {
      try {
        // Call the login function from authService
        await login(username.value, password.value)
        
        // Redirect to the home page after successful login
        await router.push({ name: 'Home' })
      } catch (error: any) {
       
      }
    }

    return {
      username,
      password,
      errorMessage,
      handleLogin
    }
  }
})
</script>

<style scoped>
.login-container {
  max-width: 400px;
  margin: 0 auto;
  padding: 2rem;
  border: 1px solid #ddd;
  border-radius: 8px;
  box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.1);
}

h2 {
  text-align: center;
  margin-bottom: 1rem;
}

.form-group {
  margin-bottom: 1rem;
}

label {
  display: block;
  margin-bottom: 0.5rem;
}

input {
  width: 100%;
  padding: 0.5rem;
  font-size: 1rem;
  border-radius: 4px;
  border: 1px solid #ccc;
}

button {
  width: 100%;
  padding: 0.75rem;
  font-size: 1rem;
  color: #fff;
  background-color: #007bff;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}

button:hover {
  background-color: #0056b3;
}

.error {
  color: red;
  margin-top: 1rem;
  text-align: center;
}
</style>
