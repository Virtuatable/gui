<template>
  <svg xmlns="http://www.w3.org/2000/svg" v-if="map" @mouseleave="endDrag" @wheel="zoom">
    <g :transform="`translate(${origin.x} ${origin.y}) scale(${scale} ${scale})`">
      <g
        class="draggable"
        @mousedown="startDrag"
        @mouseup="endDrag"
        @mousemove="moveDrag"
        draggable
      >
        <template v-for="i in map.height">
          <rect
            v-for="j in map.width"
            :key="`[${i};${j}]`"
            stroke="black"
            fill="white"
            :x="(j - 1) * cellSize"
            :y="(i - 1) * cellSize"
            :width="cellSize"
            :height="cellSize"
            @mousedown="startSelection()"
            @mouseup="endSelection(j - 1, i - 1)"
          />
        </template>
      </g>
      <g v-if="selection">
      <rect
          fill="grey"
          :x="selection.x * cellSize"
          :y="selection.y * cellSize"
          :width="cellSize"
          :height="cellSize"
          stroke="black"
        ></rect>
      </g>
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

  private origin: IPosition = {x: 10, y: 10}

  private clickPosition!: IPosition;

  private dragged: boolean = false;

  private selecting: boolean = false;

  private scale: number = 1;

  selection: IPosition | null = null;
  
  @Prop() private map!: IMap;

  public startDrag(event: any) {
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
    this.selecting = false
    if (this.dragged) {
      this.origin = {
        x: (event.clientX - this.clickPosition.x),
        y: (event.clientY - this.clickPosition.y),
      }
    }
  }
  public zoom(event: any) {
    this.endDrag(event);
    this.scale += event.deltaY * -0.01;
    this.scale = Math.min(Math.max(.125, this.scale), 4);
    console.log(this.scale);
  }

  public startSelection() {
    this.selecting = true;
  }

  public endSelection(x: number, y: number) {
    if (this.selecting) this.selection = {x, y}
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
