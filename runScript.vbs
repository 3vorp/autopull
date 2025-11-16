Dim fso, currentDir, WshShell

' Get the directory of the current script
Set fso = CreateObject("Scripting.FileSystemObject")
currentDir = fso.GetParentFolderName(WScript.ScriptFullName)

' Run the Node.js script in a hidden command prompt
Set WshShell = CreateObject("WScript.Shell")
WshShell.Run "cmd /K cd /d """ & currentDir & """ && node index.js", 0, False
