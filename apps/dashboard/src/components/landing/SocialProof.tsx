"use client";

import React from "react";

const REDDIT_COMMENTS = [
  { user: "danielmtl", sub: "r/startups", text: "We posted everywhere — Reddit, Indie Hackers, Product Hunt. Got 200 signups. Exactly 6 people actually used the product. Two of them were my co-founder's mom.", upvotes: 1847, time: "2 years ago" },
  { user: "jmhacks_", sub: "r/SaaS", text: "Beta testing is the tax you pay for building in a vacuum. We recruited 50 testers, 4 gave feedback, and 3 said 'looks nice'. We shipped a broken auth flow to 2000 real users a week later.", upvotes: 2312, time: "1 year ago" },
  { user: "rachelnguyen92", sub: "r/QualityAssurance", text: "Manual QA is the single biggest bottleneck in our release cycle. We ship code in hours but testing every edge case takes literal days. Nobody wants to admit it but most startups just... don't test.", upvotes: 3891, time: "8 months ago" },
  { user: "alexk_dev", sub: "r/startups", text: "I'm so tired of tweeting 'looking for beta testers!' into the void. Everyone ignores it. The people who DO sign up never open the app. Is there literally any way to automate this?", upvotes: 1104, time: "3 years ago" },
  { user: "supriya_builds", sub: "r/Entrepreneur", text: "The silence after launching is genuinely terrifying. You have no idea if users hate it, can't figure it out, or just never came back after signup. We needed 100 testers and got 0 useful reports.", upvotes: 688, time: "1 month ago" },
];

interface RC { user: string; time: string; upvotes: number; text: string; sub: string; }

export function GitHubIssueCard({ comment }: { comment: RC }) {
  return (
    <div className="block w-[420px] shrink-0 outline-none group px-2">
      <div className="rounded-md border border-[#30363d] bg-[#161b22] text-left transition-all duration-300 group-hover:border-primary/40 group-hover:shadow-[0_0_20px_-5px_rgba(234,88,12,0.2)]">
        <div className="px-3 py-2 border-b border-[#30363d] bg-[#161b22] flex items-center justify-between rounded-t-md group-hover:border-primary/20 transition-colors duration-300">
          <div className="flex items-center gap-2">
            <svg className="text-primary shrink-0" viewBox="0 0 16 16" width="16" height="16"><path fill="currentColor" d="M8 9.5a1.5 1.5 0 100-3 1.5 1.5 0 000 3z" /><path fill="currentColor" fillRule="evenodd" d="M8 0a8 8 0 100 16A8 8 0 008 0zM1.5 8a6.5 6.5 0 1113 0 6.5 6.5 0 01-13 0z" /></svg>
            <span className="text-xs font-semibold text-[#c9d1d9] max-w-[160px] truncate">{comment.user}</span><span className="text-xs text-[#484f58]">{comment.sub}</span><span className="text-xs text-[#484f58]">•</span><span className="text-xs text-[#484f58]">{comment.time}</span>
          </div>
          <span className="text-xs text-primary border border-primary/20 bg-primary/5 px-1.5 py-0.5 rounded flex gap-1 items-center font-mono font-medium">▲ {comment.upvotes}</span>
        </div>
        <div className="p-3 text-[13px] text-[#c9d1d9] leading-relaxed bg-[#0d1117] rounded-b-md line-clamp-3">{comment.text}</div>
      </div>
    </div>
  );
}

export function IssueSlider() {
  return (
    <div className="w-full relative overflow-hidden py-12 border-y border-[#30363d] shrink-0 bg-[#0d1117]">
      <div className="absolute left-0 top-0 bottom-0 w-8 md:w-32 bg-gradient-to-r from-[#0d1117] to-transparent z-10 pointer-events-none" />
      <div className="absolute right-0 top-0 bottom-0 w-8 md:w-32 bg-gradient-to-l from-[#0d1117] to-transparent z-10 pointer-events-none" />
      <div className="flex w-[200vw] sm:w-[150vw] xl:w-[100vw]">
        <div className="flex animate-[scroll_45s_linear_infinite] w-full items-center gap-0 pr-4 hover:[animation-play-state:paused]">
          {[...REDDIT_COMMENTS, ...REDDIT_COMMENTS, ...REDDIT_COMMENTS].map((c, i) => <GitHubIssueCard key={i} comment={c} />)}
        </div>
      </div>
    </div>
  );
}
