import { QueryClient, QueryClientProvider } from "react-query";
import "./App.css";

import Todos from "./Todos";
import Diabetes from "./Diabetes";

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <div className="App">
        <Todos />
        <Diabetes />
      </div>
    </QueryClientProvider>
  );
}

export default App;
