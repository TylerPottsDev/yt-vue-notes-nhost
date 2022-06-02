<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import nhost from '../utils/nhost'

const router = useRouter()

const isRegister = ref(false)

const email = ref('')
const password = ref('')

const register = async () => {
	if (!email.value || !password.value) return alert("Please fill in all fields")
	
	nhost.auth.signUp({
		email: email.value, 
		password: password.value
	}).then((res) => {
		if (res.session != null) {
			router.push('/')
		} else {
			if (res.error.error === 'already-signed-in') {
				router.push('/')
			} else {
				alert("Error: " + res.error.message)
			}
		}
	}).catch(err => {
		console.log(err)
	})
}

const login = async () => {
	if (!email.value || !password.value) return alert("Please fill in all fields")
	
	nhost.auth.signIn({
		email: email.value, 
		password: password.value
	}).then(res => {
		if (res.session != null) {
			router.push('/')
		} else {
			if (res.error.error === 'already-signed-in') {
				router.push('/')
			} else {
				alert("Error: " + res.error.message)
			}
		}
	})
}
</script>

<template>
	<main>
		<h1>Login</h1>
		
		<form @submit.prevent="register" v-if="isRegister">
			<h3>Register Form</h3>

			<label>
				<span>Email</span>
				<input type="email" v-model="email" />
			</label>

			<label>
				<span>Password</span>
				<input type="password" v-model="password" />
			</label>

			<input type="submit" value="Register" />

			<p>
				Already registered? <button @click="() => isRegister = !isRegister">Login</button>
			</p>
		</form>

		<form @submit.prevent="login" v-else>
			<h3>Login Form</h3>

			<label>
				<span>Email</span>
				<input type="email" v-model="email" />
			</label>

			<label>
				<span>Password</span>
				<input type="password" v-model="password" />
			</label>

			<input type="submit" value="Login" />

			<p>
				Need an account? <button @click="() => isRegister = !isRegister">Register</button>
			</p>
		</form>
	</main>
</template>