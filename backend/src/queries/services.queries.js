export const GET_ALL_SERVICES = `
    SELECT * FROM services 
    ORDER BY created_at DESC;
`;

export const GET_SERVICES_BY_ID = `
    SELECT * FROM services WHERE id = $1;
`;

export const CREATE_SERVICES = `
    INSERT INTO services (
        service_name,
        price,
        duration
    )
    VALUES ($1, $2, $3)
    RETURNING *;
`;

export const UPDATE_SERVICES = `
    UPDATE services 
    SET
        service_name = COALESCE($1, service_name),
        price        = COALESCE($2, price),
        duration     = COALESCE($3, duration),
        updated_at   = NOW()
    WHERE id = $4
    RETURNING *;
`;

export const DELETE_SERVICES = `
    DELETE FROM services
    WHERE id = $1
    RETURNING *;
`;

/* APPOINTMENTS QUERIES */

export const GET_ALL_APPOINTMENT = `
    SELECT 
        a.*,
        s.service_name
    FROM appointments a
    LEFT JOIN services s ON a.service_id = s.id
    ORDER BY a.created_at DESC;
`;

export const GET_APPOINTMENT_BY_ID = `
    SELECT 
        a.*,
        s.service_name
    FROM appointments a
    LEFT JOIN services s ON a.service_id = s.id
    WHERE a.id = $1;
`;

export const CREATE_APPOINTMENT = `
    INSERT INTO appointments (customer_name, customer_phone, service_id, appointment_date, appointment_time, notes)
    VALUES ($1, $2, $3, $4, $5, $6)
    RETURNING *;
`;

export const UPDATE_APPOINTMENT = `
    UPDATE appointments 
    SET
        customer_name    = COALESCE($1, customer_name), 
        customer_phone   = COALESCE($2, customer_phone),
        service_id       = COALESCE($3, service_id),
        appointment_date = COALESCE($4, appointment_date),
        appointment_time = COALESCE($5, appointment_time),
        notes            = COALESCE($6, notes)
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