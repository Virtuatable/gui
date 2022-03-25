<template>
  <Canva v-if="map">
    <template v-for="i in map.height">
      <Cell v-for="j in map.width" :key="`${i}:${j}`" :x="j - 1" :y="i - 1" />
    </template>
    <Token v-for="(pos, idx) in sortedTokens" :position="pos" :token="getToken(pos)" :key="idx" />
  </Canva>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';
import IMap from "@/interfaces/IMap";
import IToken, { ITokenPosition } from "@/interfaces/IToken";
import Canva from '@/components/playground/Canva.vue'
import Cell from '@/components/playground/Cell.vue'
import Token from '@/components/playground/Token.vue'
import { sortBy } from 'lodash'
import { namespace } from 'vuex-class'

@Component({
  components: { Canva, Cell, Token }
})
export default class Map extends Vue {
  @Prop() private map!: IMap;

  @Prop({ default: () => [] }) private tokens!:Array<IToken>;

  public getToken(position: ITokenPosition): IToken|undefined {
    return this.tokens.find(t => t.id == position.id);
  }

  public pouet() {
    console.log("test pouet");
  }

  /**
   * Sorts the tokens by descending Y coordinate so that the lower ones
   * are displayed before, therefore not hiding the labels of the higher ones.
   * @return {Array<ITokenPosition>} the sorted positions of the tokens.
   */
  public get sortedTokens(): Array<ITokenPosition> {
    return sortBy(this.map.tokens, (t: ITokenPosition) => -t.y);
  }
}
</script>
