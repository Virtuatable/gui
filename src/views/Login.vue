<template>
  <v-main class="d-flex align-center full-width">
    <v-container>
      <v-row>
        <v-col cols="6" offset="3">
          <v-card>
            <v-card-title>Login</v-card-title>
            <v-card-content>
              <v-form class="pa-4">
                <v-text-field outlined label="Nickname"></v-text-field>
                <v-text-field outlined label="Password" type="password"></v-text-field>
              </v-form>
            </v-card-content>
            <v-card-actions>
              <v-btn type="submit" text color="primary">Log in</v-btn>
            </v-card-actions>
          </v-card>
        </v-col>
      </v-row>
    </v-container>
  </v-main>
</template>

<style scoped>
.login-container {
  background-color: silver;
}
.full-width {
  height: 100vh;
}
</style>