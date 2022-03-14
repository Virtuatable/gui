<template>
  <Canva v-if="map">
    <template v-for="i in map.height">
      <rect
        v-for="j in map.width"
        :key="`[${i};${j}]`"
        stroke="grey"
        stroke-width="3"
        fill="white"
        :x="(j - 1) * cellSize"
        :y="(i - 1) * cellSize"
        :width="cellSize"
        :height="cellSize"
      />
    </template>
  </Canva>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';
import IMap from "@/interfaces/IMap";
import Canva from '@/components/playground/Canva.vue'
import { CELL_SIZE } from '@/utils/constants'

@Component({
  components: { Canva }
})
export default class Map extends Vue {

  private cellSize: number = CELL_SIZE;
  
  @Prop() private map!: IMap;
}
</script>
