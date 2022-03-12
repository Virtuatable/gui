import ICampaign from '@/interfaces/ICampaign';

export default class CampaignsFactory {
  public static empty(): ICampaign {
    return {
      name: '',
      description: '',
      id: '',
      banner: '',
      invitations: [],
      players: 0,
      maps: []
    };
  }
}