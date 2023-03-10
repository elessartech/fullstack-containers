import patientData from '../data/patients';
import { v1 as uuid } from 'uuid'

import { PatientEntry, NonSensitivePatientEntry, NewPatientEntry, NewEntryToAdd } from '../types'

import { toNewPatientEntry } from '../utils'

const getEntries = (): PatientEntry[] => {
    return patientData;
};

const getNonSensitivePatientEntry = (): NonSensitivePatientEntry[] => {
    return patientData.map(({id, name, dateOfBirth, gender, occupation, entries}) => ({id, name, dateOfBirth, gender, occupation, entries}));
};

const getPatientEntry = (patientId: string): PatientEntry | undefined => {
    return patientData.find(({id}) => (patientId === id));
}

const addPatient = ( entry: NewPatientEntry ): PatientEntry => {
    const id = uuid()
    const newPatientEntry = toNewPatientEntry(id, entry.name, entry.dateOfBirth, entry.ssn, entry.gender, entry.occupation, []);
    patientData.push(newPatientEntry);
    return newPatientEntry;
};

const addEntryForPatient = ( entry: NewEntryToAdd, patient: PatientEntry )  => {
    const id = uuid()
    const newEntry =  {
        id,
        ...entry
    }
    const addedEntryForPatient = {
        ...patient,
        entries: [...patient.entries, newEntry]
    }
    patientData.map((p) => {
        if (p.id === patient.id) {
          p.entries.push(newEntry);
        }
        return p;
    });
    return addedEntryForPatient
}

export default {
  getEntries,
  getNonSensitivePatientEntry,
  addPatient,
  getPatientEntry,
  addEntryForPatient
};