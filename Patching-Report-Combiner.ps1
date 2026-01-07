#Requires -Version 5.1

<#
.SYNOPSIS
    CSV Patching Report Combiner with Star Trek-inspired UI
.DESCRIPTION
    Combines multiple CSV files from a selected folder into a single patching report.
    Removes duplicates (same server + KB), keeping the latest entry.
    Preserves headers for columns 1-10.
    Appends to existing "Patching Report Export.csv" without overwriting.
.NOTES
    Author: IT Operations
    Version: 1.0
    Security: Uses only built-in .NET classes, no external downloads or modifications
#>

# Security: Set strict mode to catch potential issues
Set-StrictMode -Version Latest

# Security: This script respects existing execution policies and makes no system-wide changes
# If you encounter execution policy errors, use: powershell -ExecutionPolicy Bypass -File "script.ps1"

Add-Type -AssemblyName System.Windows.Forms
Add-Type -AssemblyName System.Drawing

# Create the main form
$form = New-Object System.Windows.Forms.Form
$form.Text = "STARFLEET PATCHING OPERATIONS"
$form.Size = New-Object System.Drawing.Size(800, 600)
$form.StartPosition = "CenterScreen"
$form.FormBorderStyle = "FixedDialog"
$form.MaximizeBox = $false
$form.MinimizeBox = $true

# Star Trek Dark Glass Theme Colors
$colorBackground = [System.Drawing.Color]::FromArgb(15, 20, 35)          # Deep space blue-black
$colorPanel = [System.Drawing.Color]::FromArgb(25, 35, 55)               # Dark glass blue
$colorPanelLight = [System.Drawing.Color]::FromArgb(35, 50, 75)          # Lighter glass
$colorBorder = [System.Drawing.Color]::FromArgb(100, 150, 255)           # LCARS blue border
$colorText = [System.Drawing.Color]::FromArgb(200, 220, 255)             # Light blue text
$colorAccent = [System.Drawing.Color]::FromArgb(150, 200, 255)           # Bright blue accent
$colorButton = [System.Drawing.Color]::FromArgb(40, 60, 95)              # Button background
$colorButtonHover = [System.Drawing.Color]::FromArgb(60, 90, 140)        # Button hover
$colorSuccess = [System.Drawing.Color]::FromArgb(100, 255, 150)          # Success green
$colorWarning = [System.Drawing.Color]::FromArgb(255, 180, 100)          # Warning amber

$form.BackColor = $colorBackground

# Create custom font
$fontTitle = New-Object System.Drawing.Font("Segoe UI", 16, [System.Drawing.FontStyle]::Bold)
$fontHeader = New-Object System.Drawing.Font("Segoe UI", 12, [System.Drawing.FontStyle]::Bold)
$fontNormal = New-Object System.Drawing.Font("Segoe UI", 10)
$fontButton = New-Object System.Drawing.Font("Segoe UI", 11, [System.Drawing.FontStyle]::Bold)

# Title Label
$labelTitle = New-Object System.Windows.Forms.Label
$labelTitle.Text = "⭐ PATCHING REPORT COMBINER ⭐"
$labelTitle.Location = New-Object System.Drawing.Point(20, 20)
$labelTitle.Size = New-Object System.Drawing.Size(760, 40)
$labelTitle.Font = $fontTitle
$labelTitle.ForeColor = $colorAccent
$labelTitle.TextAlign = "MiddleCenter"
$form.Controls.Add($labelTitle)

# Subtitle Label
$labelSubtitle = New-Object System.Windows.Forms.Label
$labelSubtitle.Text = "CSV CONSOLIDATION SYSTEM v1.0"
$labelSubtitle.Location = New-Object System.Drawing.Point(20, 60)
$labelSubtitle.Size = New-Object System.Drawing.Size(760, 25)
$labelSubtitle.Font = $fontNormal
$labelSubtitle.ForeColor = $colorText
$labelSubtitle.TextAlign = "MiddleCenter"
$form.Controls.Add($labelSubtitle)

# Panel for folder selection
$panelFolder = New-Object System.Windows.Forms.Panel
$panelFolder.Location = New-Object System.Drawing.Point(20, 100)
$panelFolder.Size = New-Object System.Drawing.Size(760, 100)
$panelFolder.BackColor = $colorPanel
$panelFolder.BorderStyle = "FixedSingle"
$form.Controls.Add($panelFolder)

