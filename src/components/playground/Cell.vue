<template>
  <rect
    :width="cellSize"
    :height="cellSize"
    :x="x * cellSize" :y="y * cellSize"
    class="cell"
    @mouseenter="moveToken({x, y})"
    @click="unselectAllTokens"
  />
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';
import { CELL_SIZE } from '@/utils/constants'
import { namespace } from 'vuex-class';
import { MutationTypes } from '@/store/campaigns/enums';

const campaigns = namespace('campaigns')

@Component
export default class Cell extends Vue {
  // @ts-ignore
  @campaigns.Mutation(MutationTypes.MOVE_TOKEN) moveToken;
  // x-position in the matrix of cells of the map.
  @Prop({ default: 0 }) private x!: number;
  // y-position in the matrix of cells of the map.
  @Prop({ default: 0 }) private y!: number;
  // Size, in pixels of both the height and width of a cell.
  private cellSize: number = CELL_SIZE;
  // @ts-ignore
  @campaigns.Mutation(MutationTypes.UNSELECT_ALL_TOKENS) unselectAllTokens;
}
</script>

<style scoped>
.cell {
  stroke: silver;
  stroke-width: 3px;
  fill: white;
}
</style>