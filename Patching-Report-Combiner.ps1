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

Set-StrictMode -Version Latest

Add-Type -AssemblyName System.Windows.Forms
Add-Type -AssemblyName System.Drawing

# ----------------------------
# Main Form (1080p + DPI clear)
# ----------------------------
$form = New-Object System.Windows.Forms.Form
$form.Text = "STARFLEET PATCHING OPERATIONS"
$form.StartPosition = "CenterScreen"
$form.FormBorderStyle = [System.Windows.Forms.FormBorderStyle]::FixedSingle
$form.MaximizeBox = $false
$form.MinimizeBox = $true

# DPI-aware scaling (keeps text crisp on common scaling settings)
$form.AutoScaleMode = [System.Windows.Forms.AutoScaleMode]::Dpi
$form.AutoScaleDimensions = New-Object System.Drawing.SizeF(96, 96)

# 1080p workspace (ClientSize avoids borders stealing pixels)
$form.ClientSize = New-Object System.Drawing.Size(1920, 1080)

# Star Trek Dark Glass Theme Colors
$colorBackground = [System.Drawing.Color]::FromArgb(15, 20, 35)          # Deep space blue-black
$colorPanel      = [System.Drawing.Color]::FromArgb(25, 35, 55)          # Dark glass blue
$colorPanelLight = [System.Drawing.Color]::FromArgb(35, 50, 75)          # Lighter glass
$colorBorder     = [System.Drawing.Color]::FromArgb(100, 150, 255)       # LCARS blue border
$colorText       = [System.Drawing.Color]::FromArgb(200, 220, 255)       # Light blue text
$colorAccent     = [System.Drawing.Color]::FromArgb(150, 200, 255)       # Bright blue accent
$colorButton     = [System.Drawing.Color]::FromArgb(40, 60, 95)          # Button background
$colorSuccess    = [System.Drawing.Color]::FromArgb(100, 255, 150)       # Success green
$colorWarning    = [System.Drawing.Color]::FromArgb(255, 180, 100)       # Warning amber
$colorError      = [System.Drawing.Color]::FromArgb(255, 100, 100)       # Error red

$form.BackColor = $colorBackground

# Fonts (scaled up for 1080p readability)
$fontTitle  = New-Object System.Drawing.Font("Segoe UI", 28, [System.Drawing.FontStyle]::Bold)
$fontHeader = New-Object System.Drawing.Font("Segoe UI", 16, [System.Drawing.FontStyle]::Bold)
$fontNormal = New-Object System.Drawing.Font("Segoe UI", 12, [System.Drawing.FontStyle]::Regular)
$fontButton = New-Object System.Drawing.Font("Segoe UI", 14, [System.Drawing.FontStyle]::Bold)
$fontMono   = New-Object System.Drawing.Font("Consolas", 12, [System.Drawing.FontStyle]::Regular)

# Inherit baseline font to controls
$form.Font = $fontNormal

# ----------------------------
# Layout Root (Dock-based)
# ----------------------------
$root = New-Object System.Windows.Forms.TableLayoutPanel
$root.Dock = [System.Windows.Forms.DockStyle]::Fill
$root.BackColor = $colorBackground
$root.Padding = New-Object System.Windows.Forms.Padding(24)
$root.RowCount = 4
$root.ColumnCount = 1
$root.ColumnStyles.Add((New-Object System.Windows.Forms.ColumnStyle([System.Windows.Forms.SizeType]::Percent, 100)))

# Rows: Header, Folder, Status, Buttons
$root.RowStyles.Add((New-Object System.Windows.Forms.RowStyle([System.Windows.Forms.SizeType]::Absolute, 120)))
$root.RowStyles.Add((New-Object System.Windows.Forms.RowStyle([System.Windows.Forms.SizeType]::Absolute, 160)))
$root.RowStyles.Add((New-Object System.Windows.Forms.RowStyle([System.Windows.Forms.SizeType]::Percent, 100)))
$root.RowStyles.Add((New-Object System.Windows.Forms.RowStyle([System.Windows.Forms.SizeType]::Absolute, 120)))

$form.Controls.Add($root)

# ----------------------------
# Header Area
# ----------------------------
$panelHeader = New-Object System.Windows.Forms.Panel
$panelHeader.Dock = [System.Windows.Forms.DockStyle]::Fill
$panelHeader.BackColor = $colorBackground
$panelHeader.Margin = New-Object System.Windows.Forms.Padding(0, 0, 0, 16)

