/* global Vue, VueRouter, axios */

var HomePage = {
  template: "#home-page",
  data: function() {
    return {
      message: "Hello there,",
      events: [],
      games: [],
      nameFilter: "",
      gameFilter: "",
      sortAttribute: "name",
      map: "",
      sortAscending: true,
      currentEvent: {
        name: "name goes here",
        datetime: "date and time go here",
        address: "address goes here",
        user_id: "user id goes here",
        game_id: "game id goes here",
        num_players: "number of players goes here",
        games: ""
      }
    };
  },
  created: function() {
    axios.get("/v1/events").then(
      function(response) {
        this.events = response.data;
        console.log("Events:", this.events);
      }.bind(this)
    );
  },
  mounted: function() {
    var locations = [
      { description: "215 W Ohio", lat: 41.892156, lng: -87.634794 },
      { description: "1950 N Campbell", lat: 41.917352, lng: -87.690546 },
      { description: "3341 N Elston", lat: 41.942217, lng: -87.702004 },
      { description: "212 E Cullerton", lat: 41.855618, lng: -87.621919 }
    ];

    var map = new google.maps.Map(document.getElementById("map"), {
      zoom: 10,
      center: new google.maps.LatLng(41.9, -87.65)
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
    join: function() {
      var params = {
        user_id: this.user_id,
        event_id: this.currentEvent.id,
        errors: []
      };
      console.log(params);
      console.log(this.currentEvent.id);
      axios
        .post("/v1/event_users", params)
        .then(function(response) {
          router.push("'/#/events/' + event.id");
        })
        .catch(
          function(error) {
            this.errors = error.response.data.errors;
          }.bind(this)
        );
    },
    setCurrentEvent: function(inputEvent) {
      this.currentEvent = inputEvent;
    },
    isValidEventName: function(inputEvent) {
      return inputEvent.name
        .toLowerCase()
        .includes(this.nameFilter.toLowerCase());
    },
    isValidGameFilter: function(inputGame) {
      return inputGame.game.name
        .toLowerCase()
        .includes(this.gameFilter.toLowerCase());
    },
    isValidEvent: function(inputEvent) {
      return (
        this.isValidEventName(inputEvent) && this.isValidEventName(inputEvent)
      );
    },
    setSortAttribute: function(inputSortAttribute) {
      this.sortAttribute = inputSortAttribute;
      this.sortAscending = !this.sortAscending;
    }
  },
  computed: {
    sortedEvents: function() {
      return this.events.sort(
        function(event1, event2) {
          var lowerAttribute1 = event1[this.sortAttribute].toLowerCase();
          var lowerAttribute2 = event2[this.sortAttribute].toLowerCase();
          if (this.sortAscending) {
            return lowerAttribute1.localeCompare(lowerAttribute2);
          } else {
            return lowerAttribute2.localeCompare(lowerAttribute1);
          }
        }.bind(this)
      );
    }
  }
};

var SignupPage = {
  template: "#signup-page",
  data: function() {
    return {
      name: "",
      email: "",
      password: "",
      passwordConfirmation: "",
      errors: []
    };
  },
  methods: {
    submit: function() {
      var params = {
        name: this.name,
        email: this.email,
        password: this.password,
        password_confirmation: this.passwordConfirmation
      };
      axios
        .post("/v1/users", params)
        .then(function(response) {
          router.push("/login");
        })
        .catch(
          function(error) {
            this.errors = error.response.data.errors;
          }.bind(this)
        );
    }
  }
};

var EventsShowPage = {
  template: "#events-show-page",
  data: function() {
    return {
      event: {
        name: "name goes here",
        datetime: "date and time go here",
        address: "address goes here",
        user_id: "user id goes here",
        game_id: "game id goes here",
        num_players: "number of players goes here"
      }
    };
  },
  created: function() {
    console.log("what is this weird $route thing", this.$route);
    axios.get("v1/events/" + this.$route.params.id).then(
      function(response) {
        this.event = response.data;
      }.bind(this)
    );
  },
  methods: {},
  computed: {}
};

var LoginPage = {
  template: "#login-page",
  data: function() {
    return {
      email: "",
      password: "",
      errors: []
    };
  },
  methods: {
    submit: function() {
      var params = {
        auth: { email: this.email, password: this.password }
      };
      axios
        .post("/user_token", params)
        .then(function(response) {
          axios.defaults.headers.common["Authorization"] =
            "Bearer " + response.data.jwt;
          localStorage.setItem("jwt", response.data.jwt);
          router.push("/");
        })
        .catch(
          function(error) {
            this.errors = ["Invalid email or password."];
            this.email = "";
            this.password = "";
          }.bind(this)
        );
    }
  }
};

var EventsNewPage = {
  template: "#events-new-page",
  data: function() {
    return {
      name: "",
      datetime: "",
      address: "",
      user_id: "",
      game_id: "",
      num_players: "",
      errors: []
    };
  },
  methods: {
    submit: function() {
      var params = {
        name: this.name,
        datetime: this.datetime,
        address: this.address,
        user_id: this.user_id,
        game_id: this.game_id,
        num_players: this.num_players
      };
      axios
        .post("/v1/events", params)
        .then(function(response) {
          router.push("/");
        })
        .catch(
          function(error) {
            this.errors = error.response.data.errors;
          }.bind(this)
        );
    }
  }
};

var LogoutPage = {
  template: "<h1>Logout</h1>",
  created: function() {
    axios.defaults.headers.common["Authorization"] = undefined;
    localStorage.removeItem("jwt");
    router.push("/");
  }
};

var DiceRollPage = {
  template: "#DiceRoll",
  mounted: function() {
    dice_initialize(document.body);
  }
};

var router = new VueRouter({
  routes: [
    { path: "/", component: HomePage },
    { path: "/signup", component: SignupPage },
    { path: "/login", component: LoginPage },
    { path: "/logout", component: LogoutPage },
    { path: "/newevent", component: EventsNewPage },
    { path: "/dice", component: DiceRollPage },
    { path: "/events/:id", component: EventsShowPage }
  ],
  scrollBehavior: function(to, from, savedPosition) {
    return { x: 0, y: 0 };
  }
});

var app = new Vue({
  el: "#vue-app",
  router: router,
  created: function() {
    var jwt = localStorage.getItem("jwt");
    if (jwt) {
      axios.defaults.headers.common["Authorization"] = jwt;
    }
  }
});
