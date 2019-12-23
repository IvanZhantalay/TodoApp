
export default class Requests{
     static async sendLoginReq(login, pass){
        let status;
        let token=
        
        
    await fetch('https://todo-app-back.herokuapp.com/login', {
        method: 'POST',
        body:
          JSON.stringify({
            email: login,
            password: pass,
          }),
        headers: {
          'Content-Type': 'application/json'
        }
      }).then(response =>{
          status=response.status
          return response.json()
        })
      .then(function (data) { 
        if(status==200){
            return data.token;
        }
            else{
                throw data.error; 
            }
            })  
            .catch(function (error) {  
              throw error;  
            });    
        return token;
    }
    
    static async checkAuth(token){
        let status;
        let res=
        await fetch('https://todo-app-back.herokuapp.com/me', {
            method: 'GET',
            headers: {
              'Authorization': `${token}`
            }
          })
          .then(response =>{ 
            status = response.status;
            
            return response.json()
            
          })
          .then(function (data) { 
            if(status== 200){
            return true;
        }
            else{
                return false; 
            }
            })  
            .catch(function (error) {  
              return false;  
            });      
            return res;
    };
    static async addTodo(todoItem, token){
        let status;
        let data =
        await fetch('https://todo-app-back.herokuapp.com/todos', {
        method: 'POST',
        body:
          JSON.stringify({
            text: todoItem.text,
            createDate: todoItem.createDate,
            completed: todoItem.completed,
            
          }),
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `${token}`
        }
      }).then(response =>{
          status=response.status;
          return response.json();
 
      })
      .then(function (data) {  
        if(status!=200){
            throw data.error;
        } 
        return data;

        })  
        .catch(function (error) {  
          throw error;  
        });
        return data;
    }

    static async getTodos(token){
        let data =
        await fetch('https://todo-app-back.herokuapp.com/todos', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `${token}`
              }

    })
    .then(response => response.json())
      .then(function (data) {  
        return data;

        })  
        .catch(function (error) {  
        });
        return data;
    }


    static async removeTodo(id, token){
        let status;
        let res =
        await fetch(`https://todo-app-back.herokuapp.com/todos/${id}`, {
            method: 'DELETE',
            headers: {
              'Content-Type': 'application/json',
              'Authorization': `${token}`
            }
          })
          .then(response =>{ 
            status = response.status;
            
            return response.json()
            
          })
          .then(function (data) { 

            if(status== 200){
            return true;
        }
            else{
                return false; 
            }
            })  
        .catch(function (error) {  
        });
        return res;
    }
  


    static async updateTodo(id, text, completed, time, token){
        let status;
        let res =
        await fetch(`https://todo-app-back.herokuapp.com/todos/${id}`, {
            method: 'PUT',
            body:
            JSON.stringify({
              text: `${text}`,
              completed: `${completed}`,
              completedAt:`${time}`,
            }),
            headers: {
              'Content-Type': 'application/json',
              'Authorization': `${token}`
            }
          })
          .then(response =>{ 
            status = response.status;
            
            return response.json()
            
          })
          .then(function (data) { 

            if(status== 200){
               
            return true;
        }
            else{
                throw data.error;       
            }
            })  
        .catch(function (error) {  
          throw error;  
        });
        return res;
    }




}
