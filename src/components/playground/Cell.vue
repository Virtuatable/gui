<template>
  <rect
    :width="cellSize"
    :height="cellSize"
    :x="x * cellSize" :y="y * cellSize"
    class="cell"
  />
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';
import { CELL_SIZE } from '@/utils/constants'

@Component
export default class Cell extends Vue {
  @Prop({ default: 0 }) private x!: number;
  @Prop({ default: 0 }) private y!: number;
  private cellSize: number = CELL_SIZE;
}
</script>

<style scoped>
.cell {
  stroke: silver;
  stroke-width: 3px;
  fill: white;
}
</style>