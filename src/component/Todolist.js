import { List, Checkbox, ListItem, ListItemButton, ListItemIcon, ListItemText, TextField, IconButton } from "@mui/material";
import DeleteIcon from '@mui/icons-material/Delete';
import { useState } from "react";
import {DragDropContext, Droppable, Draggable} from 'react-beautiful-dnd';





function Todolist(){
    const [todos, setTodos] = useState([]);

    function createID(){
        const id = Math.random().toString(36).substr(2, 16);
        return id;
    }

    function addTodo(e){
        if(e.key === 'Enter'){
            const id = createID();
            console.log(id);
            const todo = {id:id, content:e.target.value, active:false}
            let newTodos = [...todos, todo];
            e.target.value = "";
            setTodos(newTodos);
        }
    }

    function delTodo(id){
        let newTodos = [...todos];
        newTodos = newTodos.filter(todo => todo.id !== id);
        setTodos(newTodos);

    }

    function handleOnDragEnd(result){
        if(!result.destination) return;

        const newTodos = Array.from(todos);
        const [tmpTodos] = newTodos.splice(result.source.index, 1);
        newTodos.splice(result.destination.index, 0, tmpTodos);

        setTodos(newTodos);
    }

    return(
        <div className="Todolist">
            <TextField
                sx={{width: '50%'}}
                label="Todo"
                variant="standard"
                onKeyUp={addTodo}
            />
            <DragDropContext onDragEnd={handleOnDragEnd}>
            <Droppable droppableId="todos">
            {(provided) => (
            <List {...provided.droppableProps} ref={provided.innerRef}>
                {todos.map((todo, index) =>{
                    return(
                        <Draggable key={todo.id} draggableId={todo.id} index={index}>
                        {(provided) =>(
                            <ListItem
                            {...provided.draggableProps}
                            {...provided.dragHandleProps}
                            ref={provided.innerRef}
                            divider = {true}
                            secondaryAction={
                                <IconButton 
                                onClick={()=>{delTodo(todo.id)}}>
                                    <DeleteIcon ></DeleteIcon>
                                </IconButton>
                            }
                            >
                            <ListItemButton>
                                <ListItemIcon>
                                    <Checkbox
                                    checked = {todo.active}
                                    />
                                </ListItemIcon>
                                <ListItemText>
                                    {todo.content}
                                </ListItemText>
                            </ListItemButton>
                            </ListItem> 
                        )}

                    </Draggable>)
                })}
                {provided.placeholder}
            </List>
            )}
            </Droppable>
            </DragDropContext>
        </div>
        )
}

export default Todolist;