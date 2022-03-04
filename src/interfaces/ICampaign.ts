import IInvitation from "./IInvitation";

export default interface ICampaign {
  id: string,
  name: string;
  banner: string;
  description: string;
}

export interface ICampaignDetails extends ICampaign {
  invitations: Array<IInvitation>
}