import { createBrowserRouter } from "react-router";
import { Landing } from "./pages/Landing";
import { Auth } from "./pages/Auth";
import { GameRoom } from "./pages/GameRoom";
import { Profile } from "./pages/Profile";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Leaderboard from "./pages/Leaderboard";

// Simple error fallback component
function ErrorBoundary() {
  return (
    <div className="min-h-screen bg-background flex items-center justify-center">
      <div className="text-center">
        <h1 className="text-4xl font-bold mb-4">Oops!</h1>
        <p className="text-muted-foreground mb-4">Something went wrong.</p>
        <a href="/" className="text-primary hover:underline">Go back home</a>
      </div>
    </div>
  );
}

export const router = createBrowserRouter([
  {
    path: "/",
    Component: Landing,
    errorElement: <ErrorBoundary />,
  },
  {
    path: "/auth",
    Component: Auth,
    errorElement: <ErrorBoundary />,
  },
  {
    path: "/login",
    Component: Login,
    errorElement: <ErrorBoundary />,
  },
  {
    path: "/signup",
    Component: Signup,
    errorElement: <ErrorBoundary />,
  },
  {
    path: "/room/:roomId",
    Component: GameRoom,
    errorElement: <ErrorBoundary />,
  },
  {
    path: "/room/:roomType/:roomCode",
    Component: GameRoom,
    errorElement: <ErrorBoundary />,
  },
  {
    path: "/profile/:username",
    Component: Profile,
    errorElement: <ErrorBoundary />,
  },
  {
    path: "/leaderboard",
    Component: Leaderboard,
    errorElement: <ErrorBoundary />,
  },
]);