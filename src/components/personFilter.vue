<template>
	<div>
		<div 
			class="filter"
		>
			<div
			class="filter__content"
			> 
				<div class="filter__content">
					<div 
						v-for="spec in specializationList"
						:key="spec.id"
						class="filter-button"
					>
						<input 
							type="radio" 
							name="specialization"
							class="filter-button"
							:id="spec.name"
							:value="spec.name"
							@click="applyFilter({specId: spec.id})"
							:disabled="!(personStore.countSpecs().has(spec.id))"
							ref="radio"
						/>
						<label :for="spec.name">{{ spec.name }}</label>
					</div>
				</div>
				<div class="filter-additional">
					<h4>Выберите размер страницы:</h4>
					<select
						@change="applyFilter({pageSize})" 
						class="form-control" v-model="pageSize"
					>
						<option 
							v-for="item of pageOptions" 
							:value="item"
							:key="item"
						>{{item}}</option>
					</select>
		  		</div>				
				<button @click="resetFilter()">Сбросить фильтр</button>
			</div>
	  </div>
	</div>
  </template>
	
<script setup lang="ts">
import type { Ispecialization } from '@/Interfaces';
import { usePersonStore } from '@/stores/personStore';
import { defineProps, ref } from 'vue';
const radio = ref<any>()

const pageSize = ref(5)
const resetFilter = () => {
	personStore.currentSpec = NaN
	personStore.filterList()
	for (const input of radio.value) {
		input.checked = false
	}
}

const applyFilter = (args:{specId?:number, pageSize?: number}) => {
	if (args.specId){personStore.currentSpec = args.specId}
	if (args.pageSize){personStore.pageSize = args.pageSize}
	personStore.filterList()
} 
const personStore = usePersonStore()
defineProps<{
	specializationList: Ispecialization[],
}>()
const pageOptions = [5,10,20]
  
</script>
	
<style scoped lang="less">
  
.filter {	
color: #8aa9ff;
  background-color: #fff;
  border: 1px #8aa9ff solid;
  border-radius: 15px;
  height: 90vh;
  padding: 20px;
	&-additional {
		align-self: flex-end;
		align-items: center;
		display: flex;
	}
	&__content {
		width: 100%;
		display: flex;
		justify-content: center;
		flex-direction: column;
	}
	&-button {	 	
		appearance: none;
		margin-bottom: 5px;
		&:checked + label {
			background-color: #1e90ff;
			padding: 2px;
			color: #f1f3f5;
			font-weight: 900;
			transition: 0.3s;	
		}
		&:disabled + label  {
			opacity: 0.5;
			&:hover {
				background-color: #fff;	
				color: #8aa9ff;
			}
		}
		&:hover + label {
			background-color: #dfe8ff;
			color: #1e90ff;
		}
	}
}  
</style>