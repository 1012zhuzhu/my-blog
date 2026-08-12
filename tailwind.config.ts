import typography from '@tailwindcss/typography'
import type { Config } from 'tailwindcss'

export default {
  darkMode: 'class',
  content: ['./app/**/*.{ts,tsx}', './components/**/*.{ts,tsx}'],
  plugins: [
    typography({
      themes: {
        jelly: {
          css: {
            /* ===== 基础色彩变量 ===== */
            '--tw-prose-body': '#334155',
            '--tw-prose-headings': '#0f172a',
            '--tw-prose-links': '#6366f1',
            '--tw-prose-bold': '#0f172a',
            '--tw-prose-quotes': '#64748b',
            '--tw-prose-quote-borders': '#6366f1',
            '--tw-prose-code': '#6366f1',
            '--tw-prose-pre-bg': '#282c34',
            '--tw-prose-pre-code': '#abb2bf',
            '--tw-prose-th-borders': '#cbd5e1',
            '--tw-prose-td-borders': '#e2e8f0',

            /* ===== 暗黑模式变量 ===== */
            '--tw-prose-invert-body': '#cbd5e1',
            '--tw-prose-invert-headings': '#f8fafc',
            '--tw-prose-invert-links': '#818cf8',
            '--tw-prose-invert-code': '#818cf8',
            '--tw-prose-invert-quote-borders': '#818cf8',
            '--tw-prose-invert-pre-bg': '#1e1e2e',

            /* ===== 标题 ===== */
            h1: {
              fontSize: 'clamp(1.8rem, 5vw, 3rem)',
              fontWeight: '900',
              lineHeight: '1.2',
              marginTop: '2rem',
              marginBottom: '1.2rem',
            },
            h2: {
              fontSize: 'clamp(1.5rem, 4vw, 2.2rem)',
              fontWeight: '800',
              marginTop: '1.5rem',
              marginBottom: '1rem',
            },
            h3: {
              fontSize: 'clamp(1.2rem, 3vw, 1.5rem)',
              fontWeight: '700',
              marginBottom: '0.8rem',
            },

            /* ===== 正文 ===== */
            p: {
              fontSize: 'clamp(0.95rem, 2vw, 1.15rem)',
              lineHeight: '1.8',
            },

            /* ===== 列表 ===== */
            ul: {
              listStyleType: 'disc',
              paddingLeft: '1.5rem',
              fontSize: 'clamp(0.95rem, 2vw, 1.1rem)',

              ul: {
                listStyleType: 'circle',
                marginTop: '0.25rem',
                marginBottom: '0.25rem',
              },
              ol: {
                listStyleType: 'lower-alpha',
                marginTop: '0.25rem',
                marginBottom: '0.25rem',
              },
            },
            ol: {
              listStyleType: 'decimal',
              paddingLeft: '1.5rem',
              fontSize: 'clamp(0.95rem, 2vw, 1.1rem)',
            },
            li: {
              marginBottom: '0.5rem',
            },

            /* ===== 链接 ===== */
            a: {
              color: '#6366f1',
              fontWeight: '600',
              textDecoration: 'none',
              borderBottom: '1px dashed #6366f1',
              transition: 'all 0.3s ease',

              '&:hover': {
                color: '#4f46e5',
                borderBottomStyle: 'solid',
                background: 'rgba(99,102,241,0.1)',
                padding: '0 0.2rem',
                borderRadius: '0.2rem',
              },
            },

            /* ===== 删除线 ===== */
            's, del': {
              textDecorationLine: 'line-through',
              opacity: '0.6',
            },

            /* ===== 强制 br 高度 ===== */
            br: {
              display: 'block',
              content: '""',
              marginTop: '0.5em',
            },

            /* ===== 果冻引用块（✅ 彻底干掉引号） ===== */
            blockquote: {
              borderLeftWidth: '4px',
              borderLeftColor: 'var(--tw-prose-quote-borders)',
              background: 'rgba(99,102,241,0.05)',
              borderRadius: '0 1.25rem 1.25rem 0',
              fontStyle: 'italic',
              padding: '1rem 1.5rem',
              margin: '1.5rem 0',
              color: '#64748b',

              p: {
                margin: 0,
                color: 'inherit',

                '&::before, &::after': {
                  content: 'none',
                  display: 'none',
                },
              },
            },

            /* ===== 代码块 ===== */
            pre: {
              background: '#282c34',
              color: '#abb2bf',
              padding: '1rem',
              borderRadius: '1.25rem',
              overflowX: 'auto',
              boxShadow: 'inset 0 0 10px rgba(0,0,0,0.3)',
              margin: '1.5rem 0',
            },
            'pre code': {
              background: 'transparent',
              padding: 0,
              fontSize: '0.85em',
              fontFamily:
                'ui-rounded, Quicksand, Nunito, JetBrains Mono, Fira Code, Cascadia Code, Source Code Pro, Menlo, Monaco, Consolas, monospace',
              fontVariantLigatures: 'contextual',
              fontWeight: '500',
              letterSpacing: '0.02em',
            },

            /* ===== 行内代码 ===== */
            'p code, li code': {
              background: 'rgba(99,102,241,0.1)',
              color: '#6366f1',
              padding: '0.2rem 0.4rem',
              borderRadius: '0.5rem',
              fontSize: '0.85em',
              fontFamily:
                'ui-rounded, Quicksand, Nunito, JetBrains Mono, Fira Code, Cascadia Code, Source Code Pro, Menlo, Monaco, Consolas, monospace',
            },

            /* ===== 图片 ===== */
            img: {
              display: 'block',
              margin: '1.5rem auto',
              borderRadius: '1.5rem',
              boxShadow: '0 10px 40px rgba(0,0,0,0.12)',
              maxWidth: '100%',
              height: 'auto',
            },

            /* ===== 暗黑模式补丁 ===== */
            '.dark &': {
              '--tw-prose-body': '#cbd5e1',
              '--tw-prose-headings': '#f8fafc',
              '--tw-prose-links': '#818cf8',
              '--tw-prose-code': '#818cf8',
              '--tw-prose-quote-borders': '#818cf8',

              a: {
                color: '#818cf8',
                borderBottomColor: '#818cf8',

                '&:hover': {
                  color: '#a5b4fc',
                  background: 'rgba(129,140,248,0.15)',
                },
              },

              blockquote: {
                background: 'rgba(129,140,248,0.1)',
                color: '#94a3b8',
              },

              'p code, li code': {
                background: 'rgba(99,102,241,0.2)',
                color: '#818cf8',
              },
            },
          },
        },
      },
    }),
  ],
} satisfies Config