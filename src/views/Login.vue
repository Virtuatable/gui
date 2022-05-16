<template>
  <v-main>
    <div class="d-flex full-width flex-column">
      <HomeMenu />
      <div class="d-flex align-center flex-grow-1">
        <iframe height="100%" width="100%" :src="authUri"></iframe>
      </div>
    </div>
  </v-main>
</template>

<script lang="ts">
import { ICredentials } from '@/interfaces/ICredentials';
import { ActionTypes } from '@/store/sessions/enums';
import { Component, Vue } from 'vue-property-decorator'
import { namespace } from 'vuex-class'
import HomeMenu from '@/components/HomeMenu.vue'
import AuthenticationFactory from '@/factories/AuthenticationFactory'

const sessions = namespace('sessions');

@Component({
  components: { HomeMenu }
})
export default class Login extends Vue {

  public credentials: ICredentials = { username: '', password: '' };
  // @ts-ignore
  @sessions.Action(ActionTypes.CREATE_SESSION) createSession;

  public get authUri(): string {
    const rootUri = process.env.VUE_APP_ROOT_AUTH_URI;
    const clientId = process.env.VUE_APP_CLIENT_ID;
    const redirectUri = process.env.VUE_APP_REDIRECT_URI;
    return `${rootUri}/auth/ui/login?client_id=${clientId}&redirect_uri=${redirectUri}&response_type=code`
  }

  public mounted() {
    const checker = setInterval(
      () => {
        const code = localStorage.getItem('authcode') as string;
        if (code != null) {
          AuthenticationFactory.createToken(code);
          clearInterval(checker)
        }
      },
      500
    )
  }
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