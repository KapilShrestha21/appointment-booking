export const FIND_USER_BY_NAME = `
    SELECT * FROM users WHERE name = $1;
`;

export const CREATE_USER = `
    INSERT INTO users(name, role)
    VALUES ($1, $2)
    RETURNING *;
`