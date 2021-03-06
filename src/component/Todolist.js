import { List, Checkbox, ListItem, ListItemButton, ListItemIcon, ListItemText, TextField, IconButton, Box, Snackbar, Alert } from "@mui/material";
import DeleteIcon from '@mui/icons-material/Delete';
import { useEffect, useState } from "react";
import {DragDropContext, Droppable, Draggable} from 'react-beautiful-dnd';





function Todolist(){

    var saved_todos = JSON.parse(localStorage.getItem('todos'));
    if(saved_todos == null){
        saved_todos = new Array();
    }
    const [todos, setTodos] = useState(saved_todos);
    useEffect( () => {localStorage.setItem('todos', JSON.stringify(todos));})

    const [open, setOpen] = useState(false);

    function createID(){
        const id = Math.random().toString(36).substr(2, 16);
        return id;
    }

    function addTodo(e){
        if(e.key === 'Enter'){
            const id = createID();
            const todo = {id:id, content:e.target.value, active:false}
            let newTodos = [...todos, todo];
            e.target.value = "";
            setTodos(newTodos);
            setOpen(true);
        }
    }

    function delTodo(id){
        let newTodos = [...todos];
        newTodos = newTodos.filter(todo => todo.id !== id);
        setTodos(newTodos);

    }

    function checkTodo(id){

        let newTodos = [...todos];
        const i = newTodos.findIndex(t => t.id == id);
        newTodos[i].active = !newTodos[i].active;

        setTodos(newTodos);

    }

    function handleOnDragEnd(result){
        if(!result.destination) return;

        const newTodos = Array.from(todos);
        const [tmpTodos] = newTodos.splice(result.source.index, 1);
        newTodos.splice(result.destination.index, 0, tmpTodos);

        setTodos(newTodos);
    }

    const handleClose = (event, reason) => {
        if (reason === 'clickaway') {
          return;
        }
    
        setOpen(false);
      };





    return(
        <Box sx={{mx : "auto", width: '70%'}}>
            <TextField
                sx={{ml: "25%", mt: 2, width: '50%'}}
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
                                <ListItemIcon onClick={()=> {checkTodo(todo.id)}}>
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
            <Snackbar open={open} autoHideDuration={1000} onClose={handleClose} anchorOrigin={{ vertical:"bottom", horizontal:"center" }}>
                <Alert variant="filled" onClose={handleClose} severity="success" sx={{ width: '100%' }}>
                Add success
                </Alert>
            </Snackbar>
        </Box>
        )
}

export default Todolist;