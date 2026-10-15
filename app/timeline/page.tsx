import Navbar from "../../components/Navbar";
import PageTransition from "../../components/PageTransition";
import TimelineClient from "../../components/TimelineClient";
import path from "path";
import fs from "fs";
import matter from "gray-matter";
import { siteConfig } from "@/siteConfig";

export const metadata = {
  title: "归档",
};

function formatDate(dateStr: string) {
  if (!dateStr || dateStr === '1970-01-01') return '1970-01-01 00:00';
  try {
    const d = new Date(dateStr);
    if (isNaN(d.getTime())) return dateStr;
    const pad = (n: number) => String(n).padStart(2, '0');
    return `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())} ${pad(d.getHours())}:${pad(d.getMinutes())}`;
  } catch {
    return dateStr;
  }
}

export default function TimelinePage() {
  const postDirectory = path.join(process.cwd(), 'posts');
  let posts: any[] = [];
  const tagMap: Record<string, number> = {};

  try {
    if (fs.existsSync(postDirectory)) {
      const files = fs.readdirSync(postDirectory).filter(file => file.endsWith('.md'));
      posts = files.map(file => {
        const fullPath = path.join(postDirectory, file);
        const { data } = matter(fs.readFileSync(fullPath, 'utf-8'));
        const tags = data.tags && Array.isArray(data.tags) ? data.tags : [];

        tags.forEach((tag: string) => {
          tagMap[tag] = (tagMap[tag] || 0) + 1;
        });

        return {
          slug: file.replace(/\.md$/, ''),
          title: data.title || '无标题',
          description: data.description || '',
          date: formatDate(data.date),
          cover: data.cover || siteConfig.defaultPostCover,
          tags,
        };
      }).sort((a, b) => {
        const ta = new Date(a.date).getTime();
        const tb = new Date(b.date).getTime();
        return tb - ta;
      });
    }
  } catch (err: unknown) {
    console.log('读取归档文章失败', (err as Error).message);
  }

  const tags = Object.entries(tagMap)
    .map(([name, count]) => ({ name, count }))
    .sort((a, b) => b.count - a.count);

  return (
    <div className="min-h-screen relative pb-20">
      <Navbar />
      <PageTransition>
        <TimelineClient posts={posts} tags={tags} />
      </PageTransition>
    </div>
  );
}
