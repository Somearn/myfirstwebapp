# PowerApps Problem Call Screen - Quick Reference

## Quick Setup Checklist

### Prerequisites (5 minutes)
- [ ] PowerApps license active
- [ ] Access to ISProblemcalls@brownhealth.org shared mailbox
- [ ] "Send As" permission granted
- [ ] Office 365 Outlook connector added to PowerApps
- [ ] Microsoft Teams connector added to PowerApps

### Build Steps (30 minutes)
1. **Create Canvas App** → Tablet format → Name: "Problem Call Manager"
2. **Add Required Controls**:
   - Header label
   - To field (text input, multiline, required)
   - Subject field (text input)
   - Date picker + Time dropdown
   - Duration dropdown
   - Meeting notes (text input, multiline)
   - Copy notes button
   - Send invite button
   - Reconvene button
3. **Configure Send Button** → Use SendEmailV2 formula (see below)
4. **Test** → Send test invite
5. **Publish & Share**

---

## Essential Formulas

### Send Button OnSelect (Simplified)
```powerquery
If(
    IsBlank(txtToRecipients.Text),
    Notify("Please enter recipient email(s)", NotificationType.Error),
    
    Office365Outlook.SendEmailV2(
        txtToRecipients.Text,
        txtSubject.Text,
        "<html><body>" &
        "<h2>Problem Call - Teams Meeting</h2>" &
        "<p><strong>Date/Time:</strong> " & Text(dateMeetingDate.SelectedDate, "mmmm dd, yyyy") & 
        " at " & ddMeetingTime.Selected.Value & "</p>" &
        "<p><strong>Notes:</strong><br>" & txtMeetingNotes.Text & "</p>" &
        "</body></html>",
        {
            From: "ISProblemcalls@brownhealth.org",
            IsHtml: true,
            Importance: "High"
        }
    );
    
    Set(varLastInvite, {
        To: txtToRecipients.Text,
        Subject: txtSubject.Text,
        Notes: txtMeetingNotes.Text,
        Date: dateMeetingDate.SelectedDate,
        Time: ddMeetingTime.Selected.Value
    });
    
    Notify("Invite sent!", NotificationType.Success)
)
```

### Copy Notes Button OnSelect
```powerquery
Copy(txtMeetingNotes.Text);
Notify("Notes copied!", NotificationType.Success)
```

### Reconvene Button OnSelect
```powerquery
Set(txtToRecipients.Text, varLastInvite.To);
Set(txtSubject.Text, "RECONVENED: " & varLastInvite.Subject);
Set(txtMeetingNotes.Text, varLastInvite.Notes & Char(10) & 
    "--- Reconvened from " & Text(varLastInvite.Date, "mm/dd/yyyy") & " ---");
Notify("Ready to reconvene - select new date/time", NotificationType.Information)
```

---

## Control Properties Quick Reference

### txtToRecipients (To Field)
```
Name: txtToRecipients
HintText: "Enter email addresses (separate multiple with semicolons)"
Mode: MultiLine
Height: 100
Required: true
```

### dateMeetingDate (Date Picker)
```
Name: dateMeetingDate
DefaultDate: Today()
Format: ShortDate
```

### ddMeetingTime (Time Dropdown)
```
Name: ddMeetingTime
Items: ["8:00 AM", "9:00 AM", "10:00 AM", "11:00 AM", "12:00 PM", 
        "1:00 PM", "2:00 PM", "3:00 PM", "4:00 PM", "5:00 PM"]
Default: "10:00 AM"
```

### ddDuration (Duration Dropdown)
```
Name: ddDuration
Items: ["30 minutes", "1 hour", "1.5 hours", "2 hours"]
Default: "1 hour"
```

### txtMeetingNotes (Notes Field)
```
Name: txtMeetingNotes
HintText: "Enter meeting agenda or notes..."
Mode: MultiLine
Height: 200
```

---

## Required Connections

### Add Connectors (Data Panel)
1. Click **Data** → **Add data**
2. Search and add:
   - **Office 365 Outlook** (for sending emails)
   - **Microsoft Teams** (for Teams meetings)
   - **Office 365 Users** (optional, for user lookup)

---

## Testing Checklist

### Basic Tests
- [ ] Send to single recipient
- [ ] Send to multiple recipients (use semicolons)
- [ ] Verify email from ISProblemcalls@brownhealth.org
- [ ] Copy meeting notes to clipboard
- [ ] Send first invite
- [ ] Click reconvene button
- [ ] Send reconvened invite with new date/time

### Validation Tests
- [ ] Try sending without To address → Should show error
- [ ] Try sending without date → Should show error
- [ ] Invalid email format → Should validate
- [ ] HTML formatting in email → Should render properly

---

## Troubleshooting (Top 3 Issues)

### 1. Email not sending from shared mailbox
**Fix**: 
- Go to Microsoft 365 Admin → Shared mailboxes
- Select ISProblemcalls@brownhealth.org
- Add user with "Send As" permission
- Wait 30-60 minutes for propagation

### 2. Copy button not working
**Fix**:
- Copy() function only works on user click
- Test in web browser (Chrome/Edge)
- Not supported in PowerApps mobile app

### 3. Reconvene button not visible
**Fix**:
- Send at least one invite first (creates varLastInvite)
- Check button's DisplayMode property:
  `If(IsBlank(varLastInvite), DisplayMode.Disabled, DisplayMode.Edit)`

---

## Screen Layout (Visual Guide)

```
┌──────────────────────────────────────────────────┐
│     Problem Call - Teams Meeting Invitation      │
├──────────────────────────────────────────────────┤
│ To: * [text input - multiline]                   │
├──────────────────────────────────────────────────┤
│ Subject: [text input]                            │
├──────────────────────────────────────────────────┤
│ Date: [date picker]  Time: [dropdown]            │
│ Duration: [dropdown]                             │
├──────────────────────────────────────────────────┤
│ Meeting Notes:              [📋 Copy Notes]      │
│ [text input - multiline]                         │
├──────────────────────────────────────────────────┤
│ [📧 Send Invite]  [🔄 Reconvene at Different Time]│
└──────────────────────────────────────────────────┘
```

---

## Key Features Summary

✅ **Required To Field**: Email addresses (semicolon-separated)  
✅ **Dedicated Sender**: ISProblemcalls@brownhealth.org  
✅ **Copy Notes**: One-click copy to clipboard  
✅ **Reconvene**: Resend same meeting at different date/time  
✅ **Teams Integration**: Creates Teams meeting invite  
✅ **HTML Email**: Professional formatted emails  

---

## Next Steps After Build

1. **Test thoroughly** with test email addresses
2. **Get IT approval** for shared mailbox permissions
3. **Train users** on how to use the app
4. **Share app** with authorized personnel
5. **Monitor usage** and gather feedback
6. **Document support process** for issues

---

## Support Resources

- **Full Documentation**: See POWERAPPS-PROBLEM-CALL-SCREEN-GUIDE.md
- **PowerApps Help**: https://learn.microsoft.com/powerapps
- **Office 365 Connector**: https://learn.microsoft.com/connectors/office365
- **IT Helpdesk**: [Your organization's support contact]

---

**Quick Reference Version**: 1.0  
**For detailed instructions, see**: POWERAPPS-PROBLEM-CALL-SCREEN-GUIDE.md
