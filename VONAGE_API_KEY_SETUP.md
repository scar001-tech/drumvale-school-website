# 🔑 Vonage API Key Setup - Required for SMS

## ⚠️ IMPORTANT: SMS Will Not Send Without API Key

The SMS system is now configured to send **real SMS messages** to parents. However, you need to add your Vonage API Key for it to work.

---

## 📋 Quick Setup (5 Minutes)

### Step 1: Get Your Vonage API Key

1. **Sign up for Vonage Account**
   - Go to: [https://dashboard.nexmo.com/sign-up](https://dashboard.nexmo.com/sign-up)
   - Create a free account
   - Verify your email

2. **Access Your Dashboard**
   - Log in to: [https://dashboard.nexmo.com/](https://dashboard.nexmo.com/)
   - You'll see your API credentials immediately

3. **Copy Your API Key**
   - Look for "API Key" on the dashboard
   - It looks like: `a1b2c3d4`
   - Copy this key

### Step 2: Add API Key to Your Project

1. **Open the `.env` file** in the `DRUMVALE SITE` folder

2. **Find this line:**
   ```env
   VITE_VONAGE_API_KEY=
   ```

3. **Paste your API key after the `=`:**
   ```env
   VITE_VONAGE_API_KEY=a1b2c3d4
   ```

4. **Save the file**

### Step 3: Restart Your Server

```bash
# Stop the current server (Ctrl+C)
# Then restart:
npm run dev
```

### Step 4: Test It!

1. Go to Parent Portal
2. Submit an application with a **real phone number** (use your own for testing)
3. Check your phone - you should receive an SMS!
4. Check Staff Portal → Database tab → SMS Log to see delivery status

---

## ✅ Verification

### How to Know It's Working

**Before API Key (Demo Mode):**
- Console shows: `📱 SMS (DEMO MODE):`
- No actual SMS sent
- Status in logs: "demo"

**After API Key (Production Mode):**
- Console shows: `[SMS SENT via Vonage]`
- Real SMS sent to phone
- Status in logs: "sent" or "failed"

---

## 🔐 Your Current Configuration

**Already Configured:**
- ✅ API Secret: `C1cC9Rg3vYUGQLjW`
- ✅ From Number: `DRUMVALE`
- ✅ SMS Service: Ready
- ✅ All SMS triggers: Active

**Needs Configuration:**
- ⏳ API Key: **You need to add this**

---

## 📱 SMS Notifications Active

Once you add your API key, SMS will be sent automatically for:

1. ✅ **Application Submitted** - Parent receives confirmation with application ID
2. ✅ **Application Approved** - Parent notified to pay fees
3. ✅ **Application Rejected** - Parent informed with reason
4. ✅ **Payment Received** - Parent confirmed, student can proceed
5. ✅ **Enrollment Complete** - Parent receives admission number

---

## 💰 Vonage Pricing

### Free Trial
- New accounts get **€2 free credit**
- Enough for ~200-300 SMS (depending on destination)
- Perfect for testing

### Pay-As-You-Go Pricing
- **US/Canada:** ~$0.0075 per SMS
- **UK:** ~$0.04 per SMS
- **Kenya:** ~$0.03 per SMS
- **Other countries:** Check [Vonage Pricing](https://www.vonage.com/communications-apis/sms/pricing/)

### Cost Control
- Set up billing alerts in Vonage dashboard
- Monitor usage in Staff Portal SMS logs
- Average school: ~50-100 SMS per month

---

## 🛠️ Troubleshooting

### Issue: SMS Still Not Sending

**Check 1: API Key Added?**
```bash
# Open .env file and verify:
VITE_VONAGE_API_KEY=your_actual_key_here  # Should NOT be empty
```

**Check 2: Server Restarted?**
```bash
# Stop server (Ctrl+C) and restart:
npm run dev
```

**Check 3: Phone Number Format**
- Must include country code
- Example: `+1234567890` (US)
- Example: `+254712345678` (Kenya)
- Example: `+447123456789` (UK)

**Check 4: Vonage Account Balance**
- Log into Vonage dashboard
- Check you have credit
- Add payment method if needed

**Check 5: Browser Console**
- Open browser console (F12)
- Look for error messages
- Should see: `[SMS SENT via Vonage]` not `[SMS DEMO MODE]`

### Issue: SMS Marked as "Failed"

1. **Check phone number is valid**
   - Must be a real, active number
   - Must include country code

2. **Check Vonage account status**
   - Verify account is active
   - Check you have sufficient credit

3. **Check destination country**
   - Some countries may have restrictions
   - Verify Vonage supports that country

4. **View error details**
   - Check browser console for error messages
   - Check Vonage dashboard for delivery reports

---

## 🔒 Security Notes

### Current Setup
- ✅ `.env` file is in `.gitignore` (won't be committed)
- ✅ API credentials protected locally
- ⚠️ Client-side implementation (development only)

### For Production Deployment
When deploying to production, you should:

1. **Move SMS to Backend Server**
   - Create server-side API endpoint
   - Store credentials server-side only
   - Frontend calls your backend, not Vonage directly

2. **Use Environment Variables**
   - Store credentials in server environment
   - Never expose in client-side code
   - Use proper secret management

3. **Add Security Measures**
   - Rate limiting
   - Authentication
   - Input validation
   - Abuse monitoring

---

## 📞 Support

### Vonage Support
- **Dashboard:** [dashboard.nexmo.com](https://dashboard.nexmo.com/)
- **Documentation:** [developer.vonage.com](https://developer.vonage.com/messaging/sms/overview)
- **Support:** [api.support.vonage.com](https://api.support.vonage.com/)

### Common Questions

**Q: Do I need a credit card?**
A: Yes, to add credit after the free trial. But you get €2 free to start.

**Q: Can I test without spending money?**
A: Yes! Use the free €2 credit, or leave API key empty for demo mode.

**Q: What if I run out of credit?**
A: SMS will fail. Add more credit in Vonage dashboard.

**Q: Can I use a different SMS provider?**
A: Yes, but you'll need to modify the code in `src/services/smsService.ts`

---

## ✨ Next Steps

1. ✅ Get Vonage API key (5 minutes)
2. ✅ Add to `.env` file
3. ✅ Restart server
4. ✅ Test with your phone number
5. ✅ Monitor SMS logs in Staff Portal
6. ✅ Start using for real applications!

---

## 📝 Summary

**What You Need:**
- Vonage account (free to create)
- API Key from dashboard
- 5 minutes to set up

**What You Get:**
- Automatic SMS to parents
- Professional communication
- Better parent experience
- Reduced phone calls
- Streamlined admissions

**Cost:**
- Free trial: €2 credit
- After: ~$0.01-0.04 per SMS
- Typical monthly cost: $5-20

---

**Ready to go live? Get your API key now!**

👉 [Sign up for Vonage](https://dashboard.nexmo.com/sign-up)

---

**Last Updated:** May 6, 2026  
**Status:** ⏳ Waiting for API Key  
**Once Added:** ✅ Ready for Production
