export const GET_ALL_APPOINTMENT = `
    SELECT *
    FROM appointments
    ORDER BY created_at DESC;
`;


export const GET_APPOINTMENT_BY_ID = `
    SELECT *
    FROM appointments
    WHERE id = $1;
`;


export const CREATE_APPOINTMENT = `
    INSERT INTO appointments (
        customer_name,
        customer_phone,
        service_id,
        appointment_date,
        appointment_time,
        notes
    )
    VALUES ($1, $2, $3, $4, $5, $6)
    RETURNING *;
`;


export const UPDATE_APPOINTMENT = `
    UPDATE appointments
    SET
        customer_name = COALESCE($1, customer_name),
        customer_phone = COALESCE($2, customer_phone),
        service_id = COALESCE($3, service_id),
        appointment_date = COALESCE($4, appointment_date),
        appointment_time = COALESCE($5, appointment_time),
        notes = COALESCE($6, notes)
    WHERE id = $7
    RETURNING *;
`;


export const UPDATE_APPOINTMENT_STATUS = `
    UPDATE appointments
    SET status = $1
    WHERE id = $2
    RETURNING *;
`;


export const DELETE_APPOINTMENT = `
    DELETE FROM appointments
    WHERE id = $1
    RETURNING *;
`;