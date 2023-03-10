import React from 'react'
import { Box, Button, List, ListItem, Typography } from "@material-ui/core";
import axios from "axios";
import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { apiBaseUrl } from "../constants";
import { setDiagnoses, setPatientInfo, useStateValue } from "../state";
import { DiagnoseEntry, Entry, Patient } from "../types";
import EntryDetails from './EntryDetails'
import AddEntryFormModal from "../AddEntryPointModal";
import { EntryFormValues } from '../AddEntryPointModal/AddEntryForm';


const PatientInfoPage = () => {
    const { id } = useParams<{ id: string }>();
    const [{ patient, diagnoses }, dispatch] = useStateValue();
    const [modalOpen, setModalOpen] = React.useState<boolean>(false);
    const [error, setError] = React.useState<string>();
  
    const openModal = (): void => setModalOpen(true);
  
    const closeModal = (): void => {
      setModalOpen(false);
      setError(undefined);
    };

    useEffect(() => {
        if (id) {
            const fetchPatientInfo = async () => {
                try {
                  const { data: patientInfoFromApi } = await axios.get<Patient>(
                    `${apiBaseUrl}/patients/${id}`
                  );
                  dispatch(setPatientInfo(patientInfoFromApi));
                } catch (e) {
                  console.error(e);
                }
              };
              void fetchPatientInfo();
        }
    }, [id])
    useEffect(() => {
        if (patient && Object.keys(patient).length > 0) {
            const fetchDiagnoses = async () => {
                try {
                    const { data: diagnosesDataFromApi } = await axios.get<DiagnoseEntry>(
                    `${apiBaseUrl}/diagnoses`
                    );
                    dispatch(setDiagnoses([diagnosesDataFromApi]));
                } catch (e) {
                    console.error(e);
                }
            };
            void fetchDiagnoses();
        }
    }, [patient])

    const addNewEntryForPatient = async (values: EntryFormValues) => {
        try {
          const { data: updatedPatient } = await axios.post<Patient>(
            `${apiBaseUrl}/patients/${id}/entry`,
            values
          );
          dispatch(setPatientInfo(updatedPatient));
          closeModal();
        } catch (e: unknown) {
          if (axios.isAxiosError(e)) {
            console.error(e?.response?.data || "Unrecognized axios error");
            setError(String(e?.response?.data?.error) || "Unrecognized axios error");
          } else {
            console.error("Unknown error", e);
            setError("Unknown error");
          }
        }
    };

    if (!patient || Object.keys(patient).length === 0 || !diagnoses || Object.keys(diagnoses).length === 0) return null
    return (
        <div className="PatientInfo">
            <Box marginTop={'2em'}>
                <Typography align="left" variant="h5" style={{ fontWeight: 700 }}>
                    {`${patient["data"].name} ${patient["data"].gender === "male" ? `♂` :  patient["data"].gender === "female" ? `♀` : `⚥`}`}
                </Typography>
                <Typography align="left" style={{ marginTop: "1em" }}>
                    {`ssn: ${patient["data"].ssn}`}
                </Typography>
                <Typography align="left">
                    {`occupation: ${patient["data"].occupation}`}
                </Typography>
            </Box>
            <Box marginTop={'2em'}>
                <Typography variant="h4">{'entries'}</Typography>
                <Typography align="left" style={{ marginTop: "1em" }}>
                    {patient["data"].entries.map(entry => {
                        return (
                            <EntryDetails entry={entry} /> 
                        )
                    })}
                </Typography>
            </Box>
            <Box marginTop={'2em'}>
                <AddEntryFormModal 
                    modalOpen={modalOpen}
                    onSubmit={addNewEntryForPatient}
                    error={error}
                    onClose={closeModal}
                />
                <Button variant="contained" onClick={() => openModal()}>
                    Add New Entry
                </Button>
            </Box>
        </div>
    );
};

export default PatientInfoPage;

