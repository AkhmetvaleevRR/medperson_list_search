<template>
  <div class="person-card">
    <div class="person-card__icon">      
      <img src="../assets/avatar.svg" alt="my-logo" />
    </div>
    <div class="person-card__description">
      <span class="person-card__description-fio">
        <p>{{ person.lastName }}</p>
        <p>{{ person.firstName }}</p>
        <p>{{ person.middleName }}</p>
      </span>
      <div class="person-card__description-spec">
        <h4>Специальности:</h4>
        <span 
          v-for="spec in person.specializationList"
          :key="spec.id"
        >
          {{ getSpecName(spec.id) }}
        </span>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { defineProps } from 'vue';
import { usePersonStore } from '@/stores/personStore';
import type { Iperson } from '@/Interfaces';

const personStore  = usePersonStore();

const getSpecName = (specId: number) => {
  for (const spec of personStore.specializationList) {
    if (spec.id === specId) return spec.name
  }
}

defineProps<{
  person: Iperson
}>()
</script>

<style scoped lang="less">

.person-card {
  position: relative;
  display: flex;
  flex-direction: column;
  color: #8aa9ff;
  background-color: #fff;
  margin-bottom: 1rem;
  border: 1px #8aa9ff solid;
  border-radius: 8px;
  align-items: center;
  padding: 10px;
  width: 40vh;
  &:hover {
    background-color: #eef0ff;
  }
  &__description {
    width: 100%;
    &-fio {
      align-self: center;
      & p{
        background-color: #d8e1ff;
        padding: 5px;
        border-radius: 5px;
        text-align: center;
        margin: 0 0 2px 0;
      }
    }
    &-spec {
      margin-top: 10px;
      text-align: center;
      & h4 {
        margin: 0;
        color: #4570ff;
      }
      & span {        
        display: block;
      }
    }
  }
}
</style>
