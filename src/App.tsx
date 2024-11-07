import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

import { Outlet } from "react-router-dom";
import Sidebar from "./components/Sidebar";
import Topbar from "./components/Topbar";

const queryClient = new QueryClient();

function App() {
  return (
    <>
      <QueryClientProvider client={queryClient}>
        <div className="">
          <Topbar />
        </div>
        <div className="flex">
          <div className="hidden lg:block">
            <Sidebar />
          </div>
          <Outlet />
        </div>
      </QueryClientProvider>
    </>
  );
}

export default App;