$headerTlp = New-Object System.Windows.Forms.TableLayoutPanel
$headerTlp.Dock = [System.Windows.Forms.DockStyle]::Fill
$headerTlp.BackColor = $colorBackground
$headerTlp.RowCount = 2
$headerTlp.ColumnCount = 1
$headerTlp.ColumnStyles.Add((New-Object System.Windows.Forms.ColumnStyle([System.Windows.Forms.SizeType]::Percent, 100)))
$headerTlp.RowStyles.Add((New-Object System.Windows.Forms.RowStyle([System.Windows.Forms.SizeType]::Percent, 65)))
$headerTlp.RowStyles.Add((New-Object System.Windows.Forms.RowStyle([System.Windows.Forms.SizeType]::Percent, 35)))
$panelHeader.Controls.Add($headerTlp)

$labelTitle = New-Object System.Windows.Forms.Label
$labelTitle.Text = "⭐ PATCHING REPORT COMBINER ⭐"
$labelTitle.Dock = [System.Windows.Forms.DockStyle]::Fill
$labelTitle.Font = $fontTitle
$labelTitle.ForeColor = $colorAccent
$labelTitle.TextAlign = [System.Drawing.ContentAlignment]::MiddleCenter
$headerTlp.Controls.Add($labelTitle, 0, 0)

$labelSubtitle = New-Object System.Windows.Forms.Label
$labelSubtitle.Text = "CSV CONSOLIDATION SYSTEM v1.0"
$labelSubtitle.Dock = [System.Windows.Forms.DockStyle]::Fill
$labelSubtitle.Font = $fontNormal
$labelSubtitle.ForeColor = $colorText
$labelSubtitle.TextAlign = [System.Drawing.ContentAlignment]::TopCenter
$headerTlp.Controls.Add($labelSubtitle, 0, 1)

$root.Controls.Add($panelHeader, 0, 0)

# ----------------------------
# Folder Selection Panel
# ----------------------------
$panelFolder = New-Object System.Windows.Forms.Panel
$panelFolder.Dock = [System.Windows.Forms.DockStyle]::Fill
$panelFolder.BackColor = $colorPanel
$panelFolder.BorderStyle = [System.Windows.Forms.BorderStyle]::FixedSingle
$panelFolder.Margin = New-Object System.Windows.Forms.Padding(0, 0, 0, 16)
$panelFolder.Padding = New-Object System.Windows.Forms.Padding(16)

$folderTlp = New-Object System.Windows.Forms.TableLayoutPanel
$folderTlp.Dock = [System.Windows.Forms.DockStyle]::Fill
$folderTlp.BackColor = $colorPanel
$folderTlp.RowCount = 2
$folderTlp.ColumnCount = 1
$folderTlp.ColumnStyles.Add((New-Object System.Windows.Forms.ColumnStyle([System.Windows.Forms.SizeType]::Percent, 100)))
$folderTlp.RowStyles.Add((New-Object System.Windows.Forms.RowStyle([System.Windows.Forms.SizeType]::Absolute, 40)))
$folderTlp.RowStyles.Add((New-Object System.Windows.Forms.RowStyle([System.Windows.Forms.SizeType]::Percent, 100)))
$panelFolder.Controls.Add($folderTlp)

$labelFolderTitle = New-Object System.Windows.Forms.Label
$labelFolderTitle.Text = "SOURCE DIRECTORY"
$labelFolderTitle.Dock = [System.Windows.Forms.DockStyle]::Fill
$labelFolderTitle.Font = $fontHeader
$labelFolderTitle.ForeColor = $colorBorder
$labelFolderTitle.TextAlign = [System.Drawing.ContentAlignment]::MiddleLeft
$folderTlp.Controls.Add($labelFolderTitle, 0, 0)

$folderRow = New-Object System.Windows.Forms.TableLayoutPanel
$folderRow.Dock = [System.Windows.Forms.DockStyle]::Fill
$folderRow.BackColor = $colorPanel
$folderRow.ColumnCount = 2
$folderRow.RowCount = 1
$folderRow.ColumnStyles.Add((New-Object System.Windows.Forms.ColumnStyle([System.Windows.Forms.SizeType]::Percent, 100)))
$folderRow.ColumnStyles.Add((New-Object System.Windows.Forms.ColumnStyle([System.Windows.Forms.SizeType]::Absolute, 260)))
$folderRow.RowStyles.Add((New-Object System.Windows.Forms.RowStyle([System.Windows.Forms.SizeType]::Percent, 100)))
$folderTlp.Controls.Add($folderRow, 0, 1)

