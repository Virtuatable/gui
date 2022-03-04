<template>
  <v-app-bar color="deep-purple accent-4" dark>
    <v-toolbar-title>Virtuatable</v-toolbar-title>
    <v-tooltip bottom>
      <template v-slot:activator="{ on, attrs }">
        <v-btn v-on="on" v-bind="attrs" icon to="/campaigns">
          <v-icon>mdi-script-text-outline</v-icon>
        </v-btn>
      </template>
      <span>Liste de campagnes</span>
    </v-tooltip>
    <v-spacer></v-spacer>
    <v-btn icon @click="deleteSession">
      <v-icon>mdi-exit-to-app</v-icon>
    </v-btn>
  </v-app-bar>
</template>

<script lang="ts">
import { ActionTypes } from '@/store/sessions/enums';
import { Component, Vue } from 'vue-property-decorator';
import { namespace } from 'vuex-class';

const sessions = namespace('sessions')

@Component({})
export default class MainBar extends Vue {
  // @ts-ignore
  @sessions.Action(ActionTypes.DELETE_SESSION) deleteSession;
}
</script>