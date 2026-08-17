# 完整修复脚本
$repo = 'E:\xiaoxublog\my-blog'
$bundle = '$repo\push-fix.bundle'
$newCommit = '721cbe97d23f80b566be83fdad0740826c7a5208'

Write-Host '=== 1. 清除 .git 权限 ==='
icacls '$repo\.git' /reset /t

Write-Host '=== 2. 修复 HEAD ==='
'ref: refs/heads/main' | Set-Content '$repo\.git\HEAD' -NoNewline

Write-Host '=== 3. 更新 main 引用 ==='
$newCommit | Set-Content '$repo\.git\refs\heads\main' -NoNewline

Write-Host '=== 4. 解压 bundle 对象 ==='
Get-Content $bundle | git -C $repo unpack-objects

Write-Host '=== 5. 验证 commit ==='
git -C $repo log --oneline -3

Write-Host '=== 6. 提交 vercel.json ==='
git -C $repo add vercel.json
git -C $repo commit -m 'fix: remove BOM from vercel.json'

Write-Host '=== 7. 推送 ==='
git -C $repo push origin main
