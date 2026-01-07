# Quick Start - Copy & Paste Commands

## Running the Script

### Method 1: Right-Click (Easiest)
1. Right-click on `Patching-Report-Combiner.ps1`
2. Select "Run with PowerShell"

### Method 2: PowerShell Command Line

Open PowerShell in the script directory and run:

```powershell
.\Patching-Report-Combiner.ps1
```

### Method 3: Bypass Execution Policy (If needed)

If you get an execution policy error, use this command:

```powershell
powershell -ExecutionPolicy Bypass -File ".\Patching-Report-Combiner.ps1"
```

### Method 4: From Any Location

Replace `<PATH>` with the actual path to the script:

```powershell
powershell -ExecutionPolicy Bypass -File "<PATH>\Patching-Report-Combiner.ps1"
```

Example:
```powershell
powershell -ExecutionPolicy Bypass -File "C:\Scripts\Patching-Report-Combiner.ps1"
```

## What You'll See

1. **Star Trek-themed UI window** opens
2. **Click "BROWSE..."** to select your CSV folder
3. **Click "⚡ ENGAGE COMBINING ⚡"** to process
4. **Status messages** show progress in real-time
5. **Output file** created: `Patching Report Export.csv`

## Key Features Reminder

✅ **Safe**: Folder selection every time - no accidents  
✅ **No Loops**: Only processes selected folder, not subfolders  
✅ **No Deletion**: Source CSV files never modified  
✅ **Append Mode**: Output file never overwritten  
✅ **Deduplication**: Removes duplicate server+KB entries  
✅ **Latest Wins**: Keeps most recent entry for duplicates  
✅ **First 10 Columns**: Preserves format for columns 1-10  
✅ **Security**: No system changes, no external connections  

## Output Location

The combined file is created in the **same folder** as your source CSV files:
- **Filename**: `Patching Report Export.csv`
- **Location**: Same folder you selected in the Browse dialog

## Need Help?

See the full guide: `PATCHING-REPORT-COMBINER-GUIDE.md`
