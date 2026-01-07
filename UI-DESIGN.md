# Star Trek UI Theme - Visual Description

## 🎨 User Interface Design

The Patching Report Combiner features a **Star Trek: Deep Space Nine / Voyager** inspired dark glass aesthetic with LCARS-style design elements.

### Color Scheme

```
Background:      Deep Space Blue-Black (#0F1423)
Panels:          Dark Glass Blue (#192337)
Panel Accents:   Lighter Glass (#233E4B)
Borders:         LCARS Blue (#6496FF)
Text:            Light Blue (#C8DCFF)
Accent Text:     Bright Blue (#96C8FF)
Buttons:         Dark Blue-Gray (#283C5F)
Success:         Green (#64FF96)
Warning:         Amber (#FFB464)
```

### Main Window (800x600 pixels)

```
┌─────────────────────────────────────────────────────────────────────┐
│                                                                     │
│          ⭐ PATCHING REPORT COMBINER ⭐                             │
│         CSV CONSOLIDATION SYSTEM v1.0                               │
│                                                                     │
│  ┌───────────────────────────────────────────────────────────────┐ │
│  │ SOURCE DIRECTORY                                              │ │
│  │                                                               │ │
│  │ [Selected folder path appears here................] [BROWSE] │ │
│  │                                                               │ │
│  └───────────────────────────────────────────────────────────────┘ │
│                                                                     │
│  ┌───────────────────────────────────────────────────────────────┐ │
│  │ OPERATION STATUS                                              │ │
│  │ ┌───────────────────────────────────────────────────────────┐ │ │
│  │ │ [HH:MM:SS] System initialized and ready                   │ │ │
│  │ │ [HH:MM:SS] Select a source directory to begin operations  │ │ │
│  │ │                                                            │ │ │
│  │ │ Status messages appear here in real-time with:            │ │ │
│  │ │ - Timestamp for each message                              │ │ │
│  │ │ - Color coding (Green=Success, Amber=Warning, Red=Error)  │ │ │
│  │ │ - Scrollable text area                                    │ │ │
│  │ │                                                            │ │ │
│  │ └───────────────────────────────────────────────────────────┘ │ │
│  └───────────────────────────────────────────────────────────────┘ │
│                                                                     │
│  ┌───────────────────────────────────────────────────────────────┐ │
│  │                                                               │ │
│  │         [⚡ ENGAGE COMBINING ⚡]        [EXIT]               │ │
│  │                                                               │ │
│  └───────────────────────────────────────────────────────────────┘ │
│                                                                     │
└─────────────────────────────────────────────────────────────────────┘
```

### UI Elements

