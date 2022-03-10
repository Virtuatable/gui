<template>
  <v-container>
    <v-row dense>
      <v-col xs="12"><Breadcrumbs /></v-col>
    </v-row>
    <v-row dense>
      <v-col v-for="campaign in campaigns" :key="campaign.id" xs="12" md="4">
        <Campaign :campaign="campaign" />
      </v-col>
    </v-row>
  </v-container>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import ICampaign from '@/interfaces/ICampaign';
import { ActionTypes } from '@/store/campaigns/enums';
import { namespace } from 'vuex-class'
import { mapState } from 'vuex';
import Campaign from "@/components/Campaign.vue"
import Breadcrumbs from '@/components/utils/Breadcrumbs.vue'

const campaigns = namespace('campaigns');

@Component({
  computed: {
    ...mapState('campaigns', ['campaigns']),
  },
  components: { Breadcrumbs, Campaign }
})
export default class ListCampaigns extends Vue {
  public campaigns!: Array<ICampaign>;

  // @ts-ignore
  @campaigns.Action(ActionTypes.FETCH_CAMPAIGNS) fetchCampaigns;

  mounted() {
    this.fetchCampaigns();
  }
}
</script>