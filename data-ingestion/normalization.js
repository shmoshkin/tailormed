
const normalizePatient = (row) => {
    return {
        id: row.PatientID,
        mrn: row.MRN,
        dob: row.PatientDOB,
        decease_status: row.IsDeceased,
        last_name: row.LastName,
        first_name: row.FirstName,
        gender: row.Gender,
        sex: row.Sex,
        address: row.Address,
        city: row.City,
        state: row.State,
        zip_code: row.ZipCode,
        last_modified_date: row.LastModifiedDate
    }
}

const normalizeTreatment = (row) => {
    return {
        id: row.TreatmentID,
        treatment_line: row.TreatmentLine,
        active: row.Active,
        cycles_x_days: row.CyclesXDays,
        diagnoses: row.Diagnoses,
        display_name: row.DisplayName,
        end_date: row.EndDate === '' ? null: row.end_date,
        patient_id: row.PatientID,
        start_date: row.StartDate,       
    }
}

const sourceToFunc = {
    shiba: {
        patients: normalizePatient,
        treatments: normalizeTreatment
    },
    kaplan: {
        patients: normalizePatient,
        treatments: normalizeTreatment
    },
    hadasa: {
        patients: normalizePatient,
        treatments: normalizeTreatment
    }
}

module.exports = {
    sourceToFunc
}