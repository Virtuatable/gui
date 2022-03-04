<template>
  <v-app>
    <v-main>
      <MainBar />
      <router-view/>
    </v-main>
  </v-app>
</template>

<script lang="ts">
import Vue from 'vue';
import MainBar from '@/components/MainBar.vue'

export default Vue.extend({
  name: 'App',
  components: {
    MainBar
  }
});
</script>
