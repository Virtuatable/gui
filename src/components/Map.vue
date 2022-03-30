<template>
  <Canva v-if="map">
    <template v-for="i in map.height">
      <Cell v-for="j in map.width" :key="`${i}:${j}`" :x="j - 1" :y="i - 1" />
    </template>
    <Token v-for="pos in tokens" :campaign="campaign" :position="pos" :key="pos.id" />
  </Canva>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';
import IMap from "@/interfaces/IMap";
import Canva from '@/components/playground/Canva.vue'
import Cell from '@/components/playground/Cell.vue'
import Token from '@/components/playground/Token.vue'
import { sortBy } from 'lodash'
import ICampaign from '@/interfaces/ICampaign'
import CampaignsFactory from '@/factories/CampaignsFactory';
import { ITokenPosition } from '@/interfaces/IToken';
import { ns } from '@/utils/namespaces'

@Component({
  components: { Canva, Cell, Token }
})
export default class Map extends Vue {
  @Prop() private map!: IMap;

  @Prop({ default: CampaignsFactory.empty }) private campaign!: ICampaign;

  @ns.tokens.State('dragged') dragged!: ITokenPosition;

  /**
   * Sorts the tokens by descending Y coordinate so that the lower ones
   * are displayed before, therefore not hiding the labels of the higher ones.
   * @return {Array<ITokenPosition>} the sorted positions of the tokens.
   */
  public get tokens(): Array<ITokenPosition> {
    return sortBy(this.map.tokens, ['y', 'x', 'id']).reverse()
  }
}
</script>
