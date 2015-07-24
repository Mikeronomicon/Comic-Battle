$(document).ready(function() {

  //define the character model
  var Character = Backbone.Model.extend({
      defaults: {
        ko: false,
        name: "",
        type: "",
        deck: "",
        image: ""
      },
      attribute: function() {
        if (this.get("name") === "batman" || this.get("name") ===
          "daredevil" || this
          .get("name") === "hulk" || this.get("name") === "joker") {
          this.set("type", "strength")
        } else if (this.get("name") === "superman" || this.get("name") ===
          "spider-man" || this.get("name") === "cyclops" ||
          this.get("name") === "carnage") {
          this.set("type", "energy")
        } else {
          this.set("type", "magic")
        }
      }
    })
    // start of test data for testing fight logic
  var leftCharacter = new Character()
  leftCharacter.set({
    name: "batman"
  })
  leftCharacter.attribute()

  var carnage = new Character()
  carnage.set({
    name: "carnage"
  })
  carnage.attribute()

  var superman = new Character()
  superman.set({
    name: "superman"
  })
  superman.attribute()

  var rightCharacter = new Character()
  rightCharacter.set({
    name: "cyclops"
  })
  rightCharacter.attribute()

  var shazaam = new Character()
  shazaam.set({
    name: "billy-batson"
  })
  shazaam.attribute()

  var martianManhunter = new Character()
  martianManhunter.set({
    name: "martian-manhunter"
  })
  martianManhunter.attribute()

  // end of test logic

  // var RoundModel = Backbone.Model.extend({
  //   initialize: function() {
  //     leftCharacter = new Character()
  //     rightCharacter = new Character()
  //   }
  // })
  //
  // var MatchModel = Backbone.Model.extend({
  //   defaults: {
  //     rounds: []
  //   }
  // })
  //
  // var match = new MatchModel({
  //   rounds: [
  //     new RoundModel({
  //       leftCharacter: new Character(),
  //       rightCharacter: new Character()
  //     }),
  //     new RoundModel({
  //       leftCharacter: new Character(),
  //       rightCharacter: new Character()
  //     }),
  //     new RoundModel({
  //       leftCharacter: new Character(),
  //       rightCharacter: new Character()
  //     }),
  //   ]
  // })

  var CharacterCollection = Backbone.Collection.extend({
    model: Character,
    //url: '/fillOut'
    url: '/api/characters'
  })

  var User = Backbone.Model.extend({
    defaults: {
      id: 0,
      username: '',
      win: 0,
      loss: 0,
      hero1: '',
      hero2: '',
      hero3: ''
    }
  })

  var leftTeam = new CharacterCollection()

  var rightTeam = new CharacterCollection()

  leftTeam.add([leftCharacter, carnage, superman])
  rightTeam.add([rightCharacter, shazaam, martianManhunter])

  var UserCollection = Backbone.Collection.extend({
    model: User,
    url: '/users'
  })

  var FightView = Backbone.View.extend({
    tagName: "div",
    className: "fight-view",
    template: _.template($("#fight-view").html()),
    initialize: function() {
      this.render()
    },
    render: function() {
      this.$el.html(this.template)
    },
    fight: function() {
      console.log(rightCharacter.get("type"))
      if (leftCharacter.get("type") === rightCharacter.get("type")) {
        console.log("Draw")
        leftCharacter.set("ko", true)
        rightCharacter.set("ko", true)
      } else if (leftCharacter.get("type") === "strength" &&
        rightCharacter.get("type") ===
        "energy") {
        console.log(leftCharacter.get("name") + " wins!")
        rightCharacter.set("ko", true)
      } else if (leftCharacter.get("type") === "strength" &&
        rightCharacter.get("type") ===
        "magic") {
        console.log(rightCharacter.get("name") + " wins!")
        leftCharacter.set("ko", true)
      } else if (leftCharacter.get("type") === "energy" &&
        rightCharacter.get("type") ===
        "strength") {
        console.log(rightCharacter.get("name") + " wins!")
        leftCharacter.set("ko", true)
      } else if (leftCharacter.get("type") === "energy" &&
        rightCharacter.get("type") ===
        "magic") {
        console.log(leftCharacter.get("name") + " wins!")
        rightCharacter.set("ko", true)
      } else {
        console.log(leftCharacter.get("name") + " wins!")
        rightCharacter.set("ko", true)
      }
      console.log(rightCharacter)
    },
    events: {
      "click #fight": "fight"
    }
  })

  var characterList = new CharacterCollection;

  //creating a view for login
  //view creates a div with a tag name to house html
  //elements in the jade template
  var LoginView = Backbone.View.extend({
    tagName: "div",
    className: "login-view",
    template: _.template($("#template-login").html()),

    initialize: function() {
      //console.log(this.$el);
      this.render()
    },

    render: function() {
      this.$el.html(this.template)
    }
  })

  var SignupView = Backbone.View.extend({
    tagName: "div",
    className: "signup-view",
    template: _.template($("#template-signup").html()),

    initialize: function() {
      this.render()
    },

    render: function() {
      this.$el.html(this.template)
    }
  })

  // var CharacterView = Backbone.View.extend({
  // 	tagName : "div",
  // 	className : "characterSelect-view",
  // 	template : _.template($("#template-characterSelect").html()),
  //   addCharacter : function(character){
  //     //create new view for this character
  //     //console.log(character)
  //     var view = new CharacterView({ model : character })
  //     //push the view into array for removal later
  //     viewArray.push(view)
  //     //console.log("This is an array of views : " + view)
  //     this.$("#characters-list").append(view.$el);
  //   },
  // 	initialize: function(){
  //     var that = this
  //     that.listenTo(that.collection, 'add', that.addView);
  //     //console.log(this.$el)
  //     characterList.fetch({success: render
  //   		that.render()
  //       console.log(charData)
  //     })
  // 	},
  // 	render: function(){
  // 		this.$el.html(this.template)
  // 	},
  //   addModel : function () {
  //     this.collection.add({});
  //   },
  //   addView : function(){
  //     var view = new CharacterView({model : newModel})
  //     this.render()
  //   },
  //   addCharacterToUserAccount : function(){
  //       //console.log("run")
  //   }
  // })

  var CharactersView = Backbone.View.extend({
    collection: CharacterCollection,
    el: "#characters",
    intialize: function() {
      this.render();
    },
    render: function() {
      this.$el.html('<table id="chargrid"></table>');
      this.collection.each(function(model) {
        new CharacterView({
          model: model
        });
      });
    },
    events: {
      "click .character": "selectCharacter"
    },
    selectCharacter: function selectCharacter(evt) {
      var characterData = $(evt.currentTarget).data();
      alert("Clicked " + characterData.characterId);
    }
  })

  var CharacterView = Backbone.View.extend({
    tagName: "div",
    className: "characterSelect-view",
    //  _.template($("#template-characterSelect").html()),
    model: Character,
    intialize: function() {
      this.render();
    },
    render: function() {
      var template = _.template(
        '<td class="character" data-character-id="<%-id%>"><%-name%></td>'
      );
      this.$el.html(template({
        id: this.model.id,
        name: this.model.name
      }));
      return this;
      $('#chargrid').append(template);
    }
  })

  var MainAppView = Backbone.View.extend({
    //div in index.jade
    //el: $('#container'),
    el: $('#comicapp'),

    events: {
      "click .addChar": "addCharacterToUserAccount",
      "click #loadSignup": "loadSignup",
      "click #loadLogin": "loadLogin",
      //  "click #loginButton": "loadCharacterSelection",
      "click #loginButton": "loadFightScreen",
      //"click #fightButton": "loadFightScreen"
    },
    //main app view initializes loginView, creates a div, and then loads the view.
    initialize: function() {
      this.setCurrentView(new LoginView())
        // listen to the characterList collection, when a model is added, run this.addCharacter
      this.listenTo(characterList, 'add', this.addCharacter)
    },
    //handles loading the login view and html elements
    loadLogin: function() {
      this.setCurrentView(new LoginView())
    },
    //uses Signup ctor to create SignupView
    loadSignup: function() {
      this.setCurrentView(new SignupView())
    },
    loadCharacterSelection: function(event) {
      event.preventDefault()
      this.setCurrentView(new CharacterView())
      console.log(characterList);
      //console.log("the character selection loaded")
    },
    loadFightScreen: function(event) {
      event.preventDefault()
      this.setCurrentView(new FightView())
    },
    setCurrentView: function(newView) {
      if (this.currentView) this.currentView.remove()
      this.currentView = newView
      this.$el.html(newView.$el)
    }
  })
  var App = new MainAppView();
})
