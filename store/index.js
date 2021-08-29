
export const state = () => ({
  polygon: {
    latlngs: [],
    color: ''
  },
  circle: {
    center: {},
    radius: 0
  },
  url: 'http://{s}.tile.osm.org/{z}/{x}/{y}.png',
  attribution:
        '&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors',
  zoom: 16,
  center: {},
  marker: {},
  markers: []
})
export const mutations = {
  savePolygon (state, polygon) {
    state.polygon = polygon
  },
  saveCircle (state, circle) {
    state.circle = circle
  },
  saveMarker (state, marker) {
    state.marker = marker
  },
  saveCenter (state, center) {
    state.center = center
  },
  saveMarkers (state, marker) {
    state.markers = state.markers.concat(marker)
  }
}
export const actions = {
  setPoligon ({ commit }, polygon) {
    commit('savePolygon', polygon)
  },
  setCircle ({ commit }, circle) {
    commit('saveCircle', circle)
  },
  setCenter ({ commit }, center) {
    commit('saveCenter', center)
  },
  setMarker ({ commit }, marker) {
    commit('saveMarker', marker)
  },
  setMarkers ({ commit }, marker) {
    commit('saveMarkers', marker)
  }
}