$labelFolderTitle = New-Object System.Windows.Forms.Label
$labelFolderTitle.Text = "SOURCE DIRECTORY"
$labelFolderTitle.Location = New-Object System.Drawing.Point(10, 10)
$labelFolderTitle.Size = New-Object System.Drawing.Size(740, 25)
$labelFolderTitle.Font = $fontHeader
$labelFolderTitle.ForeColor = $colorBorder
$panelFolder.Controls.Add($labelFolderTitle)

$textboxFolder = New-Object System.Windows.Forms.TextBox
$textboxFolder.Location = New-Object System.Drawing.Point(10, 40)
$textboxFolder.Size = New-Object System.Drawing.Size(560, 30)
$textboxFolder.Font = $fontNormal
$textboxFolder.BackColor = $colorBackground
$textboxFolder.ForeColor = $colorText
$textboxFolder.BorderStyle = "FixedSingle"
$textboxFolder.ReadOnly = $true
$panelFolder.Controls.Add($textboxFolder)

$buttonBrowse = New-Object System.Windows.Forms.Button
$buttonBrowse.Text = "BROWSE..."
$buttonBrowse.Location = New-Object System.Drawing.Point(580, 38)
$buttonBrowse.Size = New-Object System.Drawing.Size(160, 35)
$buttonBrowse.Font = $fontButton
$buttonBrowse.BackColor = $colorButton
$buttonBrowse.ForeColor = $colorText
$buttonBrowse.FlatStyle = "Flat"
$buttonBrowse.FlatAppearance.BorderColor = $colorBorder
$buttonBrowse.FlatAppearance.BorderSize = 2
$buttonBrowse.Cursor = [System.Windows.Forms.Cursors]::Hand
$panelFolder.Controls.Add($buttonBrowse)

# Status Panel
$panelStatus = New-Object System.Windows.Forms.Panel
$panelStatus.Location = New-Object System.Drawing.Point(20, 220)
$panelStatus.Size = New-Object System.Drawing.Size(760, 240)
$panelStatus.BackColor = $colorPanel
$panelStatus.BorderStyle = "FixedSingle"
$form.Controls.Add($panelStatus)

$labelStatusTitle = New-Object System.Windows.Forms.Label
$labelStatusTitle.Text = "OPERATION STATUS"
$labelStatusTitle.Location = New-Object System.Drawing.Point(10, 10)
$labelStatusTitle.Size = New-Object System.Drawing.Size(740, 25)
$labelStatusTitle.Font = $fontHeader
$labelStatusTitle.ForeColor = $colorBorder
$panelStatus.Controls.Add($labelStatusTitle)

$textboxStatus = New-Object System.Windows.Forms.RichTextBox
$textboxStatus.Location = New-Object System.Drawing.Point(10, 40)
$textboxStatus.Size = New-Object System.Drawing.Size(735, 185)
$textboxStatus.Font = $fontNormal
$textboxStatus.BackColor = $colorBackground
$textboxStatus.ForeColor = $colorText
$textboxStatus.BorderStyle = "FixedSingle"
$textboxStatus.ReadOnly = $true
$textboxStatus.Multiline = $true
$textboxStatus.ScrollBars = "Vertical"
$panelStatus.Controls.Add($textboxStatus)

# Action Buttons Panel
$panelButtons = New-Object System.Windows.Forms.Panel
$panelButtons.Location = New-Object System.Drawing.Point(20, 480)
$panelButtons.Size = New-Object System.Drawing.Size(760, 70)
$panelButtons.BackColor = $colorPanelLight
$panelButtons.BorderStyle = "FixedSingle"
$form.Controls.Add($panelButtons)

$buttonCombine = New-Object System.Windows.Forms.Button
$buttonCombine.Text = "⚡ ENGAGE COMBINING ⚡"
$buttonCombine.Location = New-Object System.Drawing.Point(180, 15)
$buttonCombine.Size = New-Object System.Drawing.Size(250, 40)
$buttonCombine.Font = $fontButton
$buttonCombine.BackColor = $colorButton
$buttonCombine.ForeColor = $colorSuccess
$buttonCombine.FlatStyle = "Flat"
$buttonCombine.FlatAppearance.BorderColor = $colorSuccess
$buttonCombine.FlatAppearance.BorderSize = 2
$buttonCombine.Cursor = [System.Windows.Forms.Cursors]::Hand
$buttonCombine.Enabled = $false
$panelButtons.Controls.Add($buttonCombine)

