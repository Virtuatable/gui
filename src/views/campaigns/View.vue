<template>
  <v-container v-if="loaded">
    <v-breadcrumbs :items="breadcrumbs.concat([lastBreadcrumb])">
      <template v-slot:divider>
        <v-icon>mdi-chevron-right</v-icon>
      </template>
    </v-breadcrumbs>
    <v-card>
      <v-img
        v-if="campaign.banner !== ''"
        max-height="200"
        :lazy-src="campaign.banner"
        class="white--text align-end"
        gradient="to top right, rgba(100,115,201,.5), rgba(25,32,72,.8)"
      >
        <v-card-title class="text-h3 ml-2 mb-2">{{ campaign.name }}</v-card-title>
      </v-img>
      <v-card-title class="text-h1" v-else>{{ campaign.name }}</v-card-title>
      <v-card-text>
        <p class="mt-2">{{ campaign.description }}</p>
        <v-container fluid>
          <v-row dense>
            <v-col cols="6"></v-col>
            <v-col cols="6">
            <div class="text-h4">Joueurs</div>
            <v-list dense shaped>
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
import { ICampaignDetails } from '@/interfaces/ICampaign';
import { ActionTypes } from '@/store/campaigns/enums';
import { Component, Vue } from 'vue-property-decorator'
import { namespace } from 'vuex-class';
import moment from "moment";
import IInvitation from '@/interfaces/IInvitation';
import Invitation from '@/components/Invitation.vue'

const campaigns = namespace('campaigns');

@Component({
  components: { Invitation }
})
export default class CampaignView extends Vue {
  campaign: ICampaignDetails = {
    name: '',
    description: '',
    id: '',
    banner: '',
    invitations: []
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
  ]

  lastBreadcrumb = {
    text: '',
    disabled: true,
    href: ''
  }

  // @ts-ignore
  @campaigns.Action(ActionTypes.GET_CAMPAIGN_DETAILS) getCampaignDetails;
  // @ts-ignore
  @campaigns.Action(ActionTypes.GET_CAMPAIGN_BANNER) getBanner

  acceptation_date(invitation: IInvitation) {
    return moment(invitation.acceptation_date).format("DD/MM/YYYY")
  }

  mounted() {
    this.getCampaignDetails(this.$route.params.id).then((details: ICampaignDetails) => {
      this.campaign = details;
      this.loaded = true;
    })
    this.getBanner(this.$route.params.id).then((banner: string) => {
      this.campaign.banner = banner;
    })
    this.lastBreadcrumb = {
      text: this.$route.params.id,
      disabled: true,
      href: `/campaigns/${this.$route.params.id}`
    }
  }
}
</script>