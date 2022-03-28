<template>
  <g
    @mousedown.stop="startSelection(); startDrag(position)"
    @mouseup.stop="stopDrag(position); validateSelection(position)"
    @mousemove="cancelSelection"
    @mouseleave="cancelSelection"
  >
    <pattern
      :id="position.id"
      x="0"
      y="0"
      height="1"
      width="1"
    >
      <image v-bind="adjustments" :key="`image-${token.id}`" :xlink:href="avatar" />
    </pattern>
    <circle
      :cx="x"
      :cy="y"
      :r="cellSize / 2"
      :fill="`url(#${position.id})`"
      :stroke="color"
      stroke-width="3"
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
import { ns } from '@/utils/namespaces'
import { TokensMTypes } from '@/store/tokens/mutations';

const campaigns = namespace('campaigns');

@Component
export default class Token extends Vue {

  @Prop() private position!: ITokenPosition;
  @Prop({ default: CampaignsFactory.empty }) private campaign!: ICampaign;

  private adjustments: any = {};

  @ns.tokens.State('selected') selected!: ITokenPosition;

  @ns.tokens.Mutation(TokensMTypes.START_DRAG) startDrag: any;

  @ns.tokens.Mutation(TokensMTypes.STOP_DRAG) stopDrag: any;

  @ns.tokens.Mutation(TokensMTypes.START_SELECTION) startSelection: any;

  @ns.tokens.Mutation(TokensMTypes.CANCEL_SELECTION) cancelSelection: any;

  @ns.tokens.Mutation(TokensMTypes.VALIDATE_SELECTION) validateSelection: any;

  // @ts-ignore
  @campaigns.Mutation(MutationTypes.UNSELECT_ALL_TOKENS) unselectAllTokens;
  // @ts-ignore
  @campaigns.Mutation(MutationTypes.SELECT_TOKEN) selectToken;
  
  private cellSize: number = CELL_SIZE;

  public get x():number { return (this.position.x + 0.5) * CELL_SIZE; }
  public get y():number { return (this.position.y + 0.5) * CELL_SIZE; }
  public get token(): IToken|undefined {
    return this.campaign.tokens.find((t: IToken) => t.id == this.position.token_id);
  }

  public mounted() {
    const uri = `/tokens/${this.campaign.id}/${this.token?.id}.${this.token?.file_extension}`;
    ImagesFactory.getSize(uri).then(({width, height}: IDimension) => {
      this.adjustments = ImagesFactory.getAdjustments(width, height)
    })
  }

  public get avatar(): string {
    return api.path('/tokens/' + this.campaign.id + '/' + this.token?.id + '.' + this.token?.file_extension)
  }

  public get color(): string {
    return (this.selected.id == this.position.id) ? 'red' : 'silver'
  }
}
</script>

<style scoped>
.token-name {
  pointer-events: none;
  user-select: none;
}
</style>