$buttonExit = New-Object System.Windows.Forms.Button
$buttonExit.Text = "EXIT"
$buttonExit.Location = New-Object System.Drawing.Point(450, 15)
$buttonExit.Size = New-Object System.Drawing.Size(130, 40)
$buttonExit.Font = $fontButton
$buttonExit.BackColor = $colorButton
$buttonExit.ForeColor = $colorText
$buttonExit.FlatStyle = "Flat"
$buttonExit.FlatAppearance.BorderColor = $colorBorder
$buttonExit.FlatAppearance.BorderSize = 2
$buttonExit.Cursor = [System.Windows.Forms.Cursors]::Hand
$panelButtons.Controls.Add($buttonExit)

# Function to add status message
function Add-StatusMessage {
    param(
        [string]$Message,
        [string]$Type = "Info"  # Info, Success, Warning, Error
    )
    
    $timestamp = Get-Date -Format "HH:mm:ss"
    $colorMsg = $colorText
    
    switch ($Type) {
        "Success" { $colorMsg = $colorSuccess }
        "Warning" { $colorMsg = $colorWarning }
        "Error" { $colorMsg = [System.Drawing.Color]::FromArgb(255, 100, 100) }
    }
    
    $textboxStatus.SelectionStart = $textboxStatus.TextLength
    $textboxStatus.SelectionLength = 0
    $textboxStatus.SelectionColor = $colorAccent
    $textboxStatus.AppendText("[$timestamp] ")
    $textboxStatus.SelectionColor = $colorMsg
    $textboxStatus.AppendText("$Message`r`n")
    $textboxStatus.SelectionColor = $colorText
    $textboxStatus.ScrollToCaret()
}

# Browse button click event
$buttonBrowse.Add_Click({
    $folderBrowser = New-Object System.Windows.Forms.FolderBrowserDialog
    $folderBrowser.Description = "Select the folder containing CSV files to combine"
    $folderBrowser.ShowNewFolderButton = $false
    
    if ($folderBrowser.ShowDialog() -eq [System.Windows.Forms.DialogResult]::OK) {
        $textboxFolder.Text = $folderBrowser.SelectedPath
        Add-StatusMessage "Source directory selected: $($folderBrowser.SelectedPath)" "Success"
        $buttonCombine.Enabled = $true
    }
})

