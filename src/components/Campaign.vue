<template>
  <v-card class="mx-auto my-auto" max-width="400">
    <v-img class="white--text align-end" v-if="campaign.banner !== ''" :src="campaign.banner" height="200px">
      <v-card-title>{{ campaign.name }}</v-card-title>
    </v-img>
    <v-card-title v-else>{{ campaign.name }}</v-card-title>
    <v-card-subtitle>ID : {{ campaign.id }}</v-card-subtitle>
    <v-card-text>{{ campaign.description }}</v-card-text>
  </v-card>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';
import ICampaign from '@/interfaces/ICampaign'
import { namespace } from 'vuex-class';
import { ActionTypes } from '@/store/campaigns/enums';

const ns = namespace('campaigns')

@Component
export default class Campaign extends Vue {
  @Prop()
  campaign!: ICampaign;

  // @ts-ignore
  @ns.Action(ActionTypes.GET_CAMPAIGN_BANNER) getBanner;

  mounted() {
    this.getBanner(this.campaign.id)
  }
}
</script>