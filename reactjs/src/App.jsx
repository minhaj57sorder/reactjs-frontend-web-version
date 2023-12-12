import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import InitPrompt from "./components/InitPrompt.jsx";
import { AllContextProviders } from "./contextapi/AllContextProviders";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
function App() {
  const [count, setCount] = useState(0);

  return (
    <div className="overflow-x-hidden max-h-max">
      <AllContextProviders>
        <InitPrompt />
        <ToastContainer />
      </AllContextProviders>
    </div>
  );
}

export default App;
