import catchAsync from "../utils/catchAsync.js";
import handleResponse from "../utils/handleResponse.js";
import { registerService, loginService } from "../services/users.service.js";

// register user
export const register = catchAsync(async (req, res) => {
    const user = await registerService(req.body);
    return handleResponse(res, 201, "User registered successfully", user);
});

// login user
export const login = catchAsync(async (req, res) => {
    const user = await loginService(req.body);
    return handleResponse(res, 200, "Login successful", user);
});