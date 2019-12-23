export default function createReducers(){
    return{
        setItems: (payload, state) => ({
            ...state,
            todo: [
                ...state.todo
            ]
        }),

        addItem: (payload, state) => ({
            ...state,
            todo: [ ...state.todo, payload   ],
        }),
        removeItem: (payload, state) => ({
            
            ...state,
            todo: [
                ...state.todo.slice(0, payload.index),
                ...state.todo.slice(payload.index+1, state.todo.length),
            ]
        }),
        updateItem: (payload, state) => ({
            ...state,
            todo: [
                ...state.todo
            ]
        }),
       
        login: (payload, state) => ({
            ...state,
            userInfo: {
                //...state.userInfo,
                token:payload,
                authorized: true,
               
            }
        }),
        logout: (payload, state) => ({
            ...state,
            userInfo: { 
                authorized: false,
            }
        })      
    };
}