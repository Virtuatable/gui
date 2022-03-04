<template>
  <v-app>
    <v-main>
      <main-menu v-if="is_authenticated()" />
      <router-view/>
    </v-main>
  </v-app>
</template>

<script lang="ts">
import Vue from 'vue';
import MainMenu from '@/components/MainMenu.vue'

export default Vue.extend({
  name: 'App',
  components: {
    MainMenu
  },
  methods: {
    is_authenticated() {
      return localStorage.getItem('session_id') !== null
    }
  }
});
</script>
