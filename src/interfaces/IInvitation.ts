export enum InvitationStatus {
  PENDING = 'pending',
  ACCEPTED = 'accepted'
}

export default interface IInvitation {
  account: string,
  issue_date: Date,
  acceptation_date: Date,
  status: InvitationStatus
}