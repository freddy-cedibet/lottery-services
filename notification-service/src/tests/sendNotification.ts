
import NotificationQueue from '../services/NotificationQueue';
import {sendNotification} from "../controllers/NotificationController";

// Mocking NotificationQueue
jest.mock('../services/NotificationQueue');

// Mock Express request, response, and next function
const mockRequest = (body: any) => ({ body });
const mockResponse = () => {
    const res: any = {};
    res.respond = jest.fn().mockReturnValue(res);
    return res;
};
const mockNext = jest.fn();

describe('sendNotification', () => {
    beforeEach(() => {
        jest.clearAllMocks();
    });

    // Test cases will be added here

    it('should enqueue SMS notification successfully', async () => {
        const req = mockRequest({
            title: 'Test SMS',
            body: 'SMS Body',
            id: '12345',
            priority: 'high',
            recipient: '1234567890',
            type: 'sms'
        });
        const res = mockResponse();

        //@ts-ignore
        await sendNotification(req, res, mockNext);

        expect(NotificationQueue.prototype.enqueue).toHaveBeenCalledWith(
            expect.objectContaining({ type: 'SMS', recipient: '1234567890' })
        );
        expect(res.respond).toHaveBeenCalledWith(expect.anything());
        expect(mockNext).not.toHaveBeenCalled();
    });

    it('should handle missing fields', async () => {
        const req = mockRequest({ title: 'Only Title' }); // Missing other fields
        const res = mockResponse();

        await sendNotification(req, res, mockNext);

        // Assuming your error handling calls next with an error
        expect(mockNext).toHaveBeenCalledWith(expect.any(Error));
    });


    it('should handle errors during notification queuing', async () => {
        const req = mockRequest({
            title: 'Error Case',
            body: 'This will cause an error',
            id: 'error123',
            priority: 'high',
            recipient: 'errorcase@example.com',
            type: 'email'
        });
        const res = mockResponse();

        // Mocking an error during enqueue
        // NotificationQueue.prototype.enqueue.mockImplementationOnce(() => Promise.reject(new Error('Queueing error')));

        // Mock the entire NotificationQueue module
        jest.mock('../services/NotificationQueue', () => {
            return {
                // You can mock more methods or properties if needed
                default: jest.fn().mockImplementation(() => ({
                    enqueue: jest.fn().mockImplementationOnce(() => Promise.resolve())
                }))
            };
        });


        await sendNotification(req, res, mockNext);

        expect(mockNext).toHaveBeenCalledWith(expect.any(Error));
    });


});
