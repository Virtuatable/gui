import IInvitation from "./IInvitation";

export default interface ICampaign {
  id: string,
  name: string;
  banner: string;
  description: string;
  players: number;
  invitations: Array<IInvitation>
}