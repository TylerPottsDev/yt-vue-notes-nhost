<script setup>
import nhost from '../utils/nhost'

const logout = () => {
	nhost.auth.signOut()
}

</script>

<template>
	<main>
		<h1>Home</h1>
		<button @click="logout">Logout</button>
	</main>
</template>