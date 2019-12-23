import Observer from "./observer.js";
import TodoItem from "./todoItem.js";

export default class Store {
    constructor(redusers) {
        this.redusers= redusers;
        this.state = {
            todo:[],
            userInfo:{
            }
        };
        this.events = new Observer();
        this.completedCount = 0;
      
    }

    setToken(token){
        this.dispatch('login', token); 
    }
    setAuthorized(authorized)
    {
        if(authorized)
        {
            this.dispatch('login', this.state.userInfo.token);
        }
        else{
            this.dispatch('logout', authorized);
        }
    }

    setItems(items){

     let counter = 0;
     this.state.todo = items.map(item=> {
        
        let newItem = 
        new TodoItem(item.text, item.createDate, item.completed, item._id, item.completedAt, counter++);
            
            return  newItem;  
        });

        this.dispatch('setItems');
        
    }
    addItem(item){
        let newItem = 
        new TodoItem(item.text, item.createDate, item.completed, item._id, item.completedAt, this.state.todo.length);

        this.dispatch('addItem' , newItem);
    }
    removeItem(index){
        this.dispatch('removeItem',{index});
                for(let i = index; i<this.state.todo.length; i++)
                {
                    this.state.todo[i].index--;
                }
    }
    updateItem(index, text, completed, completedAt){
        this.state.todo[index].completed=completed;
        this.state.todo[index].text=text;
        this.state.todo[index].completedAt=completedAt;
        this.dispatch('updateItem',this.state.todo[index]);
    }


    dispatch(actionType, payload){
     
        if(this.redusers[actionType]){

        
            this.state = this.redusers[actionType](payload, this.state);

        this.completedCount = 0;
        for(let i= 0; i<this.state.todo.length; i++){
        if(this.state.todo[i].completed){
            this.completedCount++;
        };

            }
            this.events.next('change', this.state);
        }
    }

}