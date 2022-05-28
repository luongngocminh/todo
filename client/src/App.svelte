<script>
	import { getTodo, updateTodo, addTodo, deleteTodo } from './api';

	let newItem = '';

	let todoList = [];

	getTodo().then((response) => {
		response.json().then((data) => {
			todoList = data.data;
		})
	})

	const addToList = () => {
		addTodo(newItem).then((response) => {
			response.json().then((data) => {
				todoList.push(data.data)
				todoList = todoList;
			})
		})
		
	}

	const removeFromList = (index) => {
		deleteTodo(todoList[index].id).then(() => {
			todoList.splice(index, 1);
			todoList = todoList;
		})
	}

	const update = (item) => {
		updateTodo(item.id, item.status).then(() => {});
	}
</script>

<main>
	<input bind:value={newItem} type="text" placeholder="new to item...">
	<button on:click={() => addToList()}>Add</button>
	<br>
	{#each todoList as item, index}
		<input bind:checked={item.status} type="checkbox" on:change={() => update(item)}>
		<span>{item.description}</span>
		<span on:click={() => removeFromList(index)}>❌</span>
		<br>
	{/each}
</main>

<style>
	
</style>