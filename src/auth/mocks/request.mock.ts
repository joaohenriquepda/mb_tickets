import { AuthRequest } from "../models/AuthRequest";

export const createMockRequest = (data: any = {}): AuthRequest => {
    const req = {
        body: data,
        query: {},
        params: {},
        headers: {},
        get: jest.fn().mockImplementation((header: string) => req.headers[header]),
    } as any;

    return req;
};