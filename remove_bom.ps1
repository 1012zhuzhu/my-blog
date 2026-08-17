[System.IO.File]::WriteAllBytes('E:\xiaoxublog\my-blog\clean-repo\vercel.json', [System.Text.Encoding]::UTF8.GetBytes((Get-Content 'E:\xiaoxublog\my-blog\clean-repo\vercel.json' -Raw)))
