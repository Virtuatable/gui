<template>
  <div>
    {{ map.tokens }}
    <Canva v-if="map">
      <template v-for="i in map.height">
        <Cell v-for="j in map.width" :key="`${i}:${j}`" :x="j - 1" :y="i - 1" />
      </template>
      <Token v-for="(pos, idx) in map.tokens" :position="pos" :token="getToken(pos)" :key="idx" />
    </Canva>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';
import IMap from "@/interfaces/IMap";
import IToken, { ITokenPosition } from "@/interfaces/IToken";
import Canva from '@/components/playground/Canva.vue'
import Cell from '@/components/playground/Cell.vue'
import Token from '@/components/playground/Token.vue'

@Component({
  components: { Canva, Cell, Token }
})
export default class Map extends Vue {
  @Prop() private map!: IMap;

  @Prop({ default: () => [] }) private tokens!:Array<IToken>;

  public getToken(position: ITokenPosition): IToken|undefined {
    return this.tokens.find(t => t.id == position.id);
  }
}
</script>
