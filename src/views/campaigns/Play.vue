<template>
  <v-container fluid>
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
    <svg xmlns="http://www.w3.org/2000/svg" v-if="map" width="100%" :height="51 * (map.height + 1)">
      <g>
        <template v-for="i in map.height">
          <rect
            v-for="j in map.width"
            :key="`[${i};${j}]`"
            fill="red"
            :x="j * 51"
            :y="i * 51"
            width="50"
            height="50"
          />
        </template>
      </g>
    </svg>
  </v-container>
</template>

<script lang="ts">
import ICampaign from '@/interfaces/ICampaign';
import { Component, Vue } from 'vue-property-decorator';
import { namespace } from 'vuex-class';
import { ActionTypes } from '@/store/campaigns/enums';
import CampaignsFactory from '@/factories/CampaignsFactory';
import IMap from '@/interfaces/IMap';

const campaigns = namespace('campaigns');

@Component
export default class Play extends Vue {

  drawer: boolean = false;

  campaign: ICampaign = CampaignsFactory.empty();

  map: IMap = {
    name: '',
    height: 0,
    width: 0
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