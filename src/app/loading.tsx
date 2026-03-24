import SkeletonCard from "@/components/SkeletonCard";
import Navbar from "@/components/Navbar";

export default function Loading() {
  return (
    <main className="min-h-screen bg-[#fcfdfe] dark:bg-[#060606]">
      <Navbar />
      
      <div className="max-w-[1440px] mx-auto px-6 pt-10 pb-16">
        <div className="max-w-3xl mb-12 mx-auto text-center space-y-6">
          <div className="h-12 bg-slate-200 dark:bg-white/5 rounded-xl w-3/4 mx-auto animate-pulse" />
          <div className="h-6 bg-slate-200 dark:bg-white/5 rounded-md w-2/3 mx-auto animate-pulse" />
        </div>

        {/* Filter Bar Skeleton */}
        <div className="flex gap-2 mb-12 overflow-hidden animate-pulse">
          {[1, 2, 3, 4, 5, 6, 7, 8].map((i) => (
            <div key={i} className="h-9 w-24 bg-slate-200 dark:bg-white/5 rounded-full shrink-0" />
          ))}
        </div>
        
        <div className="grid grid-cols-1 xl:grid-cols-2 gap-10 mt-12">
          {[1, 2, 3, 4, 5, 6].map((i) => (
            <SkeletonCard key={i} />
          ))}
        </div>
      </div>
    </main>
  );
}
