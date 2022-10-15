import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import useAxiosPrivate from '../hooks/useAxiosPrivate'
import { useNavigate, useLocation } from "react-router-dom";
import './RecentPacients.css'
const RecentPacients= () => {
  const [recentUsers, setRecentUsers] = useState();
  const axiosPrivate = useAxiosPrivate();
  const navigate = useNavigate();
  


  useEffect(() => {
    let estaMontado = true;
    const controller = new AbortController(); //Para cancelar la request

    const getRecentUsers = async () => {
      try {
        const response = await axiosPrivate.get("/patient/uploadedRecently", {
          signal: controller.signal,
        });

        estaMontado && setRecentUsers(response.data);
      } catch (err) {
        if(err.code === 'ERR_CANCELED')
        console.error(err);
        else{
          console.error(err);
          navigate('/login')
        }
        
      }
    };

    getRecentUsers();

    return () => {
      estaMontado = false;
      controller.abort();
    };
  }, []);


  return (
    <>
      {recentUsers?.length ? (
        <table>
      <thead>
      <tr>
        <th>DNI</th>
        <th>Ultima Modificacion</th>
      </tr>
      </thead>
        {recentUsers.map((recentUser) => (
            <tr key={recentUser.id}>
            <td> {recentUser.dni} </td>
            <td> {recentUser.createdAt} </td>
            </tr>
            ))}
    </table>
            ) : (
        <p>No hay pacientes subidos aún</p>
      )}
      <button onClick={() => navigate('/login')}>Agregar paciente</button>
    </>
  );
};

export default RecentPacients