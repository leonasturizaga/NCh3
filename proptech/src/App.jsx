import { Routes,Route } from "react-router-dom"
import Home from "./pages/Home"
import Contacto from "./pages/Contacto"
import MortgageCalculator from "./components/MortgageCalculator"
import EnhancedMortgageCalculator from "./components/EnhancedMortgageCalculator"
import PaymentAdminMortgageCalculator from "./components/PaymentAdminMortgageCalculator"
import Cuil from "./components/Cuil"
import Cuil2 from "./components/Cuil2"
import Login from "./pages/Login";
import Register from "./pages/Register";
import ErrorPage from "./pages/ErrorPage"
import DeudasTable from "./components/DeudasTable"
import InvestorReturnCalculator from "./components/InvestorReturnCalculator"
import ComoSolicitarTuCredito from "./components/ComoSolicitarTuCredito"
import TieneDeudas from "./components/TieneDeudas"
import ControlPanel from "./pages/ControlPanel"

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home/>}/>
      <Route path="/contacto" element={<Contacto/>}/>
      <Route path="/calculator" element={<MortgageCalculator/>}/>
      <Route path="/adelantoCapital" element={<EnhancedMortgageCalculator/>}/>
      <Route path="/pagos" element={<PaymentAdminMortgageCalculator/>}/>
      <Route path="/inversion" element={<InvestorReturnCalculator/>}/>
      <Route path="/cuil" element={<Cuil/>}/>
      <Route path="/cuil2" element={<Cuil2/>}/>
      <Route path="/deudas" element={<DeudasTable/>}/>
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/solicitar" element={<ComoSolicitarTuCredito/>} />
      <Route path="/tieneDeudas" element={<TieneDeudas/>} />
      <Route path="/controlpanel" element={<ControlPanel />} />
      <Route path="*" element={<ErrorPage />} />
    </Routes>
  );
}

export default App;
