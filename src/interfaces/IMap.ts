import { ITokenPosition } from "./IToken"

export default interface IMap {
  height: number;
  name: string;
  width: number;
  tokens: Array<ITokenPosition>;
}