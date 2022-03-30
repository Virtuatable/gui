import factories from "@/factories";
import { ITokenPosition } from "@/interfaces/IToken"

export interface TokensState {
  dragged: ITokenPosition;
  // A flag indicating if a selection is being made by the user on a token.
  selecting: boolean;

  selected: ITokenPosition;
}

export const tokensState: TokensState = {
  dragged: factories.tokens.emptyPosition(),
  selecting: false,
  selected: factories.tokens.emptyPosition()
}