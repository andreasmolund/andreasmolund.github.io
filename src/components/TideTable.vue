<template>
  <div class="container">
    <div class="row">
      <div class="col"> 
        <h1 class="display-1">Hamnvik kool</h1>
      </div>
    </div>

    <div class="row">
      <div class="col">
        <table class="table">
          <thead>
            <tr>
              <th scope="col"></th>
              <th scope="col">Flo kl.</th>
              <th scope="col">Nivå (cm)</th>
            </tr>
          </thead>
          <tbody>
            <TideRow v-for="waterlevel, index in waterlevels" :key="index" :waterlevel="waterlevel" :dayindex="index" />
          </tbody>
        </table>
      </div>
    </div>
    
    <div class="row">
      <div class="col"> 
        <p><small>Data hentet fra sehavniva.no</small></p>
      </div>
    </div>
  </div>
</template>

<script>
import TideRow from './TideRow.vue'


export default {
  name: 'TideTable',
  components: {
    TideRow
  },
  props: {
    waterlevels: {
      type: Array,
      required: true,
    }
  },
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
