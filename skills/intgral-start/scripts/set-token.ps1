# Saves an Intgral MCP access token without it passing through the chat (INT-1010).
# The user pastes the token into a local hidden-input window; it is checked against the
# gateway and only then stored as a user environment variable. Output never contains it.
# Usage: powershell -NoProfile -ExecutionPolicy Bypass -File set-token.ps1 -Url <MCP address>
# Saved as UTF-8 with BOM: Windows PowerShell 5.1 misreads the Chinese text otherwise.
param([string]$Url, [string]$VarName = 'INTGRAL_MCP_TOKEN')

function Read-IntgralTokenWindow {
  Add-Type -AssemblyName System.Windows.Forms
  $form = New-Object Windows.Forms.Form -Property @{ Text = 'Intgral 访问令牌'; Width = 440; Height = 170; StartPosition = 'CenterScreen'; TopMost = $true; FormBorderStyle = 'FixedDialog'; MaximizeBox = $false; MinimizeBox = $false }
  $label = New-Object Windows.Forms.Label -Property @{ Text = '请粘贴 Intgral 团队发给你的访问令牌：'; Left = 12; Top = 12; Width = 400 }
  $box = New-Object Windows.Forms.TextBox -Property @{ Left = 12; Top = 40; Width = 400; UseSystemPasswordChar = $true }
  $ok = New-Object Windows.Forms.Button -Property @{ Text = '保存'; Left = 256; Top = 80; Width = 75; DialogResult = 'OK' }
  $cancel = New-Object Windows.Forms.Button -Property @{ Text = '取消'; Left = 337; Top = 80; Width = 75; DialogResult = 'Cancel' }
  $form.Controls.AddRange(@($label, $box, $ok, $cancel)); $form.AcceptButton = $ok; $form.CancelButton = $cancel
  if ($form.ShowDialog() -eq 'OK') { $box.Text } else { $null }
}

# Accepts a bare token or one "identity=token" entry; refuses a whole MCP_ACCESS_TOKENS line.
function Resolve-IntgralToken([string]$Raw) {
  $token = "$Raw".Trim()
  if ($token -match '^[A-Za-z0-9._-]+=([^,=\s]+)$') { $token = $Matches[1] }
  if (-not $token) { return @{ Token = $null; Problem = 'no token was entered' } }
  if ($token -match '[,=\s]') { return @{ Token = $null; Problem = 'that is not a single token' } }
  @{ Token = $token; Problem = $null }
}

# The MCP initialize call the client will make; returns the HTTP status (0 = unreachable).
function Test-IntgralToken([string]$Url, [string]$Token) {
  $body = '{"jsonrpc":"2.0","id":1,"method":"initialize","params":{"protocolVersion":"2025-03-26","capabilities":{},"clientInfo":{"name":"intgral-token-setup","version":"1"}}}'
  try {
    [int](Invoke-WebRequest -UseBasicParsing -Method Post -Uri $Url -ContentType 'application/json' -Body $body -TimeoutSec 30 -Headers @{ Authorization = "Bearer $Token"; Accept = 'application/json, text/event-stream' }).StatusCode
  } catch {
    if ($_.Exception.Response) { [int]$_.Exception.Response.StatusCode } else { 0 }
  }
}

function Invoke-IntgralTokenSetup([string]$Url, [string]$VarName = 'INTGRAL_MCP_TOKEN', [string]$Scope = 'User', [scriptblock]$Prompt = { Read-IntgralTokenWindow }) {
  if (-not $Url) { return @{ Saved = $false; Message = 'missing -Url (the Intgral MCP address); nothing saved' } }
  $raw = & $Prompt
  if ($null -eq $raw) { return @{ Saved = $false; Message = 'the window was closed; nothing saved' } }
  $resolved = Resolve-IntgralToken $raw
  if ($resolved.Problem) { return @{ Saved = $false; Message = "$($resolved.Problem); nothing saved" } }
  $status = Test-IntgralToken $Url $resolved.Token
  if ($status -ne 200) { return @{ Saved = $false; Message = "the gateway did not accept the token (HTTP $status); nothing saved" } }
  [Environment]::SetEnvironmentVariable($VarName, $resolved.Token, $Scope)
  if ($Scope -eq 'Process') { Set-Item "env:$VarName" $resolved.Token }
  @{ Saved = $true; Message = "saved $VarName (length $($resolved.Token.Length)); restart the client to use it" }
}

if ($MyInvocation.InvocationName -ne '.') {
  $result = Invoke-IntgralTokenSetup -Url $Url -VarName $VarName
  $result.Message
  if (-not $result.Saved) { exit 1 }
}