#### 1. Title Section
- **Main Title**: "⭐ PATCHING REPORT COMBINER ⭐"
  - Font: Segoe UI, 16pt Bold
  - Color: Bright Blue (#96C8FF)
  - Alignment: Center
  
- **Subtitle**: "CSV CONSOLIDATION SYSTEM v1.0"
  - Font: Segoe UI, 10pt Regular
  - Color: Light Blue (#C8DCFF)
  - Alignment: Center

#### 2. Source Directory Panel
- Dark glass panel with LCARS blue border
- Header: "SOURCE DIRECTORY"
  - Font: Segoe UI, 12pt Bold
  - Color: LCARS Blue (#6496FF)
  
- Text Box: Displays selected folder path
  - Read-only
  - Dark background with light blue text
  - Fixed single-line border
  
- Browse Button: "BROWSE..."
  - Font: Segoe UI, 11pt Bold
  - Colors: Dark blue background, light blue text
  - Flat style with 2px LCARS blue border
  - Hand cursor on hover

#### 3. Operation Status Panel
- Large dark glass panel for status messages
- Header: "OPERATION STATUS"
  - Font: Segoe UI, 12pt Bold
  - Color: LCARS Blue (#6496FF)
  
- Rich Text Box:
  - Scrollable vertical scrollbar
  - Dark background with light blue default text
  - Color-coded messages:
    - Timestamps: Bright blue accent
    - Success: Green
    - Warnings: Amber
    - Errors: Red
  - Auto-scrolls to show latest messages

#### 4. Action Buttons Panel
- Bottom panel with lighter glass background
- Two main buttons:
  
  **Engage Combining Button**:
  - Text: "⚡ ENGAGE COMBINING ⚡"
  - Font: Segoe UI, 11pt Bold
  - Colors: Dark background, success green text
  - Green border (2px)
  - Disabled until folder is selected
  - Hand cursor when enabled
  
  **Exit Button**:
  - Text: "EXIT"
  - Font: Segoe UI, 11pt Bold
  - Colors: Dark background, light blue text
  - LCARS blue border (2px)
  - Always enabled
  - Hand cursor on hover

### Visual Effects

1. **Panels**: All panels have a subtle depth with dark glass appearance
2. **Borders**: LCARS-inspired blue borders (2px solid)
3. **Typography**: Clean, modern Segoe UI font family
4. **Spacing**: Generous padding and margins for readability
5. **Buttons**: Flat style with borders, hover-responsive (cursor changes)

### Status Message Examples

```
[08:36:15] System initialized and ready
[08:36:22] Source directory selected: C:\PatchingReports\January
[08:36:25] ═══════════════════════════════════════════
[08:36:25] INITIATING CSV COMBINATION SEQUENCE
[08:36:25] ═══════════════════════════════════════════
[08:36:25] Scanning directory for CSV files...
[08:36:25] Found 5 CSV file(s) to process
[08:36:26] Processing: scan1.csv...
[08:36:26]   → Added 45 rows from scan1.csv
[08:36:26] Processing: scan2.csv...
[08:36:26]   → Added 38 rows from scan2.csv
[08:36:27] Total rows collected: 215
[08:36:27] Removing duplicates (same server + KB)...
[08:36:27] Deduplication keys: Server='ServerName', KB='KB'
[08:36:27] Removed 12 duplicate entries
[08:36:27] Final row count: 203
[08:36:28] Exporting to: C:\PatchingReports\January\Patching Report Export.csv
[08:36:28] ═══════════════════════════════════════════
[08:36:28] OPERATION COMPLETED SUCCESSFULLY!
[08:36:28] ═══════════════════════════════════════════
[08:36:28] Output file: C:\PatchingReports\January\Patching Report Export.csv
[08:36:28] Total entries in report: 203
```

### Dialog Windows

The script uses standard Windows dialog boxes that match the system theme:

1. **Folder Browser Dialog**
   - Title: "Select the folder containing CSV files to combine"
   - Standard Windows folder selection interface

2. **Success Message**
   - Title: "Operation Complete"
   - Icon: Information
   - Shows output file path and entry count

3. **Warning Messages**
   - Title: "No Directory Selected" or "No Files Found"
   - Icon: Warning
   - Helpful guidance text

4. **Error Messages**
   - Title: "Error"
   - Icon: Error
   - Detailed error information

### Security & Safety Features Visible in UI

- **Manual Folder Selection**: Required every time - no automatic folder scanning
- **Read-Only Path Display**: Shows selected path but can't be manually edited
- **Status Transparency**: All operations logged in real-time
- **Safe File Handling**: Status messages confirm no source files are modified
- **Validation Feedback**: Warnings and errors clearly displayed

### Theme Philosophy

The Star Trek-inspired "dark glass" theme represents:
- **Professionalism**: Clean, organized, technical appearance
- **Reliability**: Solid, dependable interface like Starfleet systems
- **Clarity**: High contrast for easy reading
- **Futurism**: Modern, forward-thinking design
- **Trust**: LCARS-style interface suggests tested, reliable technology

This aesthetic makes the tool feel professional and enterprise-ready while being visually appealing and easy to use.
