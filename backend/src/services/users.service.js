import pool from "../config/db.js"
import { CREATE_USER, FIND_USER_BY_NAME } from "../queries/user.queries.js"
import AppError from "../utils/AppError.js";

export const registerService = async ({ name, role }) => {
    const existingUser = await pool.query(FIND_USER_BY_NAME, [name]);

    if (existingUser.rows.length > 0) {
        throw new AppError('User name already taken', 409);
    }

    const userRole = role && ['admin', 'staff'].includes(role) ? role : 'admin';
    try {

        const { rows } = await pool.query(CREATE_USER, [
            name,
            userRole
        ])

        return rows[0];

    } catch (error) {
        if (error.code === '23505') {
            throw new AppError('User name already taken', 409);
        }

        throw error
    }
}

export const loginService = async ({ name }) => {
    const { rows } = await pool.query(FIND_USER_BY_NAME, [name])
    const user = rows[0];

    if (!user) {
        throw new AppError('User not found', 404);
    }

    return user;
}