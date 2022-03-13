<template>
  <svg xmlns="http://www.w3.org/2000/svg" v-if="map" @mouseleave="endDrag">
    <g class="draggable" @mousedown="startDrag" @mouseup="endDrag" @mousemove="moveDrag" draggable>
      <template v-for="i in map.height">
        <rect
          v-for="j in map.width"
          :key="`[${i};${j}]`"
          stroke="black"
          fill="white"
          :x="origin.x + (j * cellSize)"
          :y="origin.y + (i * cellSize)"
          :width="cellSize"
          :height="cellSize"
        />
      </template>
    </g>
  </svg>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';
import IMap from "@/interfaces/IMap";

interface IPosition {
  x: number;
  y: number;
}

@Component
export default class Map extends Vue {

  private cellSize: number = 100;

  private origin: IPosition = {x: 0, y: 0}

  private clickPosition!: IPosition;

  private dragged: boolean = false;
  
  @Prop() private map!: IMap;

  public startDrag(event: any) {
    console.log('starting the drag')
    this.clickPosition = {
      x: event.clientX - this.origin.x,
      y: event.clientY - this.origin.y
    };
    this.dragged = true;
  }
  public endDrag(event: any) {
    this.dragged = false;
  }
  public moveDrag(event: any) {
    if (this.dragged) {
      this.origin = {
        x: event.clientX - this.clickPosition.x,
        y: event.clientY - this.clickPosition.y,
      }
    }
  }
}
</script>

<style scoped>
.draggable {
  cursor: move;
}
</style>

<style scoped>
svg {
  width: 100%;
  height: calc(100vh - 72px);
  overflow: hidden;
}
</style>
