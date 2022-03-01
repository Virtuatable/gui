<template>
  <v-container>
    <h1>Campaigns</h1>
    <div>{{ campaigns }}</div>
  </v-container>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import listCampaigns from '@/api/campaigns/listCampaigns'
import ICampaign from '@/interfaces/ICampaign';

@Component
export default class ListCampaigns extends Vue {
  campaigns: Array<ICampaign> = []

  mounted() {
    listCampaigns().then(campaigns => {
      this.campaigns = campaigns
    })
  }
}
</script>