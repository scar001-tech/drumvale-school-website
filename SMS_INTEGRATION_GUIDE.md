# Vonage SMS Integration Guide

## Overview

The Drumvale Secondary School website now includes Vonage SMS API integration to send automated notifications to parents throughout the admission process.

## Configuration

### 1. Environment Variables

Create or update the `.env` file in the project root:

```env
# Vonage SMS API Configuration
VITE_VONAGE_API_KEY=your_api_key_here
VITE_VONAGE_API_SECRET=C1cC9Rg3vYUGQLjW
VITE_VONAGE_FROM_NUMBER=DRUMVALE
```

**Important Security Notes:**
- The `.env` file is already added to `.gitignore` to prevent committing secrets
- In production, these credentials should be stored server-side only
- Never expose API keys in client-side code for production use

### 2. Getting Your Vonage API Key

1. Sign up for a Vonage account at [https://dashboard.nexmo.com/sign-up](https://dashboard.nexmo.com/sign-up)
2. Navigate to your dashboard
3. Find your API Key and API Secret under "Getting Started"
4. Add the API Key to your `.env` file as `VITE_VONAGE_API_KEY`
5. The API Secret is already configured: `C1cC9Rg3vYUGQLjW`

## Features

### Automated SMS Notifications

The system automatically sends SMS notifications at key points in the admission workflow:

1. **Application Submitted**
   - Sent when a parent submits an application
   - Includes application ID for tracking
   - Confirms receipt and sets expectations

2. **Application Approved**
   - Sent when staff approves an application
   - Instructs parent to log in and pay fees
   - Provides next steps

3. **Application Rejected**
   - Sent when staff rejects an application
   - Includes rejection reason (if provided)
   - Offers guidance for reapplication

4. **Fees Received**
   - Sent when parent pays school fees
   - Confirms payment amount
   - Instructs student to access Student Portal

5. **Enrollment Complete**
   - Sent when student completes assessment and interview
   - Includes admission number
   - Welcomes student to the school

### Demo Mode

By default, the system runs in **demo mode** which:
- Logs SMS messages to the browser console
- Stores messages in localStorage for tracking
- Does NOT make actual API calls to Vonage
- Allows testing without incurring SMS costs

To enable production mode:
1. Add your Vonage API Key to `.env`
2. The system will automatically detect the key and switch to production mode

## Code Structure

### Files Added/Modified

1. **`src/services/smsService.ts`** (NEW)
   - Core SMS sending functionality
   - Message templates
   - Helper functions for different notification types
   - Demo mode implementation

2. **`src/context/PortalContext.tsx`** (MODIFIED)
   - Updated `sendSMS` function to use Vonage API
   - Replaced Africa's Talking integration with Vonage

3. **`src/components/SmsLogViewer.tsx`** (NEW)
   - React component for viewing SMS logs
   - Shows message status, recipient, content, and timestamp
   - Filterable and sortable

4. **`.env`** (NEW)
   - Environment configuration for API credentials

5. **`.env.example`** (NEW)
   - Template for environment variables

## Usage Examples

### Sending SMS Programmatically

```typescript
import { sendSms, notifyApplicationSubmitted } from '@/services/smsService';

// Basic SMS
await sendSms({
  to: '+1234567890',
  message: 'Hello from Drumvale School!',
  relatedApplicationId: 'APP1234567890'
});

// Using pre-defined templates
await notifyApplicationSubmitted(
  '+1234567890',
  'John Doe',
  'APP1234567890'
);
```

### Viewing SMS Logs

SMS logs are automatically stored and can be viewed in:

1. **Staff Portal** → Database Tab → SMS Log section
2. **Browser Console** (in demo mode)
3. **localStorage** under key `drumvale_sms_logs`

### Custom Message Templates

Edit `src/services/smsService.ts` to customize message templates:

```typescript
export const SMS_TEMPLATES = {
  applicationSubmitted: (studentName: string, applicationId: string) =>
    `Your custom message for ${studentName}...`,
  // ... other templates
};
```

## Phone Number Format

The system automatically formats phone numbers:
- Accepts: `+1234567890`, `1234567890`, `(123) 456-7890`
- Converts to: `+1234567890` (international format)
- Removes all non-numeric characters except `+`

## Testing

### Demo Mode Testing

1. Submit an application through the Parent Portal
2. Check browser console for SMS logs
3. View SMS logs in Staff Portal → Database tab

### Production Testing

1. Add your Vonage API Key to `.env`
2. Use a real phone number (your own for testing)
3. Submit an application
4. Check your phone for the SMS
5. Monitor the Staff Portal SMS logs for delivery status

## Troubleshooting

### SMS Not Sending

1. **Check API Credentials**
   - Verify `VITE_VONAGE_API_KEY` is set correctly
   - Verify `VITE_VONAGE_API_SECRET` matches your account

2. **Check Phone Number Format**
   - Must include country code (e.g., `+1` for US)
   - No spaces or special characters

3. **Check Vonage Account Balance**
   - Log into Vonage dashboard
   - Verify you have sufficient credit

4. **Check Browser Console**
   - Look for error messages
   - Verify API responses

### SMS Marked as "Failed"

- Check Vonage dashboard for error details
- Verify the recipient number is valid
- Ensure the number can receive SMS
- Check if the number is on a blocklist

## API Rate Limits

Vonage has rate limits depending on your account type:
- Free tier: Limited messages per day
- Paid tier: Higher limits based on plan

Monitor your usage in the Vonage dashboard.

## Cost Considerations

- SMS costs vary by destination country
- Check Vonage pricing: [https://www.vonage.com/communications-apis/sms/pricing/](https://www.vonage.com/communications-apis/sms/pricing/)
- Use demo mode for development to avoid costs
- Monitor usage in Vonage dashboard

## Security Best Practices

### Current Implementation (Development)
- API credentials in `.env` file
- Client-side API calls
- Suitable for development/demo only

### Recommended Production Setup

1. **Create a Backend API**
   ```
   Frontend → Your Backend → Vonage API
   ```

2. **Move Credentials Server-Side**
   - Store API key/secret in server environment
   - Never expose in client code

3. **Add Authentication**
   - Verify user identity before sending SMS
   - Rate limit SMS requests per user

4. **Implement Logging**
   - Log all SMS requests server-side
   - Monitor for abuse

5. **Add Validation**
   - Verify phone numbers
   - Sanitize message content
   - Prevent spam

## Support

- **Vonage Documentation**: [https://developer.vonage.com/messaging/sms/overview](https://developer.vonage.com/messaging/sms/overview)
- **Vonage Support**: [https://api.support.vonage.com/](https://api.support.vonage.com/)
- **Project Issues**: Contact your development team

## Future Enhancements

Potential improvements:
- [ ] Server-side SMS sending for production
- [ ] SMS delivery status webhooks
- [ ] Two-way SMS communication
- [ ] SMS templates management UI
- [ ] Bulk SMS sending for announcements
- [ ] SMS scheduling
- [ ] Multi-language support
- [ ] SMS analytics dashboard
