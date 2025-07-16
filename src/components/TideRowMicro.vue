<template>
  <tr v-if="isHighTide()" :class="classstyle">
    <td scope="row">{{ formatDate(waterlevelInstance.time) }}</td>
    <td>{{ formatTime(waterlevelInstance.time) }}</td>
    <td>{{ formatCm(waterlevelInstance.value) }}</td>
  </tr>
  
</template>

<script>
import { format } from "date-fns"
import { nb } from 'date-fns/locale'

export default {
  props: {
    waterlevelInstance: {
      type: Object,
      required: true,
    },
    highTide: Boolean,
    classstyle: String
  },
  methods: {
    formatDate(strDate) {
      return format(new Date(strDate), "EEEEEE do MMMM", {locale: nb})
    },
    formatTime(strDate) {
      return format(new Date(strDate), "HH:mm")
    },
    isHighTide() {
      return this.waterlevelInstance.flag == "high"
    },
    formatCm(distance) {
      return parseFloat(distance).toFixed(0)
    }
  }
}
</script>

<style scoped>

.monospace {
  font-family: 'Courier New', Courier, monospace;
}

</style>