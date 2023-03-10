import { State } from "./state";
import { DiagnoseEntry, Patient } from "../types";

export type Action =
  | {
      type: "SET_PATIENT_LIST";
      payload: Patient[];
    }
  | {
      type: "ADD_PATIENT";
      payload: Patient;
    }
  | {
      type: "SET_PATIENT_INFO";
      payload: Patient;
    }
  | {
      type: "SET_DIAGNOSES";
      payload: DiagnoseEntry[];
  }


export const reducer = (state: State, action: Action): State => {
  switch (action.type) {
    case "SET_PATIENT_LIST":
      return {
        ...state,
        patients: {
          ...action.payload.reduce(
            (memo, patient) => ({ ...memo, [patient.id]: patient }),
            {}
          ),
          ...state.patients
        }
      };
    case "ADD_PATIENT":
      return {
        ...state,
        patient: {
          ...state.patients,
          [action.payload.id]: action.payload
        }
      };

    case "SET_PATIENT_INFO":
      return {
        ...state,
        patient: {
          data: action.payload
        }
      };

    case "SET_DIAGNOSES":
      return {
        ...state,
        diagnoses: {
          ...action.payload.reduce(
            (memo, diagnose) => ({ ...memo, ...diagnose }),
            {}
          ),
          ...state.diagnoses
        }
      };
    default:
      return state;
  }
};

export const setPatientList = (patients: Patient[]): Action => ({
  type: 'SET_PATIENT_LIST', 
  payload: patients  
}) 

export const setPatientInfo = (patient: Patient): Action => ({
  type: 'SET_PATIENT_INFO', 
  payload: patient  
}) 

export const addPatient = (patient: Patient): Action => ({
  type: 'ADD_PATIENT', 
  payload: patient  
}) 

export const setDiagnoses = (diagnose: DiagnoseEntry[]): Action => ({
  type: 'SET_DIAGNOSES', 
  payload: diagnose  
}) 