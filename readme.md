# My First Web App

This repository contains both a vanilla JavaScript web application and IT operations tools.

## 📁 Contents

### Web Application
[Azure Static Web Apps](https://docs.microsoft.com/azure/static-web-apps/overview) allows you to easily build JavaScript apps in minutes. Use this repo with the [quickstart](https://docs.microsoft.com/azure/static-web-apps/getting-started?tabs=vanilla-javascript) to build and customize a new static site.

This repo is used as a starter for a _very basic_ HTML web application using no front-end frameworks.

This repo has a dev container. This means if you open it inside a [GitHub Codespace](https://github.com/features/codespaces), or using [VS Code with the remote containers extension](https://code.visualstudio.com/docs/remote/containers), it will be opened inside a container with all the dependencies already installed.

### PowerShell Tools

#### 🚀 Patching Report Combiner

A professional PowerShell script with a Star Trek-inspired UI for combining CSV patching reports.

**Features**:
- ⭐ Star Trek dark glass theme UI
- 📊 Combines multiple CSV files into one report
- 🔄 Removes duplicates (same server + KB)
- 📅 Keeps latest entries
- 🛡️ Safe operation - no file deletion
- 🔒 Security-focused design

**Quick Start**:
```powershell
.\Patching-Report-Combiner.ps1
```

**Documentation**:
- [Quick Start Guide](QUICK-START.md) - Get started in seconds
- [Full User Guide](PATCHING-REPORT-COMBINER-GUIDE.md) - Complete documentation
- [UI Design](UI-DESIGN.md) - Visual design details
- [Security Features](SECURITY.md) - Security and safety information

**Requirements**:
- Windows PowerShell 5.1 or later
- Windows 10/11
- No administrator privileges required

### PowerApps Tools

#### 📧 Problem Call Screen - Teams Meeting Invites

A comprehensive guide for building a PowerApps screen to manage problem call meetings with Microsoft Teams integration.

**Features**:
- 📨 Send Teams meeting invites from dedicated mailbox (ISProblemcalls@brownhealth.org)
- 👥 Required To field with multiple recipient support
- 📋 Copy meeting notes to clipboard
- 🔄 Reconvene feature to reschedule meetings
- 📅 Date/time picker with duration selection
- ✉️ HTML-formatted professional emails
- 🛡️ Built-in validation and error handling

**Documentation**:
- [Quick Reference](POWERAPPS-PROBLEM-CALL-QUICK-REFERENCE.md) - Get started in 30 minutes
- [Full Implementation Guide](POWERAPPS-PROBLEM-CALL-SCREEN-GUIDE.md) - Complete step-by-step instructions

**Requirements**:
- PowerApps license (per-user or per-app)
- Microsoft 365 with Teams enabled
- Access to shared mailbox: ISProblemcalls@brownhealth.org
- "Send As" permissions configured