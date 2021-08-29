<template>
  <l-map style="height: 500px" :zoom="zoom" :center="center">
    <l-tile-layer :url="url" :attribution="attribution" />
    <l-polygon
      :lat-lngs="polygon.latlngs"
      :color="polygon.color"
      @click="seleccionaPunto"
    />
    <l-circle
      v-if="marketVisible"
      :lat-lng="circle.center"
      :radius="circle.radius"
    />
    <l-marker
      v-if="marketVisible"
      :lat-lng="marker"
    >
      <l-tooltip :options="{ permanent: true, interactive: true }">
        <div class="container">
          <div class="popup">
            <v-text-field
              v-model="muestras"
              label="Muestras"
              outlined
              dense
              class="input-name"
              type="number"
            />
            <v-text-field
              v-model="radio"
              label="Radio(m)"
              outlined
              dense
              class="input-name"
              type="number"
              @keyup="actualizaCircle()"
            />
          </div>
          <v-divider
            class="mx-4"
            vertical
          />
          <v-icon
            medium
            color="red darken-2"
            @click="limpiaPunto()"
          >
            mdi-trash-can-outline
          </v-icon>
        </div>
      </l-tooltip>
      <l-icon
        :icon-url="require('@/assets/images/market.png')"
      />
    </l-marker>
  </l-map>
</template>

<script>
import { mapActions, mapState } from 'vuex'
import { LMap, LTileLayer, LPolygon, LCircle, LMarker, LIcon, LTooltip } from 'vue2-leaflet'

export default {
  components: {
    LMap,
    LTileLayer,
    LPolygon,
    LCircle,
    LMarker,
    LIcon,
    LTooltip
  },
  props: {
    muestraprop: {
      type: Number,
      default: 0
    },
    radioprop: {
      type: Number,
      default: 0
    }
  },
  data () {
    return {
      marketVisible: false,
      muestras: this.muestraprop,
      radio: this.radioprop
    }
  },
  computed: {
    ...mapState(['marker', 'markers', 'circle', 'zoom', 'center', 'url', 'attribution', 'polygon'])
  },

  methods: {
    ...mapActions(['setMarker', 'setCircle', 'setMarkers']),
    seleccionaPunto (e) {
      this.marketVisible = true
      this.setMarker(e.latlng)
      this.muestras = this.muestraprop
      this.radio = this.radioprop
      this.actualizaCircle()
    },
    limpiaPunto () {
      this.marketVisible = false
      this.setMarker(this.center)
      this.muestras = this.muestraprop
      this.radio = this.radioprop
      this.actualizaCircle()
    },
    actualizaCircle () {
      const circleAux = {
        center: this.marker,
        radius: Number(this.radio)
      }
      this.setCircle(circleAux)
    },
    guardaMarker () {
      if (this.marketVisible) {
        const markerAux = {
          position: {
            latitude: this.marker.lat,
            longitude: this.marker.lng
          },
          radio: this.radio,
          num_samples: this.muestras
        }
        this.setMarkers(markerAux)
        console.log(this.markers)
        this.limpiaPunto()
      }
    }
  }
}
</script>
