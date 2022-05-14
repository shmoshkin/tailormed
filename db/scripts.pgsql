CREATE TABLE IF NOT EXISTS patients (
   id integer PRIMARY KEY,
   mrn text ,
   dob text ,
   decease_status text,
   last_name text,
   first_name text,
   gender text,
   sex text,
   address text,
   city text,
   state text,
   zip_code text,
   last_modified_date TIMESTAMP
);

SELECT * FROM patients;
DELETE FROM patients;
DROP TABLE patients;


    
CREATE TABLE IF NOT EXISTS treatments (
   id integer,
   treatment_line text ,
   active text ,
   cycles_x_days text,
   diagnoses text,
   display_name text,
   patient_id integer NOT NULL,
   start_date TIMESTAMP,
   end_date TIMESTAMP,
   primary key(patient_id, start_date, display_name),
   CONSTRAINT fk_patient FOREIGN KEY(patient_id) REFERENCES patients(id)
);

SELECT * FROM treatments;
DELETE FROM treatments;

DELETE  
FROM treatments
WHERE id = 123123

DROP TABLE treatments;