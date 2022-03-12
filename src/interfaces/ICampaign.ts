import IInvitation from "./IInvitation";
import IMap from "./IMap";

export default interface ICampaign {
  id: string,
  name: string;
  banner: string;
  description: string;
  players: number;
  invitations: Array<IInvitation>;
  maps: Array<IMap>
}