$textboxFolder = New-Object System.Windows.Forms.TextBox
$textboxFolder.Dock = [System.Windows.Forms.DockStyle]::Fill
$textboxFolder.Font = $fontNormal
$textboxFolder.BackColor = $colorBackground
$textboxFolder.ForeColor = $colorText
$textboxFolder.BorderStyle = [System.Windows.Forms.BorderStyle]::FixedSingle
$textboxFolder.ReadOnly = $true
$textboxFolder.Margin = New-Object System.Windows.Forms.Padding(0, 6, 12, 6)
$textboxFolder.MinimumSize = New-Object System.Drawing.Size(0, 44)
$folderRow.Controls.Add($textboxFolder, 0, 0)

$buttonBrowse = New-Object System.Windows.Forms.Button
$buttonBrowse.Text = "BROWSE..."
$buttonBrowse.Dock = [System.Windows.Forms.DockStyle]::Fill
$buttonBrowse.Font = $fontButton
$buttonBrowse.BackColor = $colorButton
$buttonBrowse.ForeColor = $colorText
$buttonBrowse.FlatStyle = [System.Windows.Forms.FlatStyle]::Flat
$buttonBrowse.FlatAppearance.BorderColor = $colorBorder
$buttonBrowse.FlatAppearance.BorderSize = 2
$buttonBrowse.Cursor = [System.Windows.Forms.Cursors]::Hand
$buttonBrowse.Margin = New-Object System.Windows.Forms.Padding(0, 6, 0, 6)
$folderRow.Controls.Add($buttonBrowse, 1, 0)

$root.Controls.Add($panelFolder, 0, 1)

# ----------------------------
# Status Panel
# ----------------------------
$panelStatus = New-Object System.Windows.Forms.Panel
$panelStatus.Dock = [System.Windows.Forms.DockStyle]::Fill
$panelStatus.BackColor = $colorPanel
$panelStatus.BorderStyle = [System.Windows.Forms.BorderStyle]::FixedSingle
$panelStatus.Margin = New-Object System.Windows.Forms.Padding(0, 0, 0, 16)
$panelStatus.Padding = New-Object System.Windows.Forms.Padding(16)

$statusTlp = New-Object System.Windows.Forms.TableLayoutPanel
$statusTlp.Dock = [System.Windows.Forms.DockStyle]::Fill
$statusTlp.BackColor = $colorPanel
$statusTlp.RowCount = 2
$statusTlp.ColumnCount = 1
$statusTlp.ColumnStyles.Add((New-Object System.Windows.Forms.ColumnStyle([System.Windows.Forms.SizeType]::Percent, 100)))
$statusTlp.RowStyles.Add((New-Object System.Windows.Forms.RowStyle([System.Windows.Forms.SizeType]::Absolute, 40)))
$statusTlp.RowStyles.Add((New-Object System.Windows.Forms.RowStyle([System.Windows.Forms.SizeType]::Percent, 100)))
$panelStatus.Controls.Add($statusTlp)

$labelStatusTitle = New-Object System.Windows.Forms.Label
$labelStatusTitle.Text = "OPERATION STATUS"
$labelStatusTitle.Dock = [System.Windows.Forms.DockStyle]::Fill
$labelStatusTitle.Font = $fontHeader
$labelStatusTitle.ForeColor = $colorBorder
$labelStatusTitle.TextAlign = [System.Drawing.ContentAlignment]::MiddleLeft
$statusTlp.Controls.Add($labelStatusTitle, 0, 0)

$textboxStatus = New-Object System.Windows.Forms.RichTextBox
$textboxStatus.Dock = [System.Windows.Forms.DockStyle]::Fill
$textboxStatus.Font = $fontMono
$textboxStatus.BackColor = $colorBackground
$textboxStatus.ForeColor = $colorText
$textboxStatus.BorderStyle = [System.Windows.Forms.BorderStyle]::FixedSingle
$textboxStatus.ReadOnly = $true
$textboxStatus.Multiline = $true
$textboxStatus.ScrollBars = [System.Windows.Forms.RichTextBoxScrollBars]::Vertical
$textboxStatus.WordWrap = $false
$textboxStatus.DetectUrls = $false
$textboxStatus.HideSelection = $false
$statusTlp.Controls.Add($textboxStatus, 0, 1)

$root.Controls.Add($panelStatus, 0, 2)

