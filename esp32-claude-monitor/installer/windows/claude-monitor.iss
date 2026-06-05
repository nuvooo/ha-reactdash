; Inno Setup Skript für den Claude-Monitor-Windows-Installer.
; Bauen auf Windows (oder via wine):  iscc claude-monitor.iss
; Erwartet die Binärdatei unter ..\..\bridge\dist\claude-monitor-win.exe
; (aus  npm run pkg:win ).
;
; Richtet Autostart beim Login über eine Verknüpfung im Autostart-Ordner ein.

#define MyAppName "Claude Monitor"
#define MyAppVersion "0.2.0"
#define MyAppExe "claude-monitor.exe"

[Setup]
AppName={#MyAppName}
AppVersion={#MyAppVersion}
DefaultDirName={autopf}\ClaudeMonitor
DefaultGroupName={#MyAppName}
DisableProgramGroupPage=yes
OutputBaseFilename=claude-monitor-setup
Compression=lzma2
SolidCompression=yes
PrivilegesRequired=lowest
ArchitecturesAllowed=x64compatible
ArchitecturesInstallIn64BitMode=x64compatible

[Files]
Source: "..\..\bridge\dist\claude-monitor-win.exe"; DestDir: "{app}"; DestName: "{#MyAppExe}"; Flags: ignoreversion

[Icons]
; Autostart beim Login:
Name: "{userstartup}\{#MyAppName}"; Filename: "{app}\{#MyAppExe}"
; Startmenü-Eintrag:
Name: "{group}\{#MyAppName}"; Filename: "{app}\{#MyAppExe}"

[Run]
; Direkt nach der Installation starten (öffnet den Editor im Browser):
Filename: "{app}\{#MyAppExe}"; Description: "Claude Monitor jetzt starten"; Flags: nowait postinstall skipifsilent
