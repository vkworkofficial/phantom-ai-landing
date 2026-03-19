import { NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

export async function GET() {
    const rootDir = process.cwd();
    const contents = fs.existsSync(rootDir) ? fs.readdirSync(rootDir) : [];
    const srcContents = fs.existsSync(path.join(rootDir, 'src')) ? fs.readdirSync(path.join(rootDir, 'src')) : ['src not found'];
    const appContents = fs.existsSync(path.join(rootDir, 'src/app')) ? fs.readdirSync(path.join(rootDir, 'src/app')) : ['src/app not found'];
    
    return NextResponse.json({
        cwd: rootDir,
        root_contents: contents,
        src_contents: srcContents,
        app_contents: appContents,
        blog_exists: fs.existsSync(path.join(rootDir, 'src/content/blog')),
        monorepo_blog_exists: fs.existsSync(path.join(rootDir, 'apps/dashboard/src/content/blog')),
        env: process.env.VERCEL ? 'VERCEL' : 'LOCAL'
    });
}
