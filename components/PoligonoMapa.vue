<template>
  <v-card class="mapContainer mb-4" height="100%">
    <v-toolbar dense>
      <v-spacer />
      <v-btn class="primary" @click="guardar">
        Guardar
      </v-btn>
    </v-toolbar>
    <v-card-text>
      <Mapa ref="mapa" :muestraprop="1" :radioprop="5" />
    </v-card-text>
  </v-card>
</template>

<script>
import { mapActions } from 'vuex'
import { latLng } from 'leaflet'
import json from '../db'
import Mapa from './Mapa.vue'
export default {
  name: 'LeafletMap',
  components: {
    Mapa
  },
  data () {
    return {
    }
  },
  created () {
    this.cargaPoligonos()
    this.inicializaValores()
  },

  methods: {
    ...mapActions(['setPoligon', 'setCircle', 'setCenter', 'setMarker']),
    cargaPoligonos () {
      const polygon = {
        latlngs: json.features[0].geometry.coordinates[0],
        color: '#ffffff'
      }
      this.setPoligon(polygon)
    },
    inicializaValores () {
      const center = latLng(-75.80318792584497, -14.010508830892729)
      const circle = {
        center,
        radius: 0
      }
      this.setCenter(center)
      this.setCircle(circle)
      this.setMarker(center)
    },
    guardar () {
      this.$refs.mapa.guardaMarker()
      /* if (this.marketVisible) {
        const markerAux = {
          position: {
            latitude: this.marker.lat,
            longitude: this.marker.lng
          },
          radio: this.radio,
          num_samples: this.muestras
        }
        this.markers = this.markers.concat(markerAux)
        console.log(this.markers)
        this.limpiaPunto()
      } */
    }
  }
}
</script>

<style scoped>
#mapContainer {
  width: 80%;
  height: 60vh;
  margin-top: 2rem;
  padding: 0;
}

</style>
