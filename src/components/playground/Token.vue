<template>
  <g @mousedown.stop="startDrag" @mouseup.stop="endDrag" @click.stop="select">
    <pattern
      :id="position.id"
      x="0"
      y="0"
      height="1"
      width="1"
    >
      <image x="0" y="0" v-bind="sizeLimiters" :key="`image-${token.id}`" :xlink:href="avatar" />
    </pattern>
    <circle
      :cx="x"
      :cy="y"
      :r="cellSize / 2"
      :fill="`url(#${position.id})`"
      class="token"
    />
    <text class="token-name" :x="x - 45" :y="y + 65" fill="grey" stroke="white" stroke-width="0.5" @click.stop>{{ token.name }}</text>
  </g>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';
import IToken, { ITokenPosition }  from '@/interfaces/IToken'
import { CELL_SIZE } from '@/utils/constants'
import { namespace } from 'vuex-class'
import { MutationTypes } from '@/store/campaigns/enums';
import ImagesFactory from '@/factories/ImagesFactory'
import CampaignsFactory from '@/factories/CampaignsFactory';
import ICampaign from '@/interfaces/ICampaign';
import IDimension from '@/interfaces/IDimension';
import api from '@/api/utils/Api'

const campaigns = namespace('campaigns');

@Component
export default class Token extends Vue {

  @Prop() private position!: ITokenPosition;
  @Prop({ default: CampaignsFactory.empty }) private campaign!: ICampaign;

  dragged: boolean = false;

  private sizeLimiters: any = {};

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

  public get x():number { return (this.position.x + 0.5) * CELL_SIZE; }
  public get y():number { return (this.position.y + 0.5) * CELL_SIZE; }
  public get color(): string { return this.position.selected ? 'blue': 'red' }
  public get token(): IToken|undefined {
    return this.campaign.tokens.find((t: IToken) => t.id == this.position.token_id);
  }

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

  public mounted() {
    console.log("mounted");
    const uri = `/tokens/${this.campaign.id}/${this.token?.id}.${this.token?.file_extension}`;
    ImagesFactory.getSize(uri).then((dimension: IDimension) => {
      if (dimension.width > dimension.height) {
        this.sizeLimiters = {height: this.cellSize }
      }
      else {
        this.sizeLimiters = {width: this.cellSize}
      }
    })
  }
  public get avatar(): string {
    return api.path('/tokens/' + this.campaign.id + '/' + this.token?.id + '.' + this.token?.file_extension)
  }
}
</script>

<style scoped>
.token {
  stroke: silver;
  stroke-width: 3px;
}
.token-name {
  pointer-events: none;
  user-select: none;
}
</style>