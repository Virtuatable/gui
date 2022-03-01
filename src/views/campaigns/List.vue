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
import { mapActions, mapState } from 'vuex';
import { ActionTypes } from '@/store/campaigns/enums';
import { campaigns as store } from '@/store/campaigns'

@Component({
  computed: {
    ...mapState('campaigns', ['campaigns']),
  },
  methods: {
    ...mapActions('campaigns', {
      fetchCampaigns: ActionTypes.FETCH_CAMPAIGNS
    })
  }
})
export default class ListCampaigns extends Vue {
  public campaigns!: Array<ICampaign>;

  fetchCampaigns() {
    return store.dispatch("campaigns/FETCH_CAMPAIGNS");
  }

  mounted() {
    listCampaigns().then(campaigns => {
      console.log(this.fetchCampaigns());
    })
  }
}
</script>