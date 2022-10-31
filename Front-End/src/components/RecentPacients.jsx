import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useNavigate, useLocation } from "react-router-dom";
import "./RecentPacients.css";
import DeleteIcon from "@mui/icons-material/Delete";
import { useImages } from "../hooks/useImages";
import PersonOffIcon from '@mui/icons-material/PersonOff';
import DeletePopUp from "./DeletePopUp";
import DeleteWarning from "./pages/HomeTest/images/Warning_alert.svg"

import Navbar from "./Navbar";
const RecentPacients = () => {
  const {
    deletePatient,
    loadRecentPatients,
    patients,
    getUserInfo,
    doctors,
    getImageById,
    images,
    pId
  } = useImages();
  const [active, setActive] = useState(false);
  const navigate = useNavigate();

  const [openModel, setOpenModel] = useState(false)
  const [patientId, setPatientId] = useState("")
  const [selectedRx, setSelected] = useState("");
  const [selectedDni, setDni] = useState(null);

  useEffect(() => {
    loadRecentPatients();
    getUserInfo();
  }, []);

  if (patients.length === -1)

  return (
    <div className="main_container">
      <Navbar active={active} current="Recientes" />
      <div className="primary_container">
        <div
          className="banner"
          onClick={(e) => {
            setActive(!active);
          }}
        >
          {doctors.map((doctor) => (
            <div key={doctor.id}>
              <h1>Bienvenido/a Dr/a. {doctor.apellido}</h1>
              <p>Nuestra mision es ayudarte</p>
            </div>
          ))}
        </div>
        <div className="pacientes_box">
          <h1>Aún no hay pacientes recientes</h1>
          <PersonOffIcon></PersonOffIcon>
          <h3>Aún no hay pacientes registrados, puedes registrarlos <Link to={"/AllPatients"}>aquí</Link></h3>
        </div>
      </div>
    </div>
  );

  return (
    <div className="main_container">
      <Navbar active={active} current="Recientes" />
      <div className="primary_container">
        <div
          className="banner"
          onClick={(e) => {
            setActive(!active);
          }}
        >
          {doctors.map((doctor) => (
            <div key={doctor.id}>
              <h1>Hola Dr/a. {doctor.apellido}</h1>
              <p>Nuestra mision es ayudarte</p>
            </div>
          ))}
        </div>
        <div className="hero_container">
            <div className="hero_elements">
              <div className="hero_recentTable">
                <div className="table-wrapper">
                  <h1>Recientes</h1>
                  <table className="tabla">
                    <thead>
                      <tr>
                        <th>DNI</th>
                        <th>Fecha de creación</th>
                        <th></th>
                      </tr>
                    </thead>
                    {patients.map((patient) => (
                      <tr 
                        key={patient.id} 
                        onClick={() => {
                          setSelected(patient.id);
                          setDni(patient.DNI);
                          getImageById(patient.id)
                        }}
                        onDoubleClick={() => navigate("/AddRadiography/" + selectedRx)}
                      >
                        <td>
                          <a>{patient.DNI}</a>
                        </td>
                        <td>
                          <a>{patient.createdAt} </a>
                        </td>
                        <td>
                        <DeleteIcon
                          onClick={() => {
                            setOpenModel(true);
                            setPatientId(patient.id)
                          }}
                          className="btn_delete"
                        ></DeleteIcon>
                        </td>
                      </tr>
                    ))}
                  </table>
                  <button className="blandBtn" onClick={() => navigate("/AllPatients")}>
                    Ver listado de todos los pacientes
                  </button>
                  {openModel &&
                  <DeletePopUp 
                    setOpenModel={setOpenModel} 
                    patientId= {patientId} 
                    DeleteWarning={DeleteWarning}
                  />} 
                </div>
              </div>
            {images?.length ? (
              <div className="hero_preview_image_wrapper hero_recent_preview">
                <div className="hero_ultima_prediccion">
                {images.map((image) => (
                  <div key={image.id}>
                    <img
                      src={image.ruta}
                      alt="Imagen con tuberculosis"
                      width={250}
                    />
                        <div className="ultima_prediccion_titles">
                          <h2>
                            DNI: <span> {selectedDni} </span>
                          </h2>
                          <h2>
                            Ultima predicción 1:{" "}
                            <span> {image.prediccion_cnn} </span>
                          </h2>
                          <h2>
                            Ultima predicción 2:{" "}
                            <span> {image.prediccion_transformers} </span>
                          </h2>
                          <h2 className="iara_cyan">
                            Promedio: <span> {image.prediccion_promedio} </span>
                          </h2>
                        </div>
                      </div>
                    ))}
                  </div>
                  <button
                    onClick={() => navigate("/AddRadiography/" + selectedRx)}
                    className="blandTransparantBtn"
                  >
                    Ver más
                  </button>
                </div>
              ) : (
                <div className="no_rx_found hero_recent_preview">
                  <h2>Este paciente aún no contiene ningún documento: </h2>
                  <button
                    onClick={() => navigate("/AddRadiography/" + selectedRx)}
                    className="blandTransparantBtn"
                  >
                    Subir una radiografia
                  </button>
                </div>
              )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default RecentPacients;
