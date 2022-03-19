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
import { namespace } from 'vuex-class';
import { MutationTypes } from '@/store/campaigns/enums';

const campaigns = namespace('campaigns')

@Component
export default class ZoomableCanva extends Vue {

  // @ts-ignore
  @campaigns.State('origin') origin;

  private clickPosition!: IPosition;

  private dragged: boolean = false;

  private scale: number = 1;

  selection: IPosition | null = null;

  // @ts-ignore
  @campaigns.Mutation(MutationTypes.MOVE_TOKEN) moveToken;
  // @ts-ignore
  @campaigns.Mutation(MutationTypes.END_TOKEN_DRAG) endTokenDrag;
  // @ts-ignore
  @campaigns.Mutation(MutationTypes.MOVE_ORIGIN) moveOrigin;

  public startDrag(event: any) {
    this.clickPosition = {
      x: event.clientX - this.origin.x,
      y: event.clientY - this.origin.y
    };
    this.dragged = true;
  }

  public endDrag(event: any) {
    this.dragged = false;
    this.endTokenDrag();
  }

  public moveDrag(event: any) {
    if (this.dragged) {
      this.moveOrigin({
        x: (event.clientX - this.clickPosition.x),
        y: (event.clientY - this.clickPosition.y),
      });
    }
    this.moveToken({x: event.layerX, y: event.layerY})
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
