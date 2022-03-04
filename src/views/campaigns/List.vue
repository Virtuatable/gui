<template>
  <v-container>
    <h1>Campaigns</h1>
    <v-container fluid>
      <v-row dense>
        <v-col v-for="campaign in campaigns.items" :key="campaign.id" cols="4">
          <Campaign :campaign="campaign" />
        </v-col>
      </v-row>
    </v-container>
  </v-container>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import ICampaign from '@/interfaces/ICampaign';
import { ActionTypes } from '@/store/campaigns/enums';
import { namespace } from 'vuex-class'
import { mapState } from 'vuex';
import Campaign from "@/components/Campaign.vue"

const campaigns = namespace('campaigns');

@Component({
  computed: {
    ...mapState('campaigns', ['campaigns']),
  },
  components: { Campaign }
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