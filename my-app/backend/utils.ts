import { Entry, Gender, PatientEntry } from './types'

export const isString = (text: unknown): text is string => {
    return typeof text === 'string' || text instanceof String;
}

export const isGender = (str: string): str is Gender => {
    return ['male', 'female', 'other'].includes(str);
};

export const parseGender = (gender: unknown): Gender => {
    if (!isString(gender)) {
        throw new Error('Not a string provided: ' + gender)
    }
    if (!gender || !isGender(gender)) {
        throw new Error('Incorrect or missing visibility: ' + gender);
    }
    return gender;
}

export const parseString = (str: unknown): string => {
    if (!isString(str)) {
        throw new Error('Not a string provided: ' + str)
    }
    return str
}

export const toNewPatientEntry = (id: string, name: string, dateOfBirth: string, ssn: string, gender: Gender, occupation: string, entries: Entry[]): PatientEntry => {
    return {
        id: parseString(id),
        name: parseString(name),
        dateOfBirth: parseString(dateOfBirth), 
        ssn: parseString(ssn),
        occupation: parseString(occupation),
        gender: parseGender(gender),
        entries: entries
    }
}