<template>
  <g @mousedown.stop="startDrag" @mouseup.stop="endDrag" @click="select">
    <rect :x="x" :y="y" :width="cellSize" :height="cellSize" class="token" :fill="color" />
    <text :x="x + 5" :y="y + 20" fill="white">{{ token.name }}</text>
  </g>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';
import IToken, { ITokenPosition }  from '@/interfaces/IToken'
import { CELL_SIZE } from '@/utils/constants'
import { namespace } from 'vuex-class'
import { MutationTypes } from '@/store/campaigns/enums';

const campaigns = namespace('campaigns');

@Component
export default class Token extends Vue {

  @Prop() private position!: ITokenPosition;
  @Prop() private token!: IToken;

  dragged: boolean = false;

  // @ts-ignore
  @campaigns.Mutation(MutationTypes.UNSELECT_ALL_TOKENS) unselectAllTokens;
  // @ts-ignore
  @campaigns.Mutation(MutationTypes.SELECT_TOKEN) selectToken;
  // @ts-ignore
  @campaigns.Mutation(MutationTypes.START_TOKEN_DRAG) startTokenDrag;
  // @ts-ignore
  @campaigns.Mutation(MutationTypes.END_TOKEN_DRAG) endTokenDrag;

  private selected: boolean = false;
  
  private cellSize: number = CELL_SIZE;

  public get x():number { return this.position.x * CELL_SIZE; }
  public get y():number { return this.position.y * CELL_SIZE; }
  public get color(): string { return this.position.selected ? 'blue': 'red' }

  public select() {
    this.unselectAllTokens();
    this.selectToken(this.position);
  }

  public startDrag(event: any) {
    this.startTokenDrag(this.position)
  }

  public endDrag(event: any) {
    this.dragged = false;
    this.endTokenDrag();
  }
}
</script>

<style scoped>
.token {
  stroke: silver;
  stroke-width: 3px;
}
</style>