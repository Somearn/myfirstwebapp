# PowerApps Problem Call Screen - Implementation Guide

## Overview
This guide provides step-by-step instructions for building a PowerApps screen that enables users to start problem call meetings via Microsoft Teams with automated email invitations sent from a dedicated mailbox.

## Requirements Summary
- **Sender Email**: ISProblemcalls@brownhealth.org (dedicated mailbox)
- **Required Fields**: To field(s) for recipient email addresses
- **Meeting Type**: Microsoft Teams meeting
- **Copy Functionality**: Ability to copy meeting invite notes
- **Resend Feature**: Option to reconvene the same meeting at a later time

---

## Prerequisites

### 1. Microsoft 365 Configuration
- Access to PowerApps (Power Apps per-user or per-app license)
- Microsoft Teams enabled for your organization
- Shared mailbox configured: **ISProblemcalls@brownhealth.org**
- Appropriate permissions to send email from the shared mailbox

### 2. Required Connections
Before building the app, ensure you have these connectors:
- **Office 365 Outlook** (for sending emails)
- **Office 365 Users** (for user lookups, optional)
- **Microsoft Teams** (for creating Teams meetings)

---

## Step-by-Step Implementation

### Part 1: Create the App and Screen

#### 1.1 Create New Canvas App
1. Navigate to [PowerApps Portal](https://make.powerapps.com)
2. Click **+ Create** → **Canvas app from blank**
3. Name: `Problem Call Manager`
4. Format: **Tablet** (recommended for better screen real estate)
5. Click **Create**

#### 1.2 Design the Screen Layout
1. In the left navigation, rename **Screen1** to `ProblemCallScreen`
2. Set background color: `RGBA(240, 244, 248, 1)` for a professional look

---

### Part 2: Add Required Controls

#### 2.1 Add Header Section
```
Insert → Label
Properties:
- Text: "Problem Call - Teams Meeting Invitation"
- Font: Bold, Size 24
- Color: Dark blue (RGBA(0, 32, 96, 1))
- Alignment: Center
- Position: Top of screen (X: 0, Y: 0, Width: Parent.Width, Height: 80)
```

#### 2.2 Add To Field (Recipients)
```
Insert → Text input
Name: txtToRecipients
Properties:
- HintText: "Enter recipient email addresses (separate multiple with semicolons)"
- Mode: MultiLine
- Required: true
- Position: Below header
- Width: 800
- Height: 100

Insert → Label (above txtToRecipients)
- Text: "To: *"
- Font: Semibold
- Color: Red asterisk indicates required field
```

#### 2.3 Add Subject Field
```
Insert → Text input
Name: txtSubject
Properties:
- HintText: "Problem Call Subject"
- Default: "Problem Call - " & Text(Now(), "mm/dd/yyyy")
- Width: 800
- Height: 60

Insert → Label (above txtSubject)
- Text: "Subject:"
```

#### 2.4 Add Meeting Date/Time Picker
```
Insert → Date picker
Name: dateMeetingDate
Properties:
- DefaultDate: Today()
- Format: ShortDate

Insert → Dropdown
Name: ddMeetingTime
Properties:
- Items: ["8:00 AM", "9:00 AM", "10:00 AM", "11:00 AM", "12:00 PM", 
          "1:00 PM", "2:00 PM", "3:00 PM", "4:00 PM", "5:00 PM"]
- Default: "10:00 AM"

Insert → Label
- Text: "Meeting Date & Time: *"
```

#### 2.5 Add Duration Dropdown
```
Insert → Dropdown
Name: ddDuration
Properties:
- Items: ["30 minutes", "1 hour", "1.5 hours", "2 hours"]
- Default: "1 hour"

Insert → Label
- Text: "Duration:"
```

#### 2.6 Add Meeting Notes/Body Field
```
Insert → Text input
Name: txtMeetingNotes
Properties:
- HintText: "Enter meeting agenda, topics to discuss, or additional notes..."
- Mode: MultiLine
- Height: 200
- Width: 800

Insert → Label (above txtMeetingNotes)
- Text: "Meeting Notes:"
```

#### 2.7 Add Copy Meeting Notes Button
```
Insert → Button
Name: btnCopyNotes
Properties:
- Text: "📋 Copy Meeting Notes"
- OnSelect: Copy(txtMeetingNotes.Text); 
            Notify("Meeting notes copied to clipboard!", NotificationType.Success)
- Fill: RGBA(0, 120, 212, 1)
- Color: White
- Position: Next to txtMeetingNotes field
```

---

### Part 3: Configure Email Sending

#### 3.1 Add Send Meeting Invite Button
```
Insert → Button
Name: btnSendInvite
Properties:
- Text: "📧 Send Problem Call Invite"
- Fill: RGBA(16, 124, 16, 1)
- Color: White
- Width: 300
- Height: 60
```

#### 3.2 Configure Send Button OnSelect Formula
```powerquery
// Validate required fields
If(
    IsBlank(txtToRecipients.Text) Or IsBlank(dateMeetingDate.SelectedDate) Or IsBlank(ddMeetingTime.Selected.Value),
    Notify("Please fill in all required fields (To, Date, Time)", NotificationType.Error),
    
    // Build meeting details
    With(
        {
            meetingDateTime: Text(dateMeetingDate.SelectedDate, "yyyy-mm-dd") & " " & ddMeetingTime.Selected.Value,
            meetingBody: "<html><body>" & 
                        "<p>You are invited to a Problem Call via Microsoft Teams.</p>" &
                        "<p><strong>Topic:</strong> " & txtSubject.Text & "</p>" &
                        "<p><strong>Date/Time:</strong> " & Text(dateMeetingDate.SelectedDate, "mmmm dd, yyyy") & " at " & ddMeetingTime.Selected.Value & "</p>" &
                        "<p><strong>Duration:</strong> " & ddDuration.Selected.Value & "</p>" &
                        If(!IsBlank(txtMeetingNotes.Text), 
                           "<p><strong>Agenda/Notes:</strong><br>" & txtMeetingNotes.Text & "</p>", 
                           "") &
                        "<p>Join Microsoft Teams Meeting</p>" &
                        "<p>This invitation is sent from the Problem Calls team mailbox.</p>" &
                        "</body></html>"
        },
        
        // Send email with Teams meeting link
        Office365Outlook.SendEmailV2(
            txtToRecipients.Text,
            txtSubject.Text,
            meetingBody,
            {
                Importance: "High",
                From: "ISProblemcalls@brownhealth.org",
                IsHtml: true
            }
        );
        
        // Store for resend functionality
        Set(varLastInvite, {
            To: txtToRecipients.Text,
            Subject: txtSubject.Text,
            Notes: txtMeetingNotes.Text,
            OriginalDate: dateMeetingDate.SelectedDate,
            OriginalTime: ddMeetingTime.Selected.Value,
            Duration: ddDuration.Selected.Value
        });
        
        // Success notification
        Notify("Problem Call invite sent successfully!", NotificationType.Success);
        
        // Optional: Clear form or keep for resend
        // Reset(txtToRecipients); Reset(txtMeetingNotes);
    )
)
```

---

### Part 4: Implement Resend/Reconvene Feature

#### 4.1 Add Reconvene Button
```
Insert → Button
Name: btnReconvene
Properties:
- Text: "🔄 Reconvene at Different Time"
- Fill: RGBA(0, 92, 153, 1)
- Color: White
- DisplayMode: If(IsBlank(varLastInvite), DisplayMode.Disabled, DisplayMode.Edit)
- Visible: !IsBlank(varLastInvite)
```

#### 4.2 Configure Reconvene Button OnSelect Formula
```powerquery
// Populate form with previous meeting details but new date/time
Set(varReconveneMode, true);

// Pre-fill fields from last invite
Reset(txtToRecipients);
Reset(dateMeetingDate);
Reset(ddMeetingTime);

// Set values from stored invite
UpdateContext({
    reconveneRecipients: varLastInvite.To,
    reconveneSubject: "RECONVENED: " & varLastInvite.Subject,
    reconveneNotes: varLastInvite.Notes & 
                    Char(10) & Char(10) & 
                    "--- Reconvened from " & 
                    Text(varLastInvite.OriginalDate, "mm/dd/yyyy") & 
                    " at " & varLastInvite.OriginalTime & " ---"
});

// Populate form
Set(txtToRecipients.Text, reconveneRecipients);
Set(txtSubject.Text, reconveneSubject);
Set(txtMeetingNotes.Text, reconveneNotes);

Notify("Form populated for reconvene. Select new date/time and send.", NotificationType.Information);
```

---

### Part 5: Configure Shared Mailbox Access

#### 5.1 Setup Shared Mailbox Permissions
1. In Microsoft 365 Admin Center:
   - Navigate to **Teams & groups** → **Shared mailboxes**
   - Select or create: `ISProblemcalls@brownhealth.org`
   - Add users who need "Send As" permissions
   - Grant **"Send as"** permission to authorized users

#### 5.2 Configure PowerApps Connection
1. In PowerApps Studio, click **Data** → **Add data**
2. Select **Office 365 Outlook**
3. In the connection settings, ensure:
   - Connection uses the shared mailbox
   - "Send As" capability is enabled

#### 5.3 Alternative: Use SendEmailV2 with From Parameter
The `From` parameter in the `SendEmailV2` function (shown in the send button formula) automatically sends from the shared mailbox if you have proper permissions.

**Important**: Test this with your IT administrator to ensure proper delegation.

---

### Part 6: Add Teams Meeting Integration

For a complete Teams meeting with join link, you'll need to enhance the solution:

#### 6.1 Option A: Use Microsoft Teams Connector
```powerquery
// Add Microsoft Teams connector
// Create meeting and get join link

With(
    {
        teamsEvent: MicrosoftTeams.CreateEvent(
            "me",
            {
                subject: txtSubject.Text,
                start: Text(dateMeetingDate.SelectedDate, "yyyy-mm-ddT") & 
                       Text(TimeValue(ddMeetingTime.Selected.Value), "hh:mm:ss"),
                end: DateAdd(
                    DateTimeValue(Text(dateMeetingDate.SelectedDate, "yyyy-mm-dd") & 
                                  " " & ddMeetingTime.Selected.Value),
                    Value(Left(ddDuration.Selected.Value, 1)),
                    TimeUnit.Hours
                ),
                body: txtMeetingNotes.Text,
                isOnlineMeeting: true
            }
        )
    },
    // Use teamsEvent.onlineMeetingUrl in email body
)
```

#### 6.2 Option B: Use Graph API (Advanced)
For more control, use Microsoft Graph API via HTTP connector to create Teams meeting and retrieve join link.

---

### Part 7: Enhanced Features

#### 7.1 Add Validation Icon/Message
```
Insert → Label
Name: lblValidation
Properties:
- Text: If(
    And(!IsBlank(txtToRecipients.Text), !IsBlank(dateMeetingDate.SelectedDate)),
    "✅ Ready to send",
    "⚠️ Please complete required fields"
)
- Color: If(Contains(Self.Text, "✅"), Green, Red)
```

#### 7.2 Add Email Preview Section
```
Insert → HTML text
Name: htmlPreview
Properties:
- HtmlText: 
    "<div style='border: 1px solid #ccc; padding: 15px; background: white;'>" &
    "<h3>" & txtSubject.Text & "</h3>" &
    "<p><strong>To:</strong> " & txtToRecipients.Text & "</p>" &
    "<p><strong>From:</strong> ISProblemcalls@brownhealth.org</p>" &
    "<p><strong>Date/Time:</strong> " & Text(dateMeetingDate.SelectedDate, "mmmm dd, yyyy") & 
    " at " & ddMeetingTime.Selected.Value & "</p>" &
    "<p><strong>Duration:</strong> " & ddDuration.Selected.Value & "</p>" &
    If(!IsBlank(txtMeetingNotes.Text), 
       "<p><strong>Notes:</strong><br>" & txtMeetingNotes.Text & "</p>", "") &
    "</div>"
```

#### 7.3 Add Recent Invites Gallery (Optional)
Store sent invites in SharePoint list or Dataverse table for tracking:
```
Collection: colRecentInvites
Columns: Subject, Recipients, DateTime, Status
```

---

## Complete Screen Layout

```
┌─────────────────────────────────────────────────────────────────┐
│                                                                 │
│         Problem Call - Teams Meeting Invitation                 │
│                                                                 │
├─────────────────────────────────────────────────────────────────┤
│                                                                 │
│  To: *                                                          │
│  ┌───────────────────────────────────────────────────────────┐ │
│  │ user1@brownhealth.org; user2@brownhealth.org             │ │
│  └───────────────────────────────────────────────────────────┘ │
│                                                                 │
│  Subject:                                                       │
│  ┌───────────────────────────────────────────────────────────┐ │
│  │ Problem Call - 01/08/2026                                 │ │
│  └───────────────────────────────────────────────────────────┘ │
│                                                                 │
│  Meeting Date & Time: *                                         │
│  [01/09/2026 ▼]    [10:00 AM ▼]    Duration: [1 hour ▼]       │
│                                                                 │
│  Meeting Notes:                              [📋 Copy Notes]    │
│  ┌───────────────────────────────────────────────────────────┐ │
│  │ Discussion topics:                                        │ │
│  │ - Production issue XYZ                                    │ │
│  │ - Action items review                                     │ │
│  │                                                           │ │
│  └───────────────────────────────────────────────────────────┘ │
│                                                                 │
│  ┌─────────────── Email Preview ──────────────┐               │
│  │ Subject: Problem Call - 01/08/2026         │               │
│  │ To: user1@brownhealth.org                  │               │
│  │ From: ISProblemcalls@brownhealth.org       │               │
│  │ ...                                        │               │
│  └────────────────────────────────────────────┘               │
│                                                                 │
│  ✅ Ready to send                                               │
│                                                                 │
│  [📧 Send Problem Call Invite]  [🔄 Reconvene at Different Time]│
│                                                                 │
└─────────────────────────────────────────────────────────────────┘
```

---

## Testing Checklist

### Before Deployment
- [ ] Test sending email from shared mailbox (ISProblemcalls@brownhealth.org)
- [ ] Verify "Send As" permissions are configured correctly
- [ ] Test with single recipient email address
- [ ] Test with multiple recipients (semicolon separated)
- [ ] Verify Teams meeting link is included in email
- [ ] Test copy to clipboard functionality
- [ ] Test reconvene feature with different date/time
- [ ] Verify email formatting (HTML rendering)
- [ ] Test required field validation
- [ ] Test with invalid email addresses

### User Acceptance Testing
- [ ] Have end users test the complete flow
- [ ] Verify email deliverability
- [ ] Confirm Teams meeting join link works
- [ ] Validate meeting appears in recipients' calendars
- [ ] Test reconvene workflow end-to-end

---

## Troubleshooting

### Issue: Email not sending from shared mailbox
**Solution**: 
- Verify "Send As" permissions in Microsoft 365 Admin Center
- Ensure the shared mailbox is properly configured
- Check that the user has full access to the shared mailbox
- May need to wait up to 60 minutes for permission changes to propagate

### Issue: Teams meeting link not included
**Solution**:
- Ensure Microsoft Teams connector is added to the app
- Verify Teams meeting creation permissions
- Check that `isOnlineMeeting: true` is set in meeting creation
- Consider using Graph API for more reliable meeting creation

### Issue: Copy to clipboard not working
**Solution**:
- The `Copy()` function requires user interaction (button click)
- Ensure PowerApps is running in browser (not mobile app where clipboard access is restricted)
- Test in different browsers (Chrome, Edge recommended)

### Issue: Reconvene button not visible
**Solution**:
- Ensure at least one invite has been sent (varLastInvite is set)
- Check DisplayMode formula is correct
- Verify the button's Visible property

### Issue: Invalid email format
**Solution**:
- Add validation formula using `IsMatch()` function:
```powerquery
IsMatch(txtToRecipients.Text, Match.Email) Or 
Contains(txtToRecipients.Text, ";") && // Multiple emails
ForAll(Split(txtToRecipients.Text, ";"), IsMatch(Trim(Result), Match.Email))
```

---

## Advanced Enhancements

### 1. Add CC/BCC Fields
```powerquery
Insert → Text input (txtCCRecipients, txtBCCRecipients)
Add to SendEmailV2:
{
    CC: txtCCRecipients.Text,
    BCC: txtBCCRecipients.Text
}
```

### 2. Store Meeting History in Dataverse
```powerquery
// Create Dataverse table: ProblemCallHistory
// Columns: Subject, Recipients, MeetingDate, Status, CreatedBy, CreatedOn

Patch(
    ProblemCallHistory,
    Defaults(ProblemCallHistory),
    {
        Subject: txtSubject.Text,
        Recipients: txtToRecipients.Text,
        MeetingDate: dateMeetingDate.SelectedDate,
        Status: "Sent",
        MeetingNotes: txtMeetingNotes.Text
    }
)
```

### 3. Add Email Templates
```powerquery
// Create dropdown with pre-defined templates
ddTemplates: ["Production Issue", "Security Incident", "Change Request Review"]

// On template selection, populate fields
OnSelect: 
    Switch(
        ddTemplates.Selected.Value,
        "Production Issue",
            Set(txtSubject.Text, "URGENT: Production Issue - Problem Call");
            Set(txtMeetingNotes.Text, "Production issue requiring immediate attention..."),
        "Security Incident",
            Set(txtSubject.Text, "SECURITY: Incident Response - Problem Call");
            ...
    )
```

### 4. Add Recurring Meeting Option
```powerquery
// Add toggle for recurring meetings
Toggle: tglRecurring

// If enabled, show recurrence pattern options
Dropdown: ddRecurrencePattern ["Daily", "Weekly", "Bi-weekly"]
```

---

## Security Considerations

### 1. Access Control
- Limit app access to authorized personnel only
- Use Azure AD security groups to control who can run the app
- Set app permissions appropriately in PowerApps settings

### 2. Data Protection
- Don't log sensitive information in collections
- Use appropriate data loss prevention (DLP) policies
- Ensure email content follows organizational policies

### 3. Audit Trail
- Consider logging all sent invites to SharePoint or Dataverse
- Include timestamp, sender (User().Email), recipients
- Helps with compliance and troubleshooting

---

## Deployment Steps

### 1. Save and Publish
1. Click **File** → **Save**
2. Enter version notes: "Initial version - Problem Call screen"
3. Click **Publish**
4. Click **Publish this version**

### 2. Share with Users
1. Click **Share** button
2. Add users or Azure AD security groups
3. Set permission level (Can use, Can edit)
4. Send invitation

### 3. Create App Documentation for Users
- Quick start guide with screenshots
- Video walkthrough (optional)
- FAQ document
- Support contact information

---

## Maintenance and Updates

### Regular Maintenance
- Review sent invite logs monthly
- Check for failed emails in shared mailbox
- Update templates as needed
- Gather user feedback for improvements

### Version Control
- Document all changes in version notes
- Test updates in a copy/dev environment first
- Communicate changes to users before deploying

---

## Support and Resources

### Microsoft Documentation
- [PowerApps Canvas Apps Documentation](https://docs.microsoft.com/powerapps/maker/canvas-apps/)
- [Office 365 Outlook Connector Reference](https://docs.microsoft.com/connectors/office365/)
- [Microsoft Teams Connector Reference](https://docs.microsoft.com/connectors/teams/)

### Internal Resources
- IT Helpdesk: [Contact Info]
- PowerApps Center of Excellence: [Contact Info]
- Shared Mailbox Administrator: [Contact Info]

---

## Appendix: Formula Reference

### Complete Send Email Formula (Full Version with Teams)
```powerquery
If(
    IsBlank(txtToRecipients.Text) Or IsBlank(dateMeetingDate.SelectedDate) Or IsBlank(ddMeetingTime.Selected.Value),
    Notify("Please fill in all required fields", NotificationType.Error),
    
    // Create Teams meeting first
    With(
        {
            startDateTime: DateTimeValue(
                Text(dateMeetingDate.SelectedDate, "yyyy-mm-dd") & " " & 
                Text(TimeValue(ddMeetingTime.Selected.Value), "hh:mm:ss")
            ),
            durationMinutes: Switch(
                ddDuration.Selected.Value,
                "30 minutes", 30,
                "1 hour", 60,
                "1.5 hours", 90,
                "2 hours", 120,
                60 // default
            )
        },
        With(
            {
                teamsEvent: MicrosoftTeams.CreateEvent(
                    "me",
                    {
                        subject: txtSubject.Text,
                        start: Text(startDateTime, "yyyy-mm-ddThh:mm:ss"),
                        end: Text(DateAdd(startDateTime, durationMinutes, TimeUnit.Minutes), "yyyy-mm-ddThh:mm:ss"),
                        body: txtMeetingNotes.Text,
                        isOnlineMeeting: true,
                        onlineMeetingProvider: "teamsForBusiness"
                    }
                )
            },
            
            // Send email with Teams meeting link
            Office365Outlook.SendEmailV2(
                txtToRecipients.Text,
                txtSubject.Text,
                "<html><body style='font-family: Segoe UI, Arial, sans-serif;'>" &
                "<div style='background-color: #f3f2f1; padding: 20px;'>" &
                "<div style='background-color: white; padding: 20px; border-radius: 4px;'>" &
                "<h2 style='color: #464775;'>Problem Call - Microsoft Teams Meeting</h2>" &
                "<hr style='border: 1px solid #e1dfdd;'/>" &
                "<p><strong>Subject:</strong> " & txtSubject.Text & "</p>" &
                "<p><strong>Date/Time:</strong> " & Text(dateMeetingDate.SelectedDate, "dddd, mmmm dd, yyyy") & 
                " at " & ddMeetingTime.Selected.Value & "</p>" &
                "<p><strong>Duration:</strong> " & ddDuration.Selected.Value & "</p>" &
                If(!IsBlank(txtMeetingNotes.Text),
                   "<div style='background-color: #f3f2f1; padding: 15px; margin: 15px 0; border-radius: 4px;'>" &
                   "<p><strong>Meeting Agenda/Notes:</strong></p>" &
                   "<p style='white-space: pre-wrap;'>" & txtMeetingNotes.Text & "</p>" &
                   "</div>",
                   "") &
                "<div style='margin: 20px 0;'>" &
                "<a href='" & teamsEvent.onlineMeetingUrl & "' style='background-color: #464775; color: white; padding: 12px 24px; text-decoration: none; border-radius: 4px; display: inline-block;'>Join Microsoft Teams Meeting</a>" &
                "</div>" &
                "<p style='font-size: 12px; color: #605e5c;'>This invitation is sent from the Problem Calls team mailbox (ISProblemcalls@brownhealth.org)</p>" &
                "</div></div>" &
                "</body></html>",
                {
                    Importance: "High",
                    From: "ISProblemcalls@brownhealth.org",
                    IsHtml: true
                }
            );
            
            // Store for resend
            Set(varLastInvite, {
                To: txtToRecipients.Text,
                Subject: txtSubject.Text,
                Notes: txtMeetingNotes.Text,
                OriginalDate: dateMeetingDate.SelectedDate,
                OriginalTime: ddMeetingTime.Selected.Value,
                Duration: ddDuration.Selected.Value,
                TeamsLink: teamsEvent.onlineMeetingUrl
            });
            
            Notify("Problem Call invite sent successfully!", NotificationType.Success)
        )
    )
)
```

---

**Version**: 1.0  
**Last Updated**: January 2026  
**Author**: IT Operations Team  
**Document Status**: Active
