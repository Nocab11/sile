import ko from 'knockout';
import templateMarkup from 'text!./members.html';

class Members {
    constructor(params) {
       let self = this;
        this.message = ko.observable('Hello from the members component!');
        this.active_members = params.current_members
        this.members = window.home_model.members
        this.visible = params.visible
        this.inactive_members = findMembersByIds(difference(getIds(this.members()), getIds(this.active_members())))

        //Callbacks
        this.close = (() => {
          this.visible(false);
        })
        this.toggleMember = ((member) => {
          console.log(member)
          let temp_member = this.active_members().find((m) => {
            return m.id == member.id
          })
          console.log(this.inactive_members())
          if (temp_member != undefined){
            this.active_members.remove(member)
            this.inactive_members.push(member)
          }else{
            this.active_members.push(member)
            this.inactive_members.remove(member)
          }
          console.log("test")
        })
        //Helpers
        function getIds(items){
          let temp = []
          items.forEach((i) => {
            if (i.hasOwnProperty("id")){
              temp.push(i.id)
            }
            if (i.hasOwnProperty("member_id")){
              temp.push(i.member_id)
            }
          })
          return temp;
        }

        function difference(A,B){
            var M=A.length, N=B.length, C=[];
            for (var i=0; i<M; i++)
             { var j=0, k=0;
               while (B[j]!==A[i] && j<N) j++;
               while (C[k]!==A[i] && k<C.length) k++;
               if (j==N && k==C.length) C[C.length]=A[i];
             }
           return C;
        }

        function findMembersByIds(ids){
          let members = self.members.filter((m) => {
            return ids.indexOf(m.id) != -1
          })
          return ko.observableArray(members())
        }
    }

    dispose() {
        // This runs when the component is torn down. Put here any logic necessary to clean up,
        // for example cancelling setTimeouts or disposing Knockout subscriptions/computeds.
    }
}

export default { viewModel: Members, template: templateMarkup };
