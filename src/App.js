import React, { useEffect, useState } from "react";
import { fetchApi } from "./fetch/fetch";

function App() {
  const [facilities, setFacilities] = useState([]);
  const [history, setHistory] = useState([]);
  const [texto, setTexto] = useState("Facility");

  const clinicalHistory = async (e) => {
    const resp = await fetchApi(`history/${e.target.id}`, "GET");
    if (resp?.data?.data) setHistory(resp?.data?.data);
  };

  const listFacilities = async () => {
    const resp = await fetchApi("facilities", "GET");
    if (resp) setFacilities(resp?.data?.data);
  };

  const executeQ4 = async () => {
    const resp = await fetchApi("jobs/q4", "GET");
    if (resp) console.log("Q4: ", resp?.data?.data)
  };

  const executeQ5 = async () => {
    const resp = await fetchApi("jobs/q5", "GET");
    if (resp) console.log("Q5: ", resp?.data?.data)
  };

  const executeQ6 = async () => {
    const resp = await fetchApi("jobs/q6", "GET");
    if (resp) console.log("Q6: ", resp?.data?.data)
  };

  useEffect(() => {
    listFacilities();
  }, []);

  return (
    <>
      <div className="container-fluid">
        <div className="row justify-content-center mt-5">
          <div className="col-3 d-flex justify-content-between">
            <div className="col-8 btn-group">
              <button type="button" className="col-12 btn btn-secondary">
                {texto}
              </button>
              <button
                type="button"
                className="btn btn-secondary dropdown-toggle dropdown-toggle-split"
                data-bs-toggle="dropdown"
                aria-expanded="false"
                data-bs-reference="parent"
              >
                <span className="visually-hidden">Toggle Dropdown</span>
              </button>
              <ul className="col-12 dropdown-menu">
                {facilities && facilities.length > 0 ? (
                  facilities.map((pos, index) => {
                    return (
                      <li key={index} className="col-12">
                        <button
                          type="button"
                          id={pos.facility_id}
                          className="col-12 btn"
                          onClick={(e) => {
                            clinicalHistory(e);
                            setTexto(pos?.facility_name);
                          }}
                        >
                          {pos.facility_name}
                        </button>
                      </li>
                    );
                  })
                ) : (
                  <li className="col-12">No hay datos por el momento</li>
                )}
              </ul>
            </div>
            <div className="col-2">
              <button type="button" className="btn btn-success">
                Submit
              </button>
            </div>
          </div>
        </div>
        <div className="row justify-content-center mt-4">
          <div className="col-6 d-flex justify-content-between">
            {history.length > 0 ? (
              history.map((pos, index) => {
                return (
                  <div key={index} className="col-2 border p-3">
                    <h3 className="text-center">{pos?.nurse_id}</h3>
                  </div>
                );
              })
            ) : (
              <h3>No hay datos por el momento, seleccione un Facility</h3>
            )}
          </div>
        </div>
        <div className="row justify-content-center mt-4">
          <div className="col-6 d-flex justify-content-between">
            <button type="button" className="col-3 btn btn-primary" onClick={executeQ4}>Execute Q4 Query</button>
            <button type="button" className="col-3 btn btn-primary" onClick={executeQ5}>Execute Q5 Query</button>
            <button type="button" className="col-3 btn btn-primary" onClick={executeQ6}>Execute Q6 Query</button>
          </div>
        </div>
      </div>
    </>
  );
}

export default App;
