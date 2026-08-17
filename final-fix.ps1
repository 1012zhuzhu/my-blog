# Vercel 构建修复脚本
# 以管理员身份运行 PowerShell，然后执行

\ = 'E:\xiaoxublog\my-blog'
\ = '\\clean-repo'

Write-Host '=== 1. 清除 .git 权限限制 ==='
icacls '\\.git' /reset /t

Write-Host '=== 2. 解压新 commit 对象 ==='
Get-Content '\\.git\objects\pack\pack-b3b51679451bf88196c35df3bf6059641f1bd388.pack' | git -C '\' unpack-objects
Get-Content '\\.git\objects\pack\pack-b3b51679451bf88196c35df3bf6059641f1bd388.idx' > \

Write-Host '=== 3. 更新 main 分支指向新 commit ==='
'721cbe97d23f80b566be83fdad0740826c7a5208' | Set-Content '\\.git\refs\heads\main' -NoNewline

Write-Host '=== 4. 提交 vercel.json BOM 修复 ==='
git -C '\' add vercel.json
git -C '\' commit -m 'fix: remove BOM from vercel.json'
if (\ -ne 0) { Write-Host '跳过 commit（可能已存在）' }

Write-Host '=== 5. 推送到 GitHub ==='
git -C '\' push origin main
if (\ -eq 0) {
    Write-Host '成功！去 Vercel 刷新页面' -ForegroundColor Green
} else {
    Write-Host '推送失败，请检查 GitHub 凭据' -ForegroundColor Red
}