# ----------------------------
# Buttons Panel
# ----------------------------
$panelButtons = New-Object System.Windows.Forms.Panel
$panelButtons.Dock = [System.Windows.Forms.DockStyle]::Fill
$panelButtons.BackColor = $colorPanelLight
$panelButtons.BorderStyle = [System.Windows.Forms.BorderStyle]::FixedSingle
$panelButtons.Margin = New-Object System.Windows.Forms.Padding(0)
$panelButtons.Padding = New-Object System.Windows.Forms.Padding(16)

$buttonsTlp = New-Object System.Windows.Forms.TableLayoutPanel
$buttonsTlp.Dock = [System.Windows.Forms.DockStyle]::Fill
$buttonsTlp.BackColor = $colorPanelLight
$buttonsTlp.RowCount = 1
$buttonsTlp.ColumnCount = 5
$buttonsTlp.RowStyles.Add((New-Object System.Windows.Forms.RowStyle([System.Windows.Forms.SizeType]::Percent, 100)))
$buttonsTlp.ColumnStyles.Add((New-Object System.Windows.Forms.ColumnStyle([System.Windows.Forms.SizeType]::Percent, 50)))
$buttonsTlp.ColumnStyles.Add((New-Object System.Windows.Forms.ColumnStyle([System.Windows.Forms.SizeType]::Absolute, 420)))
$buttonsTlp.ColumnStyles.Add((New-Object System.Windows.Forms.ColumnStyle([System.Windows.Forms.SizeType]::Absolute, 36)))
$buttonsTlp.ColumnStyles.Add((New-Object System.Windows.Forms.ColumnStyle([System.Windows.Forms.SizeType]::Absolute, 240)))
$buttonsTlp.ColumnStyles.Add((New-Object System.Windows.Forms.ColumnStyle([System.Windows.Forms.SizeType]::Percent, 50)))
$panelButtons.Controls.Add($buttonsTlp)

$buttonCombine = New-Object System.Windows.Forms.Button
$buttonCombine.Text = "⚡ ENGAGE COMBINING ⚡"
$buttonCombine.Dock = [System.Windows.Forms.DockStyle]::Fill
$buttonCombine.Font = $fontButton
$buttonCombine.BackColor = $colorButton
$buttonCombine.ForeColor = $colorSuccess
$buttonCombine.FlatStyle = [System.Windows.Forms.FlatStyle]::Flat
$buttonCombine.FlatAppearance.BorderColor = $colorSuccess
$buttonCombine.FlatAppearance.BorderSize = 2
$buttonCombine.Cursor = [System.Windows.Forms.Cursors]::Hand
$buttonCombine.Enabled = $false
$buttonsTlp.Controls.Add($buttonCombine, 1, 0)

$buttonExit = New-Object System.Windows.Forms.Button
$buttonExit.Text = "EXIT"
$buttonExit.Dock = [System.Windows.Forms.DockStyle]::Fill
$buttonExit.Font = $fontButton
$buttonExit.BackColor = $colorButton
$buttonExit.ForeColor = $colorText
$buttonExit.FlatStyle = [System.Windows.Forms.FlatStyle]::Flat
$buttonExit.FlatAppearance.BorderColor = $colorBorder
$buttonExit.FlatAppearance.BorderSize = 2
$buttonExit.Cursor = [System.Windows.Forms.Cursors]::Hand
$buttonsTlp.Controls.Add($buttonExit, 3, 0)

$root.Controls.Add($panelButtons, 0, 3)

# ----------------------------
# Status message helper
# ----------------------------
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
        "Error"   { $colorMsg = $colorError }
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

# ----------------------------
# Events
# ----------------------------
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

