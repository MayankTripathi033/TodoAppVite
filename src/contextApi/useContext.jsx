import { useContext, createContext } from "react";


export const Todocontext = createContext({
          todos: [{
                    id: 1,
                    todo: "Dinner",
                    completed: false
          }],
          addtodo: (todo) => {},
          updatedtodo: (id, todo) => {},
          completedtodo: (id) => {},
          deletedtodo: (id) => {},
          copytodo: (todo) => {}
})


export const Usetodo = () => {
         return useContext(Todocontext);
}

export const TodoProvider = Todocontext.Provider
