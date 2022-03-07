<template>
  <v-container v-if="loaded">
    <v-breadcrumbs :items="breadcrumbs">
      <template v-slot:divider>
        <v-icon>mdi-chevron-right</v-icon>
      </template>
    </v-breadcrumbs>
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
            <v-col md="6" xs="12">
              <div class="text-h4 mb-2">Description</div>
              <p>{{ campaign.description }}</p>
            </v-col>
            <v-col md="6" xs="12">
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

const campaigns = namespace('campaigns');

@Component({
  components: { Invitation }
})
export default class CampaignView extends Vue {
  campaign: ICampaign = {
    name: '',
    description: '',
    id: '',
    banner: '',
    invitations: [],
    players: 0
  };

  loaded: boolean = false;

  breadcrumbs: any = [
    {
      text: 'Virtuatable',
      disabled: false,
      href: '/'
    },
    {
      text: 'Campaigns',
      disabled: false,
      href: '/campaigns'
    }
  ];

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
    this.breadcrumbs.push({
      text: this.$route.params.id,
      disabled: true,
      href: `/campaigns/${this.$route.params.id}`
    });
  }
}
</script>