# Combine button click event
$buttonCombine.Add_Click({
    if ([string]::IsNullOrWhiteSpace($textboxFolder.Text)) {
        Add-StatusMessage "ERROR: No source directory selected!" "Error"
        [System.Windows.Forms.MessageBox]::Show(
            "Please select a source directory first.",
            "No Directory Selected",
            [System.Windows.Forms.MessageBoxButtons]::OK,
            [System.Windows.Forms.MessageBoxIcon]::Warning
        )
        return
    }
    
    $sourceFolder = $textboxFolder.Text
    
    # Disable button during processing
    $buttonCombine.Enabled = $false
    $buttonBrowse.Enabled = $false
    
    try {
        Add-StatusMessage "═══════════════════════════════════════════" "Info"
        Add-StatusMessage "INITIATING CSV COMBINATION SEQUENCE" "Info"
        Add-StatusMessage "═══════════════════════════════════════════" "Info"
        
        # Security: Validate path exists and is accessible
        if (-not (Test-Path -Path $sourceFolder -PathType Container)) {
            throw "Source folder does not exist or is not accessible: $sourceFolder"
        }
        
        # Get all CSV files from the selected folder (not recursive for safety)
        Add-StatusMessage "Scanning directory for CSV files..." "Info"
        $csvFiles = Get-ChildItem -Path $sourceFolder -Filter "*.csv" -File | 
                    Where-Object { $_.Name -ne "Patching Report Export.csv" }
        
        if ($csvFiles.Count -eq 0) {
            Add-StatusMessage "WARNING: No CSV files found in the selected directory!" "Warning"
            [System.Windows.Forms.MessageBox]::Show(
                "No CSV files found in the selected directory (excluding 'Patching Report Export.csv').",
                "No Files Found",
                [System.Windows.Forms.MessageBoxButtons]::OK,
                [System.Windows.Forms.MessageBoxIcon]::Information
            )
            return
        }
        
        Add-StatusMessage "Found $($csvFiles.Count) CSV file(s) to process" "Success"
        
        # Define output file path
        $outputFile = Join-Path -Path $sourceFolder -ChildPath "Patching Report Export.csv"
        
        # Check if output file exists
        $fileExists = Test-Path -Path $outputFile
        
        # Array to store all CSV data
        $allData = @()
        $headerRow = $null
        
        # Read existing output file if it exists (for appending)
        if ($fileExists) {
            Add-StatusMessage "Loading existing report file..." "Info"
            try {
                $existingData = Import-Csv -Path $outputFile
                if ($existingData) {
                    $allData += $existingData
                    Add-StatusMessage "Loaded $($existingData.Count) existing entries" "Success"
                }
            }
            catch {
                Add-StatusMessage "WARNING: Could not read existing file, will create new: $($_.Exception.Message)" "Warning"
            }
        }
        
        # Process each CSV file
        foreach ($csvFile in $csvFiles) {
            Add-StatusMessage "Processing: $($csvFile.Name)..." "Info"
            
            try {
                $csvData = Import-Csv -Path $csvFile.FullName
                
                if ($csvData) {
                    # Get the first 10 columns (as requested)
                    $properties = ($csvData[0].PSObject.Properties | Select-Object -First 10).Name
                    
                    # Store header if not already stored
                    if (-not $headerRow) {
                        $headerRow = $properties
                    }
                    
                    # Select only first 10 columns and add to collection
                    foreach ($row in $csvData) {
                        $newRow = [PSCustomObject]@{}
                        foreach ($prop in $properties) {
                            $newRow | Add-Member -MemberType NoteProperty -Name $prop -Value $row.$prop
                        }
                        $allData += $newRow
                    }
                    
                    Add-StatusMessage "  → Added $($csvData.Count) rows from $($csvFile.Name)" "Success"
                }
            }
            catch {
                Add-StatusMessage "  → ERROR processing $($csvFile.Name): $($_.Exception.Message)" "Error"
            }
        }
        
        if ($allData.Count -eq 0) {
            Add-StatusMessage "ERROR: No data was successfully loaded from CSV files!" "Error"
            [System.Windows.Forms.MessageBox]::Show(
                "No data could be loaded from the CSV files.",
                "No Data",
                [System.Windows.Forms.MessageBoxButtons]::OK,
                [System.Windows.Forms.MessageBoxIcon]::Error
            )
            return
        }
        
        Add-StatusMessage "Total rows collected: $($allData.Count)" "Info"
        
        # Remove duplicates: Keep latest entry for same Server + KB combination
        Add-StatusMessage "Removing duplicates (same server + KB)..." "Info"
        
        # Determine which columns represent Server and KB
        # Common column names for server: Server, ServerName, ComputerName, Computer, Hostname, Host
        # Common column names for KB: KB, KBNumber, HotfixID, UpdateID, Patch
        
        $serverColumn = $null
        $kbColumn = $null
        $dateColumn = $null
        
        # Find server column
        $serverPatterns = @("Server", "ServerName", "ComputerName", "Computer", "Hostname", "Host", "Name")
        foreach ($pattern in $serverPatterns) {
            $found = $headerRow | Where-Object { $_ -like "*$pattern*" } | Select-Object -First 1
            if ($found) {
                $serverColumn = $found
                break
            }
        }
        
        # Find KB column
        $kbPatterns = @("KB", "HotfixID", "UpdateID", "Patch", "Update")
        foreach ($pattern in $kbPatterns) {
            $found = $headerRow | Where-Object { $_ -like "*$pattern*" } | Select-Object -First 1
            if ($found) {
                $kbColumn = $found
                break
            }
        }
        
        # Find date/time column for determining "latest"
        $datePatterns = @("Date", "Time", "Timestamp", "DateTime", "Installed", "InstallDate", "ScanDate", "LastUpdate")
        foreach ($pattern in $datePatterns) {
            $found = $headerRow | Where-Object { $_ -like "*$pattern*" } | Select-Object -First 1
            if ($found) {
                $dateColumn = $found
                break
            }
        }
        
        if ($serverColumn -and $kbColumn) {
            Add-StatusMessage "Deduplication keys: Server='$serverColumn', KB='$kbColumn'" "Info"
            
            # Group by Server + KB combination
            $grouped = $allData | Group-Object -Property @{Expression={"{0}|{1}" -f $_.$serverColumn, $_.$kbColumn}}
            
            $dedupedData = @()
            $duplicatesRemoved = 0
            
            foreach ($group in $grouped) {
                if ($group.Count -gt 1) {
                    $duplicatesRemoved += ($group.Count - 1)
                    
                    # If we have a date column, sort by date and take the latest
                    if ($dateColumn) {
                        $latest = $group.Group | Sort-Object { 
                            try { [DateTime]$_.$dateColumn } 
                            catch { [DateTime]::MinValue } 
                        } -Descending | Select-Object -First 1
                        $dedupedData += $latest
                    }
                    else {
                        # No date column, just take the last one in the array (most recently processed)
                        $dedupedData += $group.Group[-1]
                    }
                }
                else {
                    $dedupedData += $group.Group[0]
                }
            }
            
            $allData = $dedupedData
            Add-StatusMessage "Removed $duplicatesRemoved duplicate entries" "Success"
        }
        else {
            Add-StatusMessage "WARNING: Could not identify Server and/or KB columns for deduplication" "Warning"
            Add-StatusMessage "Available columns: $($headerRow -join ', ')" "Info"
            Add-StatusMessage "Skipping deduplication step..." "Warning"
        }
        
        Add-StatusMessage "Final row count: $($allData.Count)" "Success"
        
        # Export to output file
        Add-StatusMessage "Exporting to: $outputFile..." "Info"
        
        try {
            # Security: Use -Force to allow writing but preserve existing file permissions
            $allData | Export-Csv -Path $outputFile -NoTypeInformation -Force -Encoding UTF8
            
            Add-StatusMessage "═══════════════════════════════════════════" "Success"
            Add-StatusMessage "OPERATION COMPLETED SUCCESSFULLY!" "Success"
            Add-StatusMessage "═══════════════════════════════════════════" "Success"
            Add-StatusMessage "Output file: $outputFile" "Success"
            Add-StatusMessage "Total entries in report: $($allData.Count)" "Success"
            
            [System.Windows.Forms.MessageBox]::Show(
                "CSV files combined successfully!`n`nOutput: $outputFile`nTotal entries: $($allData.Count)",
                "Operation Complete",
                [System.Windows.Forms.MessageBoxButtons]::OK,
                [System.Windows.Forms.MessageBoxIcon]::Information
            )
        }
        catch {
            Add-StatusMessage "ERROR: Failed to write output file: $($_.Exception.Message)" "Error"
            [System.Windows.Forms.MessageBox]::Show(
                "Failed to write output file: $($_.Exception.Message)",
                "Export Error",
                [System.Windows.Forms.MessageBoxButtons]::OK,
                [System.Windows.Forms.MessageBoxIcon]::Error
            )
        }
    }
    catch {
        Add-StatusMessage "═══════════════════════════════════════════" "Error"
        Add-StatusMessage "OPERATION FAILED!" "Error"
        Add-StatusMessage "Error: $($_.Exception.Message)" "Error"
        Add-StatusMessage "═══════════════════════════════════════════" "Error"
        
        [System.Windows.Forms.MessageBox]::Show(
            "An error occurred: $($_.Exception.Message)",
            "Error",
            [System.Windows.Forms.MessageBoxButtons]::OK,
            [System.Windows.Forms.MessageBoxIcon]::Error
        )
    }
    finally {
        # Re-enable button
        $buttonCombine.Enabled = $true
        $buttonBrowse.Enabled = $true
    }
})

# Exit button click event
$buttonExit.Add_Click({
    $form.Close()
})

# Initial status message
Add-StatusMessage "System initialized and ready" "Success"
Add-StatusMessage "Select a source directory to begin operations" "Info"

# Show the form
[void]$form.ShowDialog()

# Cleanup
$form.Dispose()
