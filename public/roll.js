/* global Vue, VueRouter, axios, google, THREE*/

var HomePage = {
  template: "#home-page",
  data: function() {
    return {
      message: "BAKU THE MOONEATER",
      error: [],
      places: [],
      newPlaceName: "",
      newPlaceAddress: "",
      map: ""
    };
  },
  mounted: function() {
    var locations = [
      { description: "Bondi Beach", lat: -33.890542, lng: 151.274856 },
      { description: "Coogee Beach", lat: -33.923036, lng: 151.259052 },
      { description: "Cronulla Beach", lat: -34.028249, lng: 151.157507 },
      {
        description: "Manly Beach",
        lat: -33.80010128657071,
        lng: 151.28747820854187
      },
      { description: "Maroubra Beach", lat: -33.950198, lng: 151.259302 }
    ];

    var map = new google.maps.Map(document.getElementById("map"), {
      zoom: 10,
      center: new google.maps.LatLng(-33.92, 151.25)
    });

    locations.forEach(function(location) {
      var marker = new google.maps.Marker({
        position: location,
        map: map
      });

      let infowindow = new google.maps.InfoWindow({
        content: location.description
      });

      marker.addListener("click", function() {
        infowindow.open(map, marker);
      });
    });
  },
  methods: {
    createPerson: function() {
      // this.errors = [];

      var params = {};
      if (this.newPlaceName) {
        params.name = this.newPlaceName;
      }
      if (this.newPlaceAddress) {
        params.address = this.newPlaceAddress;
      }

      axios.post("/v1/places", params).then(
        function(response) {
          this.places.push(response.data);
          this.newPlaceName = "";
          this.newPlaceAddress = "";
        }.bind(this)
      );
      // .catch(
      //   function(error) {
      //     console.log("something went wrong", error.response.data.errors);
      //     this.errors = error.response.data.errors;
      //   }.bind(this)
      // );
    }
  },
  computed: {}
};

var router = new VueRouter({
  routes: [{ path: "/", component: HomePage }],
  scrollBehavior: function(to, from, savedPosition) {
    return { x: 0, y: 0 };
  }
});

var app = new Vue({
  el: "#vue-app",
  router: router
});
