import { Box, Button, List, ListItem, ListItemSecondaryAction, ListItemText, Typography } from "@mui/material"
import { removeFromCart, useAppDispatch, useAppSelector } from "./store"

const Cart = () => {
  const items = useAppSelector(state => state.items).filter(item => item.isInCart)
  const dispatch = useAppDispatch()

  return <>
    <List>
      {items.map(item =>
        <ListItem key={item.id}>
          <ListItemText>{item.title}</ListItemText>
          <ListItemSecondaryAction>
            <Button onClick={() => dispatch(removeFromCart(item.id))}>Remove From Cart</Button>
          </ListItemSecondaryAction>
        </ListItem>
      )}
    </List>
    {items.length === 0 && <Typography sx={{ textAlign: "center", padding: "20px" }} variant="body1">Cart is Empty</Typography>}
  </>
}
export default Cart