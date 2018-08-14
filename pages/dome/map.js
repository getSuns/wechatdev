Page({
  data: {
    markers: [{
      iconPath: "../res/my-icon.png",
      id: 0,
      latitude: 23.099994,
      longitude: 113.324520,
      width: 20,
      height: 20
    }],
    polyline: [{
      points: [{
        longitude: 113.3245211,
        latitude: 23.10229
      }, {
        longitude: 113.324520,
        latitude: 23.21229
      }],
      color: "#000000",
      width: 5,
      dottedLine: true
    }],
    controls: [{
      id: 1,
      iconPath: '../res/icon2.png',
      position: {
        left: 0,
        top: 300 - 50,
        width: 50,
        height: 50
      },
      clickable: true
    }]
  },
  regionchange(e) {
    console.log("regionchange"+e.type)
  },
  markertap(e) {
    console.log("markertap"+e.markerId)
  },
  controltap(e) {
    console.log("controltap"+e.controlId)
  }
})