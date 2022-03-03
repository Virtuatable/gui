<template>
  <v-main class="d-flex align-center full-width">
    <v-container>
      <v-row>
        <v-col cols="6" offset="3">
          <v-card>
            <v-card-title>Login</v-card-title>
            <v-card-text>
              <v-form class="pa-2">
                <v-text-field outlined v-model="credentials.username" label="Username"></v-text-field>
                <v-text-field outlined v-model="credentials.password" label="Password" type="password"></v-text-field>
              </v-form>
            </v-card-text>
            <v-card-actions>
              <v-btn @click="createSession(credentials)"  text color="primary">Log in</v-btn>
            </v-card-actions>
          </v-card>
        </v-col>
      </v-row>
    </v-container>
  </v-main>
</template>

<script lang="ts">
import { ICredentials } from '@/interfaces/ICredentials';
import { ActionTypes } from '@/store/sessions/enums';
import { Component, Vue } from 'vue-property-decorator'
import { namespace } from 'vuex-class'

const sessions = namespace('sessions');

@Component({})
export default class Login extends Vue {

  public credentials: ICredentials = {
    username: '',
    password: ''
  };
  // @ts-ignore
  @sessions.Action(ActionTypes.CREATE_SESSION) createSession;
}
</script>

<style scoped>
.login-container {
  background-color: silver;
}
.full-width {
  height: 100vh;
}
</style>