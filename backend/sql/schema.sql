DROP TABLE IF EXISTS services CASCADE;
DROP TABLE IF EXISTS bookings CASCADE;
DROP TABLE IF EXISTS users CASCADE;

CREATE TABLE users (
    id SERIAL PRIMARY KEY,
    name VARCHAR(50) NOT NULL,
    role VARCHAR(20) DEFAULT 'admin' CHECK (role IN ('admin', 'staff')),
    created_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE services (
    id SERIAL PRIMARY KEY,
    service_name VARCHAR(200) NOT NULL,
    price INT NOT NULL CHECK (price > 0),
    duration INT NOT NULL CHECK (duration > 0),
    created_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP
); 

CREATE TABLE appointments (
    id SERIAL PRIMARY KEY,
    customer_name VARCHAR(50) NOT NULL,
    customer_phone VARCHAR(50) NOT NULL,
    service_id INT NOT NULL REFERENCES services(id) ON DELETE CASCADE,
    appointment_date DATE NOT NULL,
    appointment_time TIME NOT NULL,
    notes VARCHAR(200),
    status VARCHAR(20) DEFAULT 'Pending' CHECK (status IN ('Pending', 'Confirmed', 'Completed', 'Cancelled')),
    created_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP
);