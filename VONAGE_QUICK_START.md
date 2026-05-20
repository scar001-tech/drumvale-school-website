# Vonage SMS - Quick Start

## 🚀 Get Started in 3 Steps

### Step 1: Get Your API Key
1. Sign up at [Vonage Dashboard](https://dashboard.nexmo.com/sign-up)
2. Copy your API Key from the dashboard
3. Your API Secret is already configured: `C1cC9Rg3vYUGQLjW`

### Step 2: Configure Environment
Edit `.env` file:
```env
VITE_VONAGE_API_KEY=your_api_key_here
VITE_VONAGE_API_SECRET=C1cC9Rg3vYUGQLjW
VITE_VONAGE_FROM_NUMBER=DRUMVALE
```

### Step 3: Test It!
1. Run the development server: `npm run dev`
2. Go to Parent Portal
3. Submit an application with a valid phone number
4. Check browser console for SMS log (demo mode)
5. Add your API key to send real SMS

## 📱 SMS Workflow

```
Parent submits application
    ↓
SMS: "Application received (ID: APP123...)"
    ↓
Staff approves application
    ↓
SMS: "Application APPROVED! Please pay fees..."
    ↓
Parent pays fees
    ↓
SMS: "Payment received. Student can now login..."
    ↓
Student completes assessment & interview
    ↓
SMS: "Congratulations! Enrolled. Admission No: DSS240001"
```

## 🔍 View SMS Logs

**Staff Portal** → **Database Tab** → **SMS Log Section**

## 🧪 Demo Mode vs Production

| Feature | Demo Mode | Production Mode |
|---------|-----------|-----------------|
| API Key Required | ❌ No | ✅ Yes |
| Sends Real SMS | ❌ No | ✅ Yes |
| Console Logging | ✅ Yes | ✅ Yes |
| Cost | 💰 Free | 💰 Per SMS |
| Testing | ✅ Perfect | ⚠️ Use carefully |

**Demo Mode**: No API key configured → logs to console only
**Production Mode**: API key configured → sends real SMS via Vonage

## 📞 Phone Number Format

✅ **Correct:**
- `+1234567890` (with country code)
- `+254712345678` (Kenya)
- `+44123456789` (UK)

❌ **Incorrect:**
- `1234567890` (missing +)
- `(123) 456-7890` (will be auto-cleaned)

## 🛠️ Troubleshooting

**SMS not sending?**
1. Check API key is correct in `.env`
2. Restart dev server after changing `.env`
3. Check phone number has country code (+)
4. Verify Vonage account has credit
5. Check browser console for errors

**Still in demo mode?**
- Make sure `VITE_VONAGE_API_KEY` is set in `.env`
- Restart the dev server (`npm run dev`)

## 💡 Quick Tips

- **Development**: Use demo mode (no API key) to avoid costs
- **Testing**: Use your own phone number first
- **Production**: Set up a backend server for security
- **Monitoring**: Check Staff Portal for SMS delivery status

## 📚 Full Documentation

See `SMS_INTEGRATION_GUIDE.md` for complete details.

## 🔐 Security Warning

⚠️ **Current setup is for development only!**

For production:
1. Move API credentials to backend server
2. Never expose API keys in frontend code
3. Add rate limiting
4. Implement proper authentication

## 💰 Pricing

Check Vonage pricing: [vonage.com/communications-apis/sms/pricing](https://www.vonage.com/communications-apis/sms/pricing/)

Typical costs:
- US/Canada: ~$0.0075 per SMS
- UK: ~$0.04 per SMS
- Other countries: Varies

## 🎯 Next Steps

1. ✅ Install complete - SMS integration ready!
2. 📝 Get Vonage API key (if not already)
3. 🧪 Test in demo mode
4. 🚀 Add API key for production
5. 📊 Monitor SMS logs in Staff Portal

---

**Need Help?** Check the full guide: `SMS_INTEGRATION_GUIDE.md`
