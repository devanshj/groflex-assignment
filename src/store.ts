import { configureStore, createSlice, PayloadAction } from "@reduxjs/toolkit"
import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux"


export interface Item {
  id: string,
  title: string,
  isInCart: boolean
}

const itemsSlice = createSlice({
  name: "items",
  initialState: JSON.parse(localStorage.getItem("state") ?? `{ "items": [] }`).items as Item[],
  reducers: {
    addItem: (items, { payload: title }: PayloadAction<Item["title"]>) => {
      items.push({ id: generateId(), title, isInCart: false })
    },
    deleteItem: (items, { payload: id }: PayloadAction<Item["id"]>) => {
      items.splice(items.findIndex(i => i.id === id), 1)
    },
    editItem: (items, { payload: { id, title } }: PayloadAction<{ id: Item["id"], title: Item["title"] }>) => {
      items[items.findIndex(i => i.id === id)].title = title
    },
    addToCart: (items, { payload: id }: PayloadAction<Item["id"]>) => {
      items[items.findIndex(i => i.id === id)].isInCart = true
    },
    removeFromCart: (items, { payload: id }: PayloadAction<Item["id"]>) => {
      items[items.findIndex(i => i.id === id)].isInCart = false
    },
  }
})

export const { addItem, deleteItem, editItem, addToCart, removeFromCart } = itemsSlice.actions

export const store = configureStore({
  reducer: {
    items: itemsSlice.reducer
  }
})

store.subscribe(() => {
  localStorage.setItem("state", JSON.stringify(store.getState()))
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch

export const useAppDispatch: () => AppDispatch = useDispatch
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector

const generateId = () => {
  const characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  let randomString = "";
  for (let i = 0; i < 6; i++) {
    const randomIndex = Math.floor(Math.random() * characters.length);
    randomString += characters.charAt(randomIndex);
  }
  return randomString;
}