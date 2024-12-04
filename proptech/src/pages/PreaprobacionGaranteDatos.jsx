import { useState } from "react";
import Ilustracion2 from "../assets/Preaprobacion2.png";
import UserNavbar from "../components/UserNavbar";
import IllustrationContainer from "../components/IllustrationContainer";
import FileUploadField from "../components/FileUploadField";
import { useNavigate } from "react-router-dom"; 

function PreaprobacionGaranteDatos() {
  const [files, setFiles] = useState([
    { label: "Recibo de sueldo 1", file: null, isUploaded: false },
    { label: "Recibo de sueldo 2", file: null, isUploaded: false },
    { label: "Recibo de sueldo 3", file: null, isUploaded: false },
  ]);

  const navigate = useNavigate();

  const handleFileChange = (index, file) => {
    const updatedFiles = [...files];
    updatedFiles[index].file = file;
    updatedFiles[index].isUploaded = false;
    setFiles(updatedFiles);
  };

  const handleUpload = (index) => {
    const updatedFiles = [...files];
    updatedFiles[index].isUploaded = true;
    setFiles(updatedFiles);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Lógica de envío de formulario
    navigate("/preaprobacionGaranteServicios");
  };

  return (
    <div className="w-full min-h-screen bg-white">
      <UserNavbar />
      <div className="flex flex-col md:flex-row h-[calc(100vh-72px)]">
        <div className="w-full md:w-1/2 flex justify-center items-center">
          <IllustrationContainer
            src={Ilustracion2}
            alt="Ilustración 2"
            maxWidth="80%"
            maxHeight="80%"
          />
        </div>

        <div className="w-full md:w-1/2 py-8 pr-20 overflow-y-auto">
          <ul className="steps steps-vertical lg:steps-horizontal w-full">
            <li className="step step-primary">Paso 1</li>
            <li className="step step-primary">Paso 2</li>
            <li className="step step-primary">Paso 3</li>
            <li className="step ">Paso 4</li>
            <li className="step">Enviado</li>
          </ul>

          <p className="mb-4">Pasos para completar la información</p>

          <div class="tab-container items-center mb-4">
            <button class="tab">Personal</button>
            <button class="tab active">Garante uno</button>
            <button class="tab">Garante dos</button>
          </div>

          <h2 className="text-2xl font-bold mb-4">Datos personales</h2>
          <p className="mb-4">Se deben cargar:</p>
          <ul className="list-disc pl-6 mb-8">
            <li>Tres recibos de sueldo</li>
            <li>Foto del documento frontal y trasera</li>
            <li>Un servicio a tu nombre</li>
          </ul>
          <h2 className="text-2xl font-bold mb-4">Últimos recibos de sueldo</h2>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-4">
              {files.map((file, index) => (
                <FileUploadField
                  key={index}
                  label={file.label}
                  file={file.file}
                  isUploaded={file.isUploaded}
                  onFileChange={(e) =>
                    handleFileChange(index, e.target.files[0])
                  }
                  onUpload={() => handleUpload(index)}
                />
              ))}
            </div>
            <div className="flex gap-4 mt-auto">
              <button type="submit" className="btn btn-primary flex-grow">
                Siguiente
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default PreaprobacionGaranteDatos;

