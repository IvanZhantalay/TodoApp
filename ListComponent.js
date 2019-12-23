import Component from "./component.js";
import store from "./store/index.js";
import TodoItem from "./store/todoItem.js";
import CountersComponent from "./countersComponent.js";
import Requests from "./requests.js";

export default class ListComponent extends Component{
    constructor(app){
                
        const template = document.getElementById('list').content.cloneNode(true);
        app.append(template);
        super(
            store,
            document.querySelector('.js-items')
        );
        this.errortext='';
      
        this.checkAuth();
        Requests.getTodos(store.state.userInfo.token).then(data => store.setItems(data));
        
        this.filterType = 0;

        this.counters = new CountersComponent();
        this.counters.render();

            const input = document.querySelector('.c-input-field');
            const submit = document.querySelector('.c-button');
        
            const handleClick = event =>{
                event.preventDefault();

            let value = input.value.trim();

            if(value.length){
                let time = new Date().getTime();
                    const todoItem = new TodoItem(value, time, false, null, time, store.state.todo.length);
                    Requests.addTodo(todoItem, store.state.userInfo.token).then(item=> {
                        this.errortext='';
                        store.addItem(item);
                        let id =store.state.todo[store.state.todo.length-1].id;
                        Requests.updateTodo(id, value, false, time, store.state.userInfo.token).then(res=> {

                            if (res){
                            this.errortext='';
                            store.updateItem(store.state.todo.length-1, value, false, time );
                            
                            }
                });

                        input.value = "";
                    }).catch(error=>{
                         this.errortext = error;
                         this.render();
                    });
                         
                    
                    input.focus();
                
            }
        }

    submit.addEventListener('click', handleClick);

    
    let wrap = document.querySelector('.wrap');
    wrap.querySelectorAll('div').forEach(div =>{
      div.addEventListener('click', (e)=>{
        wrap.querySelectorAll('div').forEach(d =>{
          if(d.id==e.target.id){
          d.setAttribute('class', 'checked')
           this.filterType = e.target.id;
          }
          else{
            d.setAttribute('class', 'unchecked')
          }
        })
        this.render();
       }
      )
    })

}

    render(){
        let filteredStore= store.state.todo
        .filter(todoItem => {
            if(this.filterType==1){
                return todoItem.completed;
            }
            else if(this.filterType==2){
                return !todoItem.completed;
            }
            else{
                return true; 
            }
        })
        .sort((a,b) => {
            return  b.completedAt - a.completedAt ;
        } );

        
        if(filteredStore.length == 0){
            this.anchor.innerHTML = `<div class ="error">${this.errortext}</div>  No todo's`;
            return;
        }
        this.anchor.innerHTML= `
        <div class ="error">${this.errortext}</div>
            <ul>                 
                ${
                    filteredStore
                    .map(todoItem =>`
                        <li>
                       ${todoItem.completed ?
                            `<strike><span id="liText" style="display: inline">${todoItem.text}</span></strike> `
                            :
                            `<span id="liText" style="display: inline">${todoItem.text}</span>`
                        }    
                         <div id= "hidden"><Input><button id="okBtn">OK</button><button id="cancelBtn">Cancel</button></div>
                        <button id="done" type="button">Done</button><button id="remove" type="button">X</button>
                        </li>
                    `).join('')                          
                   
                }
            </ul>
        `;

        this.anchor.querySelectorAll('#remove').forEach((button, index) =>
        {   
            button.addEventListener('click', () =>{ 
                let indexInStore = filteredStore[index].index;
                let id =filteredStore[index].id;
                Requests.removeTodo(id, store.state.userInfo.token).then(res=> {
                    if (res)
                    store.removeItem(indexInStore);
                })
            });
        }
        );

        this.anchor.querySelectorAll('#done').forEach((button, index) =>{
                       
            button.addEventListener('click', () =>{
                let indexInStore = filteredStore[index].index;
                let id =filteredStore[index].id;
                let text = filteredStore[index].text;
                let completedAt = filteredStore[index].completedAt;
                Requests.updateTodo(id, text, true, new Date().getTime(), store.state.userInfo.token).then(res=> {
                    if (res)
                    store.updateItem(indexInStore, text, true, completedAt);
                })
            
        }
        );
    });
        
    this.anchor.querySelectorAll('li').forEach((li) =>
    {
            return li.addEventListener('click', () => {
                li.querySelector('#remove').style.display = "none";
                li.querySelector('#done').style.display = "none";
                li.querySelector('#liText').style.display = "none";
                li.querySelector('#hidden').style.display = "block";
                let liText = li.querySelector('#liText').innerHTML;
                li.querySelector('input').setAttribute("value", liText.trim());
            });
        }
);
    this.anchor.querySelectorAll('#okBtn').forEach((button, index) =>{
            button.addEventListener('click', () =>{
            let indexInStore = filteredStore[index].index;
            let id =filteredStore[index].id;
            let text = button.parentElement.querySelector('input').value
            let completed = filteredStore[index].completed;
            let completedAt = filteredStore[index].completedAt;
            Requests.updateTodo(id, text, completed, new Date().getTime(), store.state.userInfo.token).then(res=> {

                if (res){
                this.errortext='';
                store.updateItem(indexInStore, text, completed, completedAt );
                
                }
    }).catch(error=>{
                         this.errortext = error;
                         this.render();
                    });
})
    });

    this.anchor.querySelectorAll('#cancelBtn').forEach((button) =>{
        button.addEventListener('click', () =>{
            this.render();
        })
    })


this.anchor.querySelectorAll('li').forEach((li) =>
    li.addEventListener('mouseenter', () =>{
        if(li.querySelector('#liText').style.display=="inline"){
        li.querySelector('#remove').style.display="inline";
        li.querySelector('#done').style.display="inline"; 
        }
        
    }
    )
);

this.anchor.querySelectorAll('li').forEach((li) =>
    li.addEventListener('mouseleave', () =>{
        li.querySelector('#remove').style.display="none";
        li.querySelector('#done').style.display="none";

    }
    )
);
  }
 
    checkAuth(){

        Requests.checkAuth(store.state.userInfo.token).then(authorized => {
            
            store.setAuthorized(authorized);
        });
 } 
}