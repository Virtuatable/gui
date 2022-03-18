<template>
  <g @mousedown.stop @mouseup.stop @click="select">
    <rect :x="x" :y="y" :width="cellSize" :height="cellSize" class="token" :fill="color" />
    <text :x="x" :y="y">{{ token.name }}</text>
  </g>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';
import IToken, { ITokenPosition }  from '@/interfaces/IToken'
import { CELL_SIZE } from '@/utils/constants'

@Component
export default class Token extends Vue {

  @Prop() private position!: ITokenPosition;
  @Prop() private token!: IToken;

  private selected: boolean = false;
  
  private cellSize: number = CELL_SIZE;

  public get x():number { return this.position.x * CELL_SIZE; }
  public get y():number { return this.position.y * CELL_SIZE; }
  public get color() { return this.selected ? 'red' : 'blue'}

  public select() {
    this.selected = true;
  }
}
</script>

<style scoped>
.token {
  stroke: silver;
  stroke-width: 3px;
}
</style>