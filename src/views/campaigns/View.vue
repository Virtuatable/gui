<template>
  <v-container v-if="loaded">
    <Breadcrumbs :disableLast="true" />
    <v-card :flat="$vuetify.breakpoint.mobile">
      <v-img
        v-if="campaign.banner !== ''"
        max-height="200px"
        :lazy-src="banner"
        class="white--text align-end"
        gradient="to top right, rgba(100,115,201,.5), rgba(25,32,72,.8)"
      >
        <v-card-title class="text-h3 ml-2 mb-2">{{ campaign.name }}</v-card-title>
      </v-img>
      <v-card-title class="text-h1" v-else>{{ campaign.name }}</v-card-title>
      <v-card-text>
        <v-container fluid>
          <v-row dense>
            <v-col md="8" xs="12">
              <div class="text-h4 mb-2">Description</div>
              <p>{{ campaign.description }}</p>
            </v-col>
            <v-col md="4" xs="12">
            <div class="text-h4">Joueurs</div>
            <v-list dense two-line>
              <Invitation :invitation="invitation" v-for="(invitation, i) in campaign.invitations" :key="i" />
            </v-list>
            </v-col>
          </v-row>
        </v-container>
      </v-card-text>
    </v-card>
  </v-container>
</template>

<script lang="ts">
import ICampaign from '@/interfaces/ICampaign';
import { ActionTypes } from '@/store/campaigns/enums';
import { Component, Vue } from 'vue-property-decorator'
import { namespace } from 'vuex-class';
import moment from "moment";
import IInvitation from '@/interfaces/IInvitation';
import Invitation from '@/components/Invitation.vue'
import Api from '@/api/utils/Api'
import BreadcrumbsFactory from '@/factories/BreadcrumbsFactory';
import Breadcrumbs from '@/components/utils/Breadcrumbs.vue'
import CampaignsFactory from '@/factories/CampaignsFactory';

const campaigns = namespace('campaigns');

@Component({
  components: { Breadcrumbs, Invitation }
})
export default class CampaignView extends Vue {
  campaign: ICampaign = CampaignsFactory.empty()

  loaded: boolean = false;

  // @ts-ignore
  @campaigns.Action(ActionTypes.GET_CAMPAIGN_DETAILS) getCampaignDetails;
  // @ts-ignore
  @campaigns.Action(ActionTypes.FETCH_INVITATIONS) getInvitations

  acceptation_date(invitation: IInvitation) {
    return moment(invitation.acceptation_date).format("DD/MM/YYYY")
  }

  get banner(): string {
    return Api.path(`/banners/${this.campaign.id}/${this.campaign.banner}`);
  }

  mounted() {
    BreadcrumbsFactory.fromRoute(this.$route);
    this.getCampaignDetails(this.$route.params.id).then((campaign: ICampaign) => {
      this.campaign = campaign
      this.getInvitations(this.$route.params.id).then((invitations: Array<IInvitation>) => {
        this.campaign = {
          ...this.campaign,
          invitations: invitations
        };
      });
      this.loaded = true;
    });
  }
}
</script>