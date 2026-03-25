import { RouterProvider } from "react-router";
import { router } from "./routes";
import { ThemeProvider } from "./contexts/ThemeContext";
import { UsernameProvider } from "./contexts/UsernameContext";
import { AuthProvider } from "./contexts/AuthContext";

function App() {
  return (
    <ThemeProvider>
      <AuthProvider>
        <UsernameProvider>
          <RouterProvider router={router} />
        </UsernameProvider>
      </AuthProvider>
    </ThemeProvider>
  );
}

export default App;