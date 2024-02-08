<script setup lang="ts">
import {IconHome} from "@tabler/icons-vue";

const route = useRoute()

import {ref} from "vue";

const selectedCity = ref();
const cities = ref([
  {name: 'New York', code: 'NY'},
  {name: 'Rome', code: 'RM'},
  {name: 'London', code: 'LDN'},
  {name: 'Istanbul', code: 'IST'},
  {name: 'Paris', code: 'PRS'}
]);

</script>

<template>
  <div>
    <h1>Nuxt Routing set up successfully!</h1>
    <p>Current route: {{ route.path }}</p>
    <a href="https://nuxt.com/docs/getting-started/routing" target="_blank">Learn more about Nuxt Routing</a>
  </div>

  <IconHome/>

  <Button label="Check" icon="pi pi-check"/>

  <div class="card flex justify-content-center">
    <Dropdown v-model="selectedCity" :options="cities" optionLabel="name" placeholder="Select a City"
              class="w-full md:w-14rem"/>
  </div>

</template>
