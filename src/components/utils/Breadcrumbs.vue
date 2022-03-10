<template>
  <v-breadcrumbs :items="items">
    <template v-slot:divider>
      <v-icon>mdi-chevron-right</v-icon>
    </template>
  </v-breadcrumbs>
</template>

<script lang="ts">
import BreadcrumbsFactory, { Breadcrumb } from '@/factories/BreadcrumbsFactory';
import { Component, Prop, Vue } from 'vue-property-decorator'

@Component
export default class Breadcrumbs extends Vue {

  private items: Array<Breadcrumb> = [];

  @Prop({default: false}) private disableLast!: boolean;

  mounted() {
    this.items = BreadcrumbsFactory.fromRoute(this.$route);
    if(this.disableLast) {
      this.items[this.items.length - 1].disabled = true
    }
  }
}
</script>