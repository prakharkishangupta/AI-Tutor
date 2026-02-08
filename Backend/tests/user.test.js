import { signup, login } from '../controller/user.js';
import User from '../model/User.js';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

jest.mock('../model/User.js');
jest.mock('bcryptjs');
jest.mock('jsonwebtoken');

describe('User Authentication Tests', () => {
    let mockReq;
    let mockRes;

    beforeEach(() => {
        mockReq = {
            body: {
                userName: 'testUser',
                email: 'test@example.com',
                password: 'Test@123'
            }
        };
        mockRes = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn()
        };
    });

    describe('Signup', () => {
        test('should create new user successfully', async () => {
            const mockUser = {
                _id: 'mockId',
                userName: 'testUser',
                email: 'test@example.com'
            };

            User.findOne.mockResolvedValue(null);
            bcrypt.hash.mockResolvedValue('hashedPassword');
            User.prototype.save = jest.fn().mockResolvedValue(mockUser);

            await signup(mockReq, mockRes);

            expect(mockRes.status).toHaveBeenCalledWith(201);
            expect(mockRes.json).toHaveBeenCalledWith(
                expect.objectContaining({
                    message: 'UserRegisters Successfully'
                })
            );
        });

        test('should return error for existing user', async () => {
            User.findOne.mockResolvedValue({ email: 'test@example.com' });

            await signup(mockReq, mockRes);

            expect(mockRes.status).toHaveBeenCalledWith(400);
            expect(mockRes.json).toHaveBeenCalledWith({
                message: 'User already exists'
            });
        });
    });

    describe('Login', () => {
        test('should login successfully with valid credentials', async () => {
            const mockUser = {
                _id: 'mockId',
                userName: 'testUser',
                email: 'test@example.com',
                password: 'hashedPassword'
            };

            User.findOne.mockResolvedValue(mockUser);
            bcrypt.compare.mockResolvedValue(true);
            jwt.sign.mockReturnValue('mockToken');

            await login(mockReq, mockRes);

            expect(mockRes.status).toHaveBeenCalledWith(200);
            expect(mockRes.json).toHaveBeenCalledWith(
                expect.objectContaining({
                    message: 'Login successful',
                    token: 'mockToken'
                })
            );
        });
    });
});