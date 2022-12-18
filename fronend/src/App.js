import { Routes, Route } from "react-router-dom";
import Layout from "./MyComponents/Layout";
import { Public } from "./MyComponents/Public";
import { Login } from "./features/auth/Login";
import { DashLayout } from "./MyComponents/DashLayout";
import { Welcome } from "./features/auth/Welcome";
import  NotesList  from "./features/notes/NotesList";
import { UserList } from "./features/users/UserList";
function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Public />} />
          <Route path="login" element={<Login />} />

          <Route path="dash" element={<DashLayout />}>
            <Route index element={<Welcome />} />
            <Route path="notes">
              <Route index element={<NotesList />} />
            </Route>
            <Route path="users">
              <Route index element={<UserList />} />
            </Route>
          </Route>
        </Route>
      </Routes>
    </div>
  );
}

export default App;
