<template>
  <svg
    xmlns="http://www.w3.org/2000/svg"
    @mousedown="startDrag({x: $event.clientX, y: $event.clientY})"
    @mouseup="endDrag()"
    @wheel="setScale($event.deltaY);"
    @mousemove="moveDrag({x: $event.clientX, y: $event.clientY})"
  >
    <g
      class="draggable"
      draggable
      :transform="`translate(${position.x} ${position.y}) scale(${scale} ${scale})`"
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
import { ns } from '@/utils/namespaces'
import { CanvaMTypes, canvaMutations } from '@/store/canva/mutations';

const campaigns = namespace('campaigns')

@Component
export default class ZoomableCanva extends Vue {

  selection: IPosition | null = null;

  @ns.canva.State('scale') scale!: number;
  
  @ns.canva.State('position') position!: number;

  // @ts-ignore
  @ns.canva.Mutation(CanvaMTypes.END_DRAG) endDrag;
  // @ts-ignore
  @ns.canva.Mutation(CanvaMTypes.MOVE_DRAG) moveDrag;
  // @ts-ignore
  @ns.canva.Mutation(CanvaMTypes.START_DRAG) startDrag;
  // @ts-ignore
  @ns.canva.Mutation(CanvaMTypes.SET_SCALE) setScale;

  // @ts-ignore
  @campaigns.Mutation(MutationTypes.END_TOKEN_DRAG) endTokenDrag;
  // @ts-ignore
  @campaigns.Mutation(MutationTypes.MOVE_ORIGIN) moveOrigin;
}
</script>

<style scoped>
svg {
  width: 100%;
  height: calc(100vh - 72px);
  overflow: hidden;
}
</style>
