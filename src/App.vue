<template>
  <div class="main">
    <div class="left-side">
      <person-filter
        :specializationList="personStore.specializationList"
      />
    </div>    
    <div class="right-side">
      <person-table/>
    </div>
  </div>
</template>

<script lang="ts" setup>
import personFilter from './components/personFilter.vue';
import personTable from './components/personTable.vue';

import { usePersonStore } from './stores/personStore';
const personStore = usePersonStore();

</script>


<style scoped lang="less">
  .main {
    display: flex;
    background: #fff;
    gap: 20px;
    .right-side {
      width: 80%;
    } 
    .left-side {
      width: 15%
    }
  }
</style>
