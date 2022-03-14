<template>
    <svg
      xmlns="http://www.w3.org/2000/svg"
      @mousedown="startDrag"
      @mouseup="endDrag"
      @wheel="zoom"
      @mousemove="moveDrag"
    >
      <g
        class="draggable"
        draggable
        :transform="`translate(${origin.x} ${origin.y}) scale(${scale} ${scale})`"
        ref="mainGroup"
      >
        <slot />
      </g>
    </svg>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import IPosition from '@/interfaces/utils/IPosition'

@Component
export default class ZoomableCanva extends Vue {

  private origin: IPosition = {x: 10, y: 10}

  private clickPosition!: IPosition;

  private dragged: boolean = false;

  private scale: number = 1;

  selection: IPosition | null = null;

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
  }
}
</script>

<style scoped>
svg {
  width: 100%;
  height: calc(100vh - 72px);
  overflow: hidden;
}
</style>
