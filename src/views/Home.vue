<script setup>
import { useRouter } from 'vue-router'
import { useSignOut, useUserId } from '@nhost/vue'
import { useMutation, useQuery } from '@vue/apollo-composable'
import { gql } from '@apollo/client/core'

const router = useRouter()
const { signOut } = useSignOut()
const userId = useUserId()

const logout = () => {
	signOut()

	router.push('/login')
}

const { loading: loadingNotes, result: notesData } = useQuery(gql`
	query ($userId: String!) {
		notes (
			order_by: { created: desc }, 
			where: { user_id: {_eq: $userId} }
		) {
			id
			title,
			content,
			created
		}
	}
`, {
	userId: userId.value
})

const { mutate: deleteNote } = useMutation(gql`
	mutation ($id: Int!) {
		delete_notes(where: {id: {_eq: $id}}) {affected_rows}
	}
`)

const convertToHtml = (content) => {
	return content.replace(/\n/g, '<br />')
} 

const convertToDate = (date) => {
	return new Date(date).toLocaleString()
}

</script>

<template>
	<main>
		<div class="flex items-center justify-between mb-8">
			<h1 class="text-4xl font-bold">My Notes App</h1>
			<button @click="logout" class="text-red-500 hover:underline cursor-pointer">Logout</button>
		</div>
		<div v-if="!loadingNotes">
			<div v-for="note in notesData.notes" class="relative bg-white text-slate-700 rounded-lg p-6">
				<button class="text-red-500 font-bold absolute top-6 right-6" @click="() => deleteNote({id: note.id})">delete</button>
				<h3 class="font-bold text-2xl mb-4">{{ note.title }}</h3>
				<p 
					class="text-lg text-gray-500 mb-4" 
					v-html="convertToHtml(note.content)"></p>
				<div class="text-sm text-gray-500 italic">
					{{ convertToDate(note.created) }}
					</div>
			</div>
		</div>
		<div v-else>Loading notes...</div>
	</main>
</template>