import { useState } from "react";
import { Box, Button, IconButton, Input, List, ListItem, ListItemSecondaryAction, ListItemText } from "@mui/material"
import { Item, addItem, addToCart, deleteItem, editItem, useAppDispatch, useAppSelector } from "./store"
import { Edit, Delete, Check, Close } from "@mui/icons-material";

const Home = () => {
  const items = useAppSelector(state => state.items)
  const dispatch = useAppDispatch()
  let [editingItemId, setEditingItemId] = useState(undefined as Item["id"] | undefined)
  let [editingItemTitle, setEditingItemTitle] = useState("")
  let [newItemTitle, setNewItemTitle] = useState("")

  return <>
    <List>
      {items.map(item =>
        <ListItem key={item.id}>
          {editingItemId !== item.id
            ? <ListItemText>{item.title}</ListItemText>
            : <Input
                value={editingItemTitle}
                onChange={e => setEditingItemTitle(e.target.value)}
                onKeyDown={e => {
                  if (e.key !== "Enter") return
                  dispatch(editItem({ id: item.id, title: editingItemTitle }))
                  setEditingItemId(undefined)
                }}
                sx={{ width: "calc(100% - 60px)" }}/>
          }
          <ListItemSecondaryAction>
            {editingItemId !== item.id
              ? <>
                  <IconButton onClick={() => {
                    setEditingItemTitle(item.title)
                    setEditingItemId(item.id)
                  }} aria-label="edit">
                    <Edit />
                  </IconButton>
                  <IconButton onClick={() => dispatch(deleteItem(item.id))} aria-label="delete">
                    <Delete />
                  </IconButton>
                  {!item.isInCart
                    ? <Button onClick={() => dispatch(addToCart(item.id))}>Add to Cart</Button>
                    : <Button disabled>Added To Cart</Button>
                  }
                </>
              : <>
                  <IconButton onClick={() => {
                    dispatch(editItem({ id: item.id, title: editingItemTitle }))
                    setEditingItemId(undefined)
                  }}>
                    <Check/>
                  </IconButton>
                  <IconButton onClick={() => setEditingItemId(undefined)}><Close/></IconButton>
                </>
            }
          </ListItemSecondaryAction>
        </ListItem>
      )}
    </List>
    <Box sx={{ display: "flex", padding: "0 20px 20px 20px" }}>
      <Input
        value={newItemTitle}
        onChange={e => setNewItemTitle(e.target.value)}
        onKeyDown={e => {
          if (e.key !== "Enter") return
          dispatch(addItem(newItemTitle))
          setNewItemTitle("")
        }}
        sx={{ flex: "1" }}
        placeholder="Title..." />
      <Box sx={{ width: "10px" }}/>
      <Button
        onClick={() => {
          dispatch(addItem(newItemTitle))
          setNewItemTitle("")
        }}
        variant="contained">
          Add
        </Button>
    </Box>
  </>
}
export default Home