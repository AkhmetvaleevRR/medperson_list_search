<template>
	<div class="person-table">	
		<div class="person-table__content">
			<person-card
				v-for="person in personStore.filteredList[personStore.currentPage]"
				:key="person.id"
				:person="person"
			/>			
		</div>
		<div class="pagination">			
			<button name="pagination-button" @click="prevPage">Назад</button>
				<span>{{ personStore.currentPage+1 }}</span>
			<button name="pagination-button" @click="nextPage">Вперед</button>
		</div>
		<span class="total-counter">Всего записей: {{ personStore.counters.total }}</span>
	</div>
</template>
  
<script setup lang="ts">
import personCard from './personCard.vue';
import { usePersonStore } from '@/stores/personStore';
import { onMounted } from 'vue';
const personStore = usePersonStore()
const prevPage = () => {
	if (personStore.currentPage > 0){
		personStore.currentPage --
	}
}
const nextPage = () => {
	if (personStore.currentPage < personStore.counters.pages-1){		
		personStore.currentPage ++
	}
}

onMounted (()=> {
	personStore.countSpecs()
	personStore.filterList()
})
</script>

<style lang="less" scoped>
.person-table {
	display: flex;
	flex-direction: column;
	align-items: center;
	color: #8aa9ff;
	padding: 20px;
		&__content {
		position: relative;
		display: grid;
		grid-template-columns: 1fr 1fr 1fr;		
		grid-template-rows: min-content;
		grid-gap: 20px;
		align-items: stretch;
		padding: 0;
		height: 82vh;
		overflow-y: auto;
	}
}

.pagination {
	display: flex;
	align-items: center;
	gap: 10px;
}
.total-counter {
	margin-top: 5px;
}
</style>
  