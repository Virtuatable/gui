<template>
  <div>
    <v-navigation-drawer v-model="drawer" absolute temporary>
      <v-list>
        <v-list-item v-for="map in campaign.maps" :key="map.name" @click="displayMap(map)">
          {{ map.name }}
        </v-list-item>
      </v-list>
    </v-navigation-drawer>
    <v-btn icon absolute text @click.stop="drawer = !drawer">
      <v-icon>mdi-chevron-double-right</v-icon>
    </v-btn>
    <Map :map="map" :tokens="campaign.tokens" />
  </div>
</template>

<script lang="ts">
import ICampaign from '@/interfaces/ICampaign';
import { Component, Vue } from 'vue-property-decorator';
import { namespace } from 'vuex-class';
import { ActionTypes } from '@/store/campaigns/enums';
import CampaignsFactory from '@/factories/CampaignsFactory';
import IMap from '@/interfaces/IMap';
import Map from '@/components/Map.vue'

const campaigns = namespace('campaigns');

@Component({
  components: { Map }
})
export default class Play extends Vue {

  drawer: boolean = false;

  campaign: ICampaign = CampaignsFactory.empty();

  map: IMap = {
    name: '',
    height: 0,
    width: 0,
    tokens: []
  };
  
  // @ts-ignore
  @campaigns.Action(ActionTypes.GET_CAMPAIGN_DETAILS) getCampaignDetails;
  
  mounted() {
    this.getCampaignDetails(this.$route.params.id).then((campaign: ICampaign) => {
      this.campaign = campaign;
      this.map = campaign.maps[0]
    });
  }

  displayMap(map: IMap) {
    this.map = map;
    this.drawer = false;
  }
}
</script>
