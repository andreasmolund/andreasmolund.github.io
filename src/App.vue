<template>
  <TideTable :waterlevels="waterlevels"/>
  <!-- <img alt="Vue logo" src="./assets/logo.png"> -->
</template>

<script>
import TideTable from './components/TideTable.vue'
import axios from "axios"
import { addDays, format, addMinutes, parseISO } from "date-fns"
var parseString = require('xml2js').parseString;


export default {
  name: 'App',
  components: {
    TideTable,
  },
  data() {
    return {
      waterlevels: [],
      now: new Date,
      daysToPredict: 14
    }
  },
  methods: {
    getNorwayMidnightInUtc() {
      const today = parseISO(format(this.now, "yyyy-MM-dd"))
      const numberOfMinutesToUtc = this.now.getTimezoneOffset()
      const norwayMidnightInUtc = addMinutes(today, numberOfMinutesToUtc)
      return norwayMidnightInUtc
    },
    getYesterday() {
      let yesterday = format(this.getNorwayMidnightInUtc(), "yyyy-MM-dd")
      return yesterday
    },
    getFrom() {
      let fromTime = format(this.getNorwayMidnightInUtc(), "HH:mm")
      let from = this.getYesterday() + "T" + fromTime
      return from
    },
    getTo() {
      const actualDaysToPredict = this.daysToPredict - 1
      let to = format(addDays(this.now, actualDaysToPredict), "yyyy-MM-dd") + "T22:59"
      return to
    },
    async fetchWaterlevels() {
      let from = this.getFrom()
      let to = this.getTo()
      let url = 'https://api.sehavniva.no/tideapi.php?tide_request=locationdata&lat=68.7782192&lon=17.1796206&datatype=TAB&lang=nb&place=Har&dst=1&fromtime=' + from + '&totime=' + to + '&interval=10&flag=high'
      axios
        .get(url)
        .then(response => {
          var self = this;
          var allWaterlevels = []
          parseString(response.data, {explicitArray: false} , function (err, result) {
            allWaterlevels = result.tide.locationdata.data.waterlevel
          })

          var waterlevelsPerDay = []
          let waterlevelsCurrentDay = []
          var lastDay = "1970-01-01"
          var currentDay = "1970-01-01"
          var i;
          for (i = 0; i < allWaterlevels.length; i++) {

            currentDay = format(new Date(allWaterlevels[i]["$"].time), "yyyy-MM-dd")
            
            if (i == 0) {
              lastDay = currentDay
            }

            if (currentDay === lastDay) {
              waterlevelsCurrentDay.push(allWaterlevels[i])
            } else {
              waterlevelsPerDay.push({day: lastDay, levels: waterlevelsCurrentDay})
              waterlevelsCurrentDay = []
              waterlevelsCurrentDay.push(allWaterlevels[i])
              lastDay = currentDay
            }

          }

          waterlevelsPerDay.push({day: currentDay, levels: waterlevelsCurrentDay})

          self.waterlevels = waterlevelsPerDay
        })
    }
  },
  mounted() {
    this.fetchWaterlevels()
  },
}
</script>
