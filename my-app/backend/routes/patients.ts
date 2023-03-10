import express from 'express';

const router = express.Router();

import patientService from '../services/patientService'

router.get('/', (_req, res) => {
  res.json(patientService.getNonSensitivePatientEntry());
});

router.get('/:id', (req, res) => {
  const patientId = req.params.id
  const patient = patientService.getPatientEntry(patientId)
  res.json(patient);
});

router.post('/:id/entry', (req, res) => {
  const patientId = req.params.id
  const patient = patientService.getPatientEntry(patientId)
  if (patient) {
    const newEntry = { ...req.body }
    const addedEntry = patientService.addEntryForPatient(newEntry, patient)
    res.json(addedEntry);
  } else {
    res.sendStatus(404)
  }
});

router.post('/', (req, res) => {
  try {
    const { name, dateOfBirth, ssn, gender, occupation } = req.body;
    const addedEntry = patientService.addPatient({
      name, dateOfBirth, ssn, gender, occupation,
      entries: []
    })
    res.json(addedEntry);
  } catch (error: unknown) {
    let errorMessage = 'Something went wrong.';
    if (error instanceof Error) {
      errorMessage += ' Error: ' + error.message;
    }
    res.status(400).send(errorMessage);
  }
});

export default router;