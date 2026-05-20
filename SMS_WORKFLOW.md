# 📱 SMS Notification Workflow

## Visual Guide to Automated Parent Notifications

---

## 🔄 Complete Admission Journey with SMS

```
┌─────────────────────────────────────────────────────────────────┐
│                    PARENT PORTAL                                │
└─────────────────────────────────────────────────────────────────┘
                              │
                              ▼
                    ┌─────────────────┐
                    │ Parent submits  │
                    │  application    │
                    └─────────────────┘
                              │
                              ▼
                    ┌─────────────────────────────────────────┐
                    │  📱 SMS #1: Application Submitted       │
                    │  "Dear Parent, your application for     │
                    │   John Doe has been received.           │
                    │   ID: APP1720000000000"                 │
                    └─────────────────────────────────────────┘
                              │
                              ▼
┌─────────────────────────────────────────────────────────────────┐
│                    STAFF PORTAL                                 │
└─────────────────────────────────────────────────────────────────┘
                              │
                    ┌─────────┴─────────┐
                    │                   │
                    ▼                   ▼
          ┌──────────────┐    ┌──────────────┐
          │   APPROVE    │    │   REJECT     │
          └──────────────┘    └──────────────┘
                    │                   │
                    ▼                   ▼
    ┌───────────────────────┐  ┌───────────────────────┐
    │ 📱 SMS #2: APPROVED   │  │ 📱 SMS #2: REJECTED   │
    │ "Great news! John's   │  │ "We regret to inform  │
    │  application APPROVED.│  │  you that John's      │
    │  Please pay fees."    │  │  application was not  │
    └───────────────────────┘  │  successful."         │
                    │           └───────────────────────┘
                    │                   │
                    ▼                   ▼
          ┌──────────────┐         [END]
          │ Parent pays  │
          │    fees      │
          └──────────────┘
                    │
                    ▼
          ┌─────────────────────────────────────────┐
          │  📱 SMS #3: Payment Received            │
          │  "Payment of $13,300 received for       │
          │   John Doe. Student can now access      │
          │   Student Portal."                      │
          └─────────────────────────────────────────┘
                    │
                    ▼
┌─────────────────────────────────────────────────────────────────┐
│                   STUDENT PORTAL                                │
└─────────────────────────────────────────────────────────────────┘
                    │
                    ▼
          ┌──────────────┐
          │   Student    │
          │  completes   │
          │  assessment  │
          │      &       │
          │  interview   │
          └──────────────┘
                    │
                    ▼
          ┌─────────────────────────────────────────┐
          │  📱 SMS #4: Enrollment Complete         │
          │  "Congratulations! John Doe is now      │
          │   enrolled. Admission No: DSS240001"    │
          └─────────────────────────────────────────┘
                    │
                    ▼
                 [END]
              ✅ ENROLLED
```

---

## 📋 SMS Message Details

### SMS #1: Application Submitted
**Trigger:** Parent submits application form  
**Recipient:** Parent's phone number  
**Purpose:** Confirm receipt and provide tracking ID  

**Message Template:**
```
Dear [Parent Name], your application for [Student Name] 
([Grade]) at Drumvale Secondary School has been received. 
Application ID: [APP_ID]. Status: PENDING APPROVAL. 
We will notify you once a decision is made. 
- Drumvale Admissions
```

**Example:**
```
Dear John Smith, your application for Jane Smith 
(Grade 10) at Drumvale Secondary School has been received. 
Application ID: APP1720000000000. Status: PENDING APPROVAL. 
We will notify you once a decision is made. 
- Drumvale Admissions
```

---

### SMS #2A: Application Approved
**Trigger:** Staff approves application  
**Recipient:** Parent's phone number  
**Purpose:** Notify approval and request fee payment  

**Message Template:**
```
Dear [Parent Name], GREAT NEWS! The application for 
[Student Name] ([Grade]) at Drumvale Secondary School 
has been APPROVED. Please log in to the Parent Portal 
to pay fees and proceed with enrollment. 
Application ID: [APP_ID]. 
- Drumvale Admissions
```

**Example:**
```
Dear John Smith, GREAT NEWS! The application for 
Jane Smith (Grade 10) at Drumvale Secondary School 
has been APPROVED. Please log in to the Parent Portal 
to pay fees and proceed with enrollment. 
Application ID: APP1720000000000. 
- Drumvale Admissions
```

---

### SMS #2B: Application Rejected
**Trigger:** Staff rejects application  
**Recipient:** Parent's phone number  
**Purpose:** Notify rejection with reason  

**Message Template:**
```
Dear [Parent Name], we regret to inform you that 
the application for [Student Name] ([Grade]) at 
Drumvale Secondary School has not been successful. 
[Reason]. Please contact admissions@drumvale.edu 
for guidance. Application ID: [APP_ID]. 
- Drumvale Admissions
```

**Example:**
```
Dear John Smith, we regret to inform you that 
the application for Jane Smith (Grade 10) at 
Drumvale Secondary School has not been successful. 
Incomplete documentation. Please contact 
admissions@drumvale.edu for guidance. 
Application ID: APP1720000000000. 
- Drumvale Admissions
```

---

### SMS #3: Payment Received
**Trigger:** Parent pays school fees  
**Recipient:** Parent's phone number  
**Purpose:** Confirm payment and enable student portal access  

**Message Template:**
```
Payment of $[Amount] received for [Student Name]. 
Your child can now access the Student Portal for 
assessment. 
- Drumvale School
```

**Example:**
```
Payment of $13,300 received for Jane Smith. 
Your child can now access the Student Portal for 
assessment. 
- Drumvale School
```

---

### SMS #4: Enrollment Complete
**Trigger:** Student completes assessment and interview  
**Recipient:** Parent's phone number  
**Purpose:** Welcome student and provide admission number  

**Message Template:**
```
Congratulations! [Student Name] is now enrolled at 
Drumvale Secondary School. Admission Number: [ADM_NO]. 
Welcome to our community! 
- Drumvale School
```

**Example:**
```
Congratulations! Jane Smith is now enrolled at 
Drumvale Secondary School. Admission Number: DSS240001. 
Welcome to our community! 
- Drumvale School
```

---

## 🎯 SMS Delivery Status

### Status Types

| Status | Icon | Meaning | Action Required |
|--------|------|---------|-----------------|
| **demo** | 🔵 | Logged to console only | None - testing mode |
| **sent** | ✅ | Successfully delivered | None - success |
| **failed** | ❌ | Delivery failed | Check phone number & Vonage account |

### Viewing Status

**Staff Portal → Database Tab → SMS Log**

Each SMS shows:
- 📱 Recipient phone number
- 📝 Message content
- 🕐 Timestamp
- 🎯 Delivery status
- 🔗 Related application ID

---

## 🔄 SMS Retry Logic

### Current Behavior
- No automatic retries
- Failed SMS logged for manual review
- Staff can see failed messages in SMS Log

### Manual Retry
If SMS fails:
1. Check SMS Log in Staff Portal
2. Verify phone number is correct
3. Check Vonage account status
4. Contact parent via alternative method
5. Update phone number if needed

---

## 📊 SMS Analytics

### Available Metrics

**Staff Portal Dashboard shows:**
- Total SMS sent
- SMS by status (sent/failed/demo)
- SMS per application
- Recent SMS activity

### Monitoring Best Practices

1. **Daily Check**
   - Review SMS Log for failed messages
   - Follow up on failures

2. **Weekly Review**
   - Check total SMS sent
   - Monitor costs in Vonage dashboard
   - Review message templates effectiveness

3. **Monthly Analysis**
   - Total SMS volume
   - Delivery success rate
   - Cost analysis
   - Template optimization

---

## 🛠️ Customizing Messages

### Edit Templates

File: `src/services/smsService.ts`

```typescript
export const SMS_TEMPLATES = {
  applicationSubmitted: (studentName: string, applicationId: string) =>
    `Your custom message here...`,
  
  applicationApproved: (studentName: string, applicationId: string) =>
    `Your custom message here...`,
  
  // ... other templates
};
```

### Best Practices

1. **Keep it concise** - SMS has 160 character limit (longer messages cost more)
2. **Include key info** - Student name, application ID, next steps
3. **Be clear** - Use simple language
4. **Add branding** - End with "- Drumvale School"
5. **Test thoroughly** - Send to yourself first

---

## 🔐 Security & Privacy

### Phone Number Handling
- ✅ Stored securely in localStorage
- ✅ Only visible to authorized staff
- ✅ Not exposed in logs
- ✅ Formatted automatically

### Message Content
- ✅ No sensitive data (passwords, IDs)
- ✅ Professional tone
- ✅ School-appropriate
- ✅ GDPR/privacy compliant

### Access Control
- ✅ Only staff can view SMS logs
- ✅ Parents see only their own messages
- ✅ Students cannot access SMS system

---

## 💡 Tips & Tricks

### For Development
- Use demo mode to avoid costs
- Test with your own phone number
- Check console for SMS logs
- Verify message templates

### For Production
- Add API key to `.env`
- Test with real phone first
- Monitor Vonage dashboard
- Set up billing alerts
- Review SMS logs regularly

### For Staff
- Check SMS Log daily
- Follow up on failed messages
- Verify phone numbers before approval
- Use consistent message tone

---

## 🆘 Common Issues

### Issue: SMS not sending
**Solution:** Check API key in `.env`, restart server

### Issue: Wrong phone number
**Solution:** Update in application, staff can edit

### Issue: Message too long
**Solution:** Edit template in `smsService.ts`

### Issue: High costs
**Solution:** Use demo mode for testing, monitor usage

---

## 📞 Support

**Questions about SMS workflow?**
- See: `SMS_INTEGRATION_GUIDE.md`
- See: `VONAGE_QUICK_START.md`

**Technical issues?**
- Check browser console
- Review SMS logs in Staff Portal
- Contact Vonage support

---

**Last Updated:** May 6, 2026  
**Version:** 1.0  
**Status:** ✅ Active
