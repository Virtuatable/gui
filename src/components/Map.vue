<template>
  <Canva v-if="map">
    <template v-for="i in map.height">
      <Cell v-for="j in map.width" :key="`${i}:${j}`" :x="j - 1" :y="i - 1" />
    </template>
  </Canva>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';
import IMap from "@/interfaces/IMap";
import Canva from '@/components/playground/Canva.vue'
import Cell from '@/components/playground/Cell.vue'

@Component({
  components: { Canva, Cell }
})
export default class Map extends Vue {
  @Prop() private map!: IMap;
}
</script>
