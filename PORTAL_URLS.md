# Portal URLs Reference

## ✅ Correct Portal URLs

### Main Site
- **Home:** `http://localhost:8080/`
- **Admissions:** `http://localhost:8080/admissions`

### Portals (Access from Admissions Page)

1. **Parent Portal**
   - URL: `http://localhost:8080/portal/parents`
   - Purpose: Submit applications, track status, pay fees
   - Users: Parents and guardians

2. **Student Portal**
   - URL: `http://localhost:8080/portal/students`
   - Purpose: Complete assessment and interview
   - Users: Prospective students

3. **Staff Portal**
   - URL: `http://localhost:8080/portal/staff`
   - Purpose: Review applications, manage admissions
   - Users: School staff and administrators

## 🔗 Navigation

### From Admissions Page
- Click "Go to Parent Portal" → `/portal/parents`
- Click "Go to Student Portal" → `/portal/students`

### From Header (Top Bar)
- Click "Staff Portal" → `/portal/staff`

## 📱 Testing the Complete Flow

1. **Start at Admissions**
   ```
   http://localhost:8080/admissions
   ```

2. **Parent Applies**
   - Click "Go to Parent Portal"
   - Submit application with phone number
   - Check console for SMS #1 (demo mode)

3. **Staff Reviews**
   - Go to `http://localhost:8080/portal/staff`
   - Login with demo credentials
   - Approve application
   - Check console for SMS #2

4. **Parent Pays**
   - Return to Parent Portal
   - Track application status
   - Pay fees
   - Check console for SMS #3

5. **Student Completes**
   - Click "Go to Student Portal"
   - Enter application ID
   - Complete assessment
   - Complete interview
   - Check console for SMS #4 (enrollment)

## ✅ All Routes Working

The portal links are now correctly configured and accessible!
