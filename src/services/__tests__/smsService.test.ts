// ─────────────────────────────────────────────────────────────────────────────
// SMS Service Tests
// ─────────────────────────────────────────────────────────────────────────────

import { describe, it, expect, beforeEach } from 'vitest';
import { sendSms, getSmsLogs, SMS_TEMPLATES } from '../smsService';

describe('SMS Service', () => {
    beforeEach(() => {
        // Clear localStorage before each test
        localStorage.clear();
    });

    describe('sendSms', () => {
        it('should send SMS in demo mode and return success', async () => {
            const result = await sendSms({
                to: '(.number)',
                message: 'Test message',
                relatedApplicationId: 'APP123',
            });

            expect(result.success).toBe(true);
            expect(result.log.to).toBe('+1234567890');
            expect(result.log.message).toBe('Test message');
            expect(result.log.status).toBe('demo');
            expect(result.log.relatedApplicationId).toBe('APP123');
        });

        it('should store SMS log in localStorage', async () => {
            await sendSms({
                to: '+1234567890',
                message: 'Test message',
            });

            const logs = getSmsLogs();
            expect(logs).toHaveLength(1);
            expect(logs[0].to).toBe('+1234567890');
            expect(logs[0].message).toBe('Test message');
        });

        it('should handle phone numbers without + prefix', async () => {
            const result = await sendSms({
                to: '1234567890',
                message: 'Test',
            });

            expect(result.success).toBe(true);
            expect(result.log.to).toBe('1234567890');
        });
    });

    describe('getSmsLogs', () => {
        it('should return empty array when no logs exist', () => {
            const logs = getSmsLogs();
            expect(logs).toEqual([]);
        });

        it('should return all logs sorted by date (newest first)', async () => {
            await sendSms({ to: '+1111111111', message: 'First' });
            await new Promise(resolve => setTimeout(resolve, 10)); // Small delay
            await sendSms({ to: '+2222222222', message: 'Second' });

            const logs = getSmsLogs();
            expect(logs).toHaveLength(2);
            expect(logs[0].message).toBe('Second'); // Newest first
            expect(logs[1].message).toBe('First');
        });
    });

    describe('SMS Templates', () => {
        it('should generate application submitted message', () => {
            const message = SMS_TEMPLATES.applicationSubmitted('John Doe', 'APP123');
            expect(message).toContain('John Doe');
            expect(message).toContain('APP123');
            expect(message).toContain('received');
        });

        it('should generate application approved message', () => {
            const message = SMS_TEMPLATES.applicationApproved('Jane Smith', 'APP456');
            expect(message).toContain('Jane Smith');
            expect(message).toContain('APP456');
            expect(message).toContain('APPROVED');
        });

        it('should generate application rejected message', () => {
            const message = SMS_TEMPLATES.applicationRejected('Bob Johnson', 'Incomplete documents');
            expect(message).toContain('Bob Johnson');
            expect(message).toContain('Incomplete documents');
        });

        it('should generate fees received message', () => {
            const message = SMS_TEMPLATES.feesReceived('Alice Brown', 13300);
            expect(message).toContain('Alice Brown');
            expect(message).toContain('13,300');
        });

        it('should generate enrollment complete message', () => {
            const message = SMS_TEMPLATES.enrollmentComplete('Charlie Davis', 'DSS240001');
            expect(message).toContain('Charlie Davis');
            expect(message).toContain('DSS240001');
            expect(message).toContain('enrolled');
        });
    });
});
