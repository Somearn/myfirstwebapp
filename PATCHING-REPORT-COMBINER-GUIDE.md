# Patching Report Combiner - User Guide

## Overview
The Patching Report Combiner is a PowerShell script with a Star Trek-inspired WinForms UI that safely combines multiple CSV files into a single consolidated patching report.

## Features

### ✅ Core Functionality
- **Safe Folder Selection**: Uses a folder browser dialog each time to ensure you're working with the correct directory
- **CSV Combination**: Combines all CSV files in the selected folder (excluding the output file)
- **Duplicate Removal**: Automatically removes duplicate entries based on Server + KB combination
- **Latest Entry Priority**: When duplicates are found, keeps only the most recent entry
- **Column Preservation**: Maintains the format and headers for columns 1-10
- **Append Mode**: Never overwrites the output file - always appends new data
- **No File Deletion**: Source CSV files are never modified or deleted

### 🎨 Star Trek Dark Glass Theme UI
- Deep space blue-black background
- Translucent glass-style panels
- LCARS-inspired blue borders
- Color-coded status messages
- Professional and futuristic appearance

### 🔒 Security Features
- **No System Modifications**: Script doesn't change execution policies or system settings
- **Strict Mode**: Uses PowerShell strict mode to catch potential issues
- **No External Downloads**: Uses only built-in .NET Windows Forms classes
- **Path Validation**: Validates all paths before processing
- **Read-Only Source Files**: Never modifies source CSV files
- **Safe Folder Selection**: Manual folder selection prevents accidental processing of wrong directories

## How to Use

### Prerequisites
- Windows PowerShell 5.1 or later (comes with Windows 10/11)
- Windows operating system with .NET Framework
- CSV files with consistent structure

### Step-by-Step Instructions

1. **Right-click on `Patching-Report-Combiner.ps1`** and select "Run with PowerShell"
   - Alternatively, open PowerShell and run: `.\Patching-Report-Combiner.ps1`

2. **The Star Trek UI window will appear** with the title "STARFLEET PATCHING OPERATIONS"

3. **Click the "BROWSE..." button** to select your source folder
   - Navigate to the folder containing your CSV files
   - Click "Select Folder" or "OK"
   - The folder path will appear in the text box

4. **Click "⚡ ENGAGE COMBINING ⚡"** button to start processing
   - The script will scan for CSV files in the selected folder
   - Status messages will appear in real-time showing progress
   - Each file will be processed and added to the combined report

5. **Review the status messages** to see:
   - How many CSV files were found
   - How many rows were loaded from each file
   - How many duplicates were removed
   - The final row count
   - The output file location

6. **Output File**: `Patching Report Export.csv`
   - Created in the same folder as your source CSV files
   - Will be appended to if it already exists (never overwritten)
   - Contains only the first 10 columns from your source files
   - Duplicates removed (same server + KB combination)

### Running Multiple Times

You can run the script as many times as needed:
- Each run requires you to select the folder again (safety feature)
- The output file will be updated with new data
- Duplicates across all runs will be removed (latest entry wins)
- No source files are ever modified or deleted

## Technical Details

### Column Detection
The script automatically detects column names for deduplication:

**Server Column** (first match found):
- Server, ServerName, ComputerName, Computer, Hostname, Host, Name

**KB Column** (first match found):
- KB, HotfixID, UpdateID, Patch, Update

**Date Column** (first match found, used to determine "latest"):
- Date, Time, Timestamp, DateTime, Installed, InstallDate, ScanDate, LastUpdate

### Deduplication Logic
1. Groups entries by Server + KB combination
2. For each group with duplicates:
   - If a date column exists, sorts by date and keeps the latest
   - If no date column, keeps the last processed entry
3. Removes older duplicate entries

### File Processing
- Only processes `.csv` files in the selected folder
- Non-recursive: does not scan subfolders (safety feature)
- Excludes the output file from processing
- Preserves only the first 10 columns
- Uses UTF-8 encoding for the output file

## Troubleshooting

### "Execution Policy" Error
If you see an error about execution policy when trying to run the script:

**Option 1** (Recommended - Temporary):
```powershell
powershell -ExecutionPolicy Bypass -File ".\Patching-Report-Combiner.ps1"
```

**Option 2** (Administrator - Persistent):
```powershell
Set-ExecutionPolicy RemoteSigned -Scope CurrentUser
```

### No CSV Files Found
- Ensure you selected the correct folder
- Check that CSV files exist in the selected folder
- Verify files have `.csv` extension (not `.txt` or `.xlsx`)

### Deduplication Not Working
- Check that your CSV files have columns for Server/Computer and KB/Update
- Review the status messages for detected column names
- The script will warn if it cannot identify the appropriate columns

### Cannot Write Output File
- Ensure you have write permissions to the selected folder
- Close the output file if it's open in Excel or another application
- Check available disk space

## FAQ

**Q: Will this script modify my original CSV files?**
A: No, the script only reads from source files and never modifies or deletes them.

**Q: What if I accidentally process the wrong folder?**
A: The folder selection dialog appears every time, and no files are deleted. At worst, you'll append unwanted data to the output file, but you can delete the output file and start over.

**Q: Can I use this with more than 10 columns?**
A: Currently configured for columns 1-10 as requested. The script can be modified to support more columns in the future.

**Q: How do I know which entry was kept when duplicates were found?**
A: The script keeps the entry with the latest date (if a date column exists), or the most recently processed entry.

**Q: Is it safe to run this in a corporate environment?**
A: Yes, the script uses only built-in Windows components, makes no system changes, and doesn't access the network or external resources.

## Support

For issues or questions:
1. Review the status messages in the UI
2. Check the troubleshooting section above
3. Verify your CSV files have consistent structure
4. Contact your IT Operations team for assistance

---

**Version**: 1.0  
**Last Updated**: January 2025  
**Compatible With**: Windows PowerShell 5.1+, Windows 10/11
