import { Route, Routes, Link, useLocation, BrowserRouter } from "react-router-dom";
import { Box, Tabs, Tab, Card } from "@mui/material";
import Home from "./Home";
import Cart from "./Cart";
import { Provider } from "react-redux"
import { store } from "./store";

const App = () =>
  <Provider store={store}>
    <BrowserRouter>
      <Box sx={{ height: "100%", backgroundColor: "#f5f5f5", padding: "20px" }}>
        <Card sx={{ maxWidth: "600px", margin: "0 auto" }}>
          <RootTabs />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/cart" element={<Cart />} />
          </Routes>
        </Card>
      </Box>
    </BrowserRouter>
  </Provider>
export default App

const RootTabs = () => {
  const currentTab = useLocation().pathname;

  return <Tabs value={currentTab}>
    <Tab label="Home" value="/" to="/" component={Link} />
    <Tab label="Cart" value="/cart" to="/cart" component={Link} />
  </Tabs>
}