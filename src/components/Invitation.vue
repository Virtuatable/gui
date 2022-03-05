<template>
  <v-list-item link>
    <v-list-item-icon>
      <v-icon :color="color">mdi-account</v-icon>
    </v-list-item-icon>
    <v-list-item-content>
      <v-list-item-title>
        {{ invitation.account_id}}
        <span class="grey--text font-weight-light">
          Acceptée le {{ acceptation_date }}
        </span>
      </v-list-item-title>
    </v-list-item-content>
    <v-list-item-icon>
      <v-icon>mdi-trash-can-outline</v-icon>
    </v-list-item-icon>
  </v-list-item>
</template>

<script lang="ts">
import IInvitation, { InvitationStatus } from '@/interfaces/IInvitation'
import { Component, Prop, Vue } from 'vue-property-decorator'
import moment from 'moment'

@Component
export default class Invitation extends Vue {
  @Prop()
  invitation!: IInvitation;

  get color(): string {
    return this.invitation.status === InvitationStatus.ACCEPTED ? 'green' : 'grey';
  }

  get acceptation_date(): string {
    return moment(this.invitation.acceptation_date).format("DD/MM/YYYY")
  }
}
</script>