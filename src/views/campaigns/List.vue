<template>
  <v-container>
    <h1>Campaigns</h1>
    <div>{{ campaigns }}</div>
  </v-container>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import ICampaign from '@/interfaces/ICampaign';
import { ActionTypes } from '@/store/campaigns/enums';
import { namespace } from 'vuex-class'
import { mapState } from 'vuex';

const campaigns = namespace('campaigns');

@Component({
  computed: {
    ...mapState('campaigns', ['campaigns']),
  }
})
export default class ListCampaigns extends Vue {
  public campaigns!: Array<ICampaign>;

  // @ts-ignore
  @campaigns.Action(ActionTypes.FETCH_CAMPAIGNS) fetchCampaigns

  mounted() {
    this.fetchCampaigns();
  }
}
</script>