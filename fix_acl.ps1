$path = "E:\xiaoxublog\my-blog\.git"
$acl = Get-Acl $path
$denied = $acl.Access | Where-Object { $_.AccessControlType -eq "Deny" }
if ($denied) {
    foreach ($ace in $denied) {
        $acl.RemoveAccessRule($ace) | Out-Null
    }
    Set-Acl $path $acl
    Write-Host "Removed Deny ACEs"
} else {
    Write-Host "No Deny ACEs"
}