$buttonCombine.Add_Click({
    if ([string]::IsNullOrWhiteSpace($textboxFolder.Text)) {
        Add-StatusMessage "ERROR: No source directory selected!" "Error"
        [System.Windows.Forms.MessageBox]::Show(
            "Please select a source directory first.",
            "No Directory Selected",
            [System.Windows.Forms.MessageBoxButtons]::OK,
            [System.Windows.Forms.MessageBoxIcon]::Warning
        ) | Out-Null
        return
    }

    $sourceFolder = $textboxFolder.Text

    $buttonCombine.Enabled = $false
    $buttonBrowse.Enabled  = $false

    try {
        Add-StatusMessage "═══════════════════════════════════════════" "Info"
        Add-StatusMessage "INITIATING CSV COMBINATION SEQUENCE" "Info"
        Add-StatusMessage "═══════════════════════════════════════════" "Info"

        if (-not (Test-Path -Path $sourceFolder -PathType Container)) {
            throw "Source folder does not exist or is not accessible: $sourceFolder"
        }

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
            ) | Out-Null
            return
        }

        Add-StatusMessage "Found $($csvFiles.Count) CSV file(s) to process" "Success"

        $outputFile = Join-Path -Path $sourceFolder -ChildPath "Patching Report Export.csv"
        $fileExists = Test-Path -Path $outputFile

        $allData = @()
        $headerRow = $null

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

        foreach ($csvFile in $csvFiles) {
            Add-StatusMessage "Processing: $($csvFile.Name)..." "Info"
            try {
                $csvData = Import-Csv -Path $csvFile.FullName

                if ($csvData) {
                    $properties = ($csvData[0].PSObject.Properties | Select-Object -First 10).Name
                    if (-not $headerRow) { $headerRow = $properties }

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
            ) | Out-Null
            return
        }

        Add-StatusMessage "Total rows collected: $($allData.Count)" "Info"
        Add-StatusMessage "Removing duplicates (same server + KB)..." "Info"

        $serverColumn = $null
        $kbColumn = $null
        $dateColumn = $null

        $serverPatterns = @("Server", "ServerName", "ComputerName", "Computer", "Hostname", "Host", "Name")
        foreach ($pattern in $serverPatterns) {
            $found = $headerRow | Where-Object { $_ -like "*$pattern*" } | Select-Object -First 1
            if ($found) { $serverColumn = $found; break }
        }

        $kbPatterns = @("KB", "HotfixID", "UpdateID", "Patch", "Update")
        foreach ($pattern in $kbPatterns) {
            $found = $headerRow | Where-Object { $_ -like "*$pattern*" } | Select-Object -First 1
            if ($found) { $kbColumn = $found; break }
        }

        $datePatterns = @("Date", "Time", "Timestamp", "DateTime", "Installed", "InstallDate", "ScanDate", "LastUpdate")
        foreach ($pattern in $datePatterns) {
            $found = $headerRow | Where-Object { $_ -like "*$pattern*" } | Select-Object -First 1
            if ($found) { $dateColumn = $found; break }
        }

        if ($serverColumn -and $kbColumn) {
            Add-StatusMessage "Deduplication keys: Server='$serverColumn', KB='$kbColumn'" "Info"
            $grouped = $allData | Group-Object -Property @{Expression={"{0}|{1}" -f $_.$serverColumn, $_.$kbColumn}}

            $dedupedData = @()
            $duplicatesRemoved = 0

            foreach ($group in $grouped) {
                if ($group.Count -gt 1) {
                    $duplicatesRemoved += ($group.Count - 1)

                    if ($dateColumn) {
                        $latest = $group.Group | Sort-Object {
                            try { [DateTime]$_.$dateColumn } catch { [DateTime]::MinValue }
                        } -Descending | Select-Object -First 1
                        $dedupedData += $latest
                    }
                    else {
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
        Add-StatusMessage "Exporting to: $outputFile..." "Info"

        try {
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
            ) | Out-Null
        }
        catch {
            $exportError = "Failed to write output file: $($_.Exception.Message)"
            Add-StatusMessage "ERROR: $exportError" "Error"
            [System.Windows.Forms.MessageBox]::Show(
                $exportError,
                "Export Error",
                [System.Windows.Forms.MessageBoxButtons]::OK,
                [System.Windows.Forms.MessageBoxIcon]::Error
            ) | Out-Null
        }
    }
    catch {
        $generalError = "An error occurred: $($_.Exception.Message)"
        Add-StatusMessage "═══════════════════════════════════════════" "Error"
        Add-StatusMessage "OPERATION FAILED!" "Error"
        Add-StatusMessage "Error: $($_.Exception.Message)" "Error"
        Add-StatusMessage "═══════════════════════════════════════════" "Error"

        [System.Windows.Forms.MessageBox]::Show(
            $generalError,
            "Error",
            [System.Windows.Forms.MessageBoxButtons]::OK,
            [System.Windows.Forms.MessageBoxIcon]::Error
        ) | Out-Null
    }
    finally {
        $buttonCombine.Enabled = $true
        $buttonBrowse.Enabled  = $true
    }
})

$buttonExit.Add_Click({ $form.Close() })

# Initial status message
Add-StatusMessage "System initialized and ready" "Success"
Add-StatusMessage "Select a source directory to begin operations" "Info"

[void]$form.ShowDialog()
$form.Dispose()
