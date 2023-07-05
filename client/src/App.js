import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import { Toaster } from "react-hot-toast";
import ProtectedRoute from "./components/ProtectedRoute";
import { useSelector } from "react-redux";
import Loader from "./components/Loader";
import AddEditQuestion from "./pages/AddEditQuestion";
import QuestionDescription from "./pages/QuestionDesc";

function App() {
  const { loading } = useSelector((state) => state.loadersReducer);
  return (
    <div>
      {loading && <Loader />}
      <Toaster position="top-center" reverseOrder={false} />
      <BrowserRouter>
        <Routes>
          <Route
            path="/"
            element={
              <ProtectedRoute>
                <Home />
              </ProtectedRoute>
            }
          />
          <Route
            path="/add-question"
            element={
              <ProtectedRoute>
                <AddEditQuestion />
              </ProtectedRoute>
            }
          />
          <Route
            path="/question/:id"
            element={
              <ProtectedRoute>
                <QuestionDescription />
              </ProtectedRoute>
            }
          />
          <Route
            path="/edit-question/:id"
            element={
              <ProtectedRoute>
                <AddEditQuestion />
              </ProtectedRoute>
            }
          />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
