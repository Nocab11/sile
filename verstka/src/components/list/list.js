import ko from 'knockout';
import listTemplate from 'text!./list.html';


var Task = function(name) {
    this.name = ko.observable(name);
}

class List {
    constructor(params) {
        let self = this
        self.message = ko.observable('Hello from the list component!');
        self.current_list = ko.observable();
        self.current_card = ko.observable();
        self.card_opened = ko.observable(false);
        self.lists = ko.observableArray([]);
        self.cards = ko.observableArray([]);

        self.filter_by_me = ko.observable(false)

        $.getJSON("data/cards.json").done((data) => {
          // self.cards.push(...data.cards)
          data.cards.forEach((data)=>{
            data.labels = ko.observableArray(self.getCardLabels(data))
            data.members = ko.observableArray(self.getCardMembers(data))
            data.description = ko.observable(data.description)
            // data.card_opened = ko.observable(true)
            self.cards.push(data)
          })
          console.log(this.cards())
        });

        $.getJSON("data/lists.json").done((data) => {
          // self.lists.push(...data.lists)
          data.lists.forEach((data)=>{
            data.creatingCard = ko.observable(false)
            data.newCardName = ko.observable()
            data.cards = self.getListCards(data.id);
            self.lists.push(data)
          })
          console.log(this.lists())
        });

        $(window).on("keyup", function(e){
           if (e.which == 81) { //Q
            self.filter_by_me(true)
            // let new_list = ko.observableArray();
            // self.lists().forEach((i) => {
            //   new_list.push(i)
            //   let new_cards = ko.observableArray();
            //   i.cards().forEach(function(c){

            //   })
            //   if (){

            //   }
            // })
            // console.log("clock")
           }
        }) 
        
        // self.filterCards = ko.computed(()=>{
        //   if (self.filter_by_me()){
        //    self.lists().forEach
        //     return list.cards.filter((i)=>{
        //       return i.members().find((m)=>{ return m.id == 1})
        //     })
        //   }else{
        //     return list.cards
        //   }
        // })

        //callbacks
        self.drop = function (data, model) {
          console.log(data, model)
            // model.source.remove(data);
            // model.target.push(data);
        }
        self.openCard = function(card){
          self.card_opened(true)
          self.current_card(card)
          self.current_list(self.getList(card.list_id))
          console.log("test")
          // card.card_opened(true);
        }

        self.submitCard = function(list, e){
          console.log(e)
          if (e.which == 13) {
              self.createCard(list)
              return false;
          }else{
            console.log($(e.target).val())
            list.newCardName($(e.target).val())
            return true;
          }

        }
        self.createCard = function(list){
          console.log(list.newCardName())

          list.cards.push({
              list_id:list.id,
              name:list.newCardName(),
              members:ko.observableArray(),
              labels:ko.observableArray()
            })
          self.closeNewCard(list)
        }

        self.newCard = function(list){
          list.creatingCard(true)
        }

        self.closeNewCard = function(list){
          console.log(list)
          list.creatingCard(false)
          list.newCardName("")
        }

        //Helpers
        self.getList = function(id){
          return self.lists().find((i) => {return i.id == id })
        }

        self.getListCards = function(list_id){
          var cards = self.cards.filter((i) => {return i.list_id == list_id })
          return ko.observableArray(cards())
        }

        self.getCardLabels = function(card){
          let labels = []
          if (!card.hasOwnProperty("labels")) return []
          card.labels.forEach((i) => {
            labels.push(i.label_id)
          })
          return params.labels().filter((i) => {return labels.indexOf(i.id) != -1})
        }

        self.getCardMembers = function(card){
          let members = []
          if (!card.hasOwnProperty("members")) return []
          card.members.forEach((i) => {
            members.push(i.member_id)
          })
          return params.members().filter((i) => {return members.indexOf(i.id) != -1})
        }

        self.afterMoveCard = function(args){
          console.log(args)
          console.log(args.targetParent()[0].id)
          // args.item.list_id = args.targetParent()[0].list_id
          // args.sourceParent.remove(args.item)
          // args.targetParent.push(args.item)
        }
        self.placeholder = (() =>{
          console.log("here")
        })


    }

    dispose() {
      //destroy cunstructor
    }
}

export default { viewModel: List, template: listTemplate };
