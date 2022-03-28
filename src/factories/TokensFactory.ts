import { ITokenPosition } from "@/interfaces/IToken";

export default class TokensFactory {
  public emptyPosition(): ITokenPosition {
    return { x: 0, y: 0, id: '', token_id: '', selected: false, dragged: false }
  }
}