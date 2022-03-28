import factories from "@/factories";
import { ITokenPosition } from "@/interfaces/IToken"

export interface TokensState {
  dragged: ITokenPosition;
}

export const tokensState: TokensState = {
  dragged: factories.tokens.emptyPosition()
}