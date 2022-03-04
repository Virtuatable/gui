import IAccount from "./IAccount";

export default interface ISession {
  session_id: string;
  account: IAccount;
}