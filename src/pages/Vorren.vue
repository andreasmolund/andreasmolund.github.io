<template>
    <TideTable :waterlevels="waterlevels"/>
</template>

<script>
import TideTable from '../components/TideTable.vue'
import axios from "axios"
import { addDays, format, addMinutes, parseISO } from "date-fns"
import { XMLParser } from 'fast-xml-parser'

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
      let url = 'https://vannstand.kartverket.no/tideapi.php?tide_request=locationdata&lat=68.7782192&lon=17.1796206&datatype=TAB&lang=nb&place=Har&dst=1&fromtime=' + from + '&totime=' + to + '&interval=10&flag=high'

      try {
        const response = await axios.get(url)

        const parser = new XMLParser({
          ignoreAttributes: false,
          attributeNamePrefix: '',
        })  

        const result = parser.parse(response.data)
        
        const allWaterlevels = result.tide.locationdata.data.waterlevel

        var waterlevelsPerDay = []
        let waterlevelsCurrentDay = []
        var lastDay = "1970-01-01"
        var currentDay = "1970-01-01"
        var i;
        for (i = 0; i < allWaterlevels.length; i++) {

          const waterLevel = allWaterlevels[i]

          currentDay = format(new Date(waterLevel.time), "yyyy-MM-dd")
          
          if (i == 0) {
            lastDay = currentDay
          }

          if (currentDay === lastDay) {
            waterlevelsCurrentDay.push(waterLevel)
          } else {
            waterlevelsPerDay.push({day: lastDay, levels: waterlevelsCurrentDay})
            waterlevelsCurrentDay = []
            waterlevelsCurrentDay.push(waterLevel)
            lastDay = currentDay
          }

        }

        waterlevelsPerDay.push({day: currentDay, levels: waterlevelsCurrentDay})

        // self.waterlevels = waterlevelsPerDay
        this.waterlevels = waterlevelsPerDay
        
      } catch (error) {
        console.error('Error fetching or parsing XML:', error)
      }
        
    }
  },
  mounted() {
    this.fetchWaterlevels()
  },
}
</script>
