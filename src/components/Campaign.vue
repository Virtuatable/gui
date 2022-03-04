<template>
  <v-card class="mx-auto my-auto" max-width="400">
    <v-img class="white--text align-end" v-if="campaign.banner !== ''" :src="campaign.banner" height="200px">
      <v-card-title class="pb-1 font-weight-light">{{ campaign.name }}</v-card-title>
    </v-img>
    <v-card-title v-else>{{ campaign.name }}</v-card-title>
    <v-card-subtitle class="grey--text pb-1 font-weight-light">ID : {{ campaign.id }}</v-card-subtitle>
    <v-card-text class="text--primary">{{ campaign.description }}</v-card-text>
    <v-card-actions class="pt-0">
      <v-tooltip bottom>
        <template v-slot:activator="{ on, attrs }">
          <v-btn icon v-on="on" v-bind="attrs" :to="`/campaigns/${campaign.id}/play`">
            <v-icon>mdi-dice-d20-outline</v-icon>
          </v-btn>
        </template>
        <span>Play</span>
      </v-tooltip>
      <v-spacer></v-spacer>
      <v-btn icon :to="`/campaigns/${campaign.id}`">
        <v-icon>mdi-pencil-outline</v-icon>
      </v-btn>
      <v-btn icon @click="deleteCampaign(campaign.id)">
        <v-icon>mdi-trash-can-outline</v-icon>
      </v-btn>
    </v-card-actions>
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
  //@ts-ignore
  @ns.Action(ActionTypes.DELETE_CAMPAIGN) deleteCampaign;

  mounted() {
    this.getBanner(this.campaign.id)
  }
}
</script>