<template>
  <TideRowMicro
      v-for="(waterlevelInstance, index) in extractLevels(waterlevel)" 
      :key="index" 
      :waterlevelInstance="waterlevelInstance"
      :classstyle="getColor(dayindex)" />  
</template>

<script>
import TideRowMicro from './TideRowMicro.vue'

export default {
  components: {
    TideRowMicro
  },
  props: {
    waterlevel: {
      type: Object,
      required: true,
    },
    dayindex: Number
  },
  methods: {
    extractLevels(waterlevelObject) {
      return waterlevelObject.levels
    },
    getColor(number) {
      let evenNumber = number % 2 == 0
      if (evenNumber) {
        return "table-default"
      } else {
        return "table-secondary"
      }
    }
  },
  mounted() {
    // console.log("TideRow mounted. Data for dag:", this.waterlevel)
  }
}
</script>