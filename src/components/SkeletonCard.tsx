import React from 'react';

export default function SkeletonCard() {
  return (
    <div className="flex flex-col md:flex-row rounded-[16px] border border-border bg-white dark:bg-[#0a0a0a] w-full min-h-[180px] overflow-hidden">
      {/* Image Skeleton */}
      <div className="h-48 md:h-auto md:w-64 shrink-0 bg-slate-100 dark:bg-white/5 border-b md:border-b-0 md:border-r border-border/50 animate-pulse" />
      
      <div className="flex flex-col flex-1 min-w-0">
        {/* Content Skeleton */}
        <div className="flex flex-col p-6 flex-1 justify-center space-y-3">
          <div className="h-6 bg-slate-100 dark:bg-white/5 rounded-md w-3/4 animate-pulse" />
          <div className="space-y-2">
            <div className="h-4 bg-slate-100 dark:bg-white/5 rounded-md w-full animate-pulse" />
            <div className="h-4 bg-slate-100 dark:bg-white/5 rounded-md w-5/6 animate-pulse" />
          </div>
        </div>
        
        {/* Footer Skeleton */}
        <div className="px-6 py-3 bg-[#fcfdfe] dark:bg-[#0d0d0d] border-t border-border/40 flex items-center justify-between">
          <div className="flex gap-2">
            {[1, 2].map((i) => (
              <div key={i} className="h-4 w-12 bg-slate-100 dark:bg-white/5 rounded-full animate-pulse" />
            ))}
          </div>
          <div className="flex -space-x-2">
            {[1, 2, 3].map((i) => (
              <div key={i} className="w-7 h-7 rounded-[8px] border-2 border-white dark:border-[#0d0d0d] bg-slate-100 dark:bg-white/5 animate-pulse" />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
