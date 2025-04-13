import { ModeToggle } from "../ui/mode-toggle";
import { Search, BookOpen } from "lucide-react";
import { useLocation, useNavigate } from "react-router-dom";
import { useTheme } from "../theme-provider";
import { useBlogContext } from "@/context/BlogContext";
import { useState } from "react";

import {
  Sidebar,
  SidebarFooter
} from "@/components/ui/sidebar"
import { Button } from "../ui/button";

type Blog = {
  id: string;
  title: string;
  createdAt: string;
};

export function AppSidebar() {
  const [searchQuery, setSearchQuery] = useState("");
  const location = useLocation();
  const navigate = useNavigate();
  const { theme } = useTheme();
  const { logout, blogs, isAuthenticated, hasChannelAccess } = useBlogContext();
  
  // Filter blogs based on search query
  const filteredBlogs = blogs.filter((blog) => 
    blog.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // Handle blog item click - now just navigate to the post directly
  // Login will be rendered inline if needed
  const handleBlogClick = (blogId: string, event: React.MouseEvent) => {
    event.preventDefault();
    navigate(`/post/${blogId}`);
  };

  // Handle logout
  const handleLogout = () => {
    logout();
    navigate('/post/1');
  };

  const isDark = theme === 'dark' || (theme === 'system' && window.matchMedia('(prefers-color-scheme: dark)').matches);
  
  // Theme-aware styles
  const sidebarBgClass = isDark ? "bg-[#121726]" : "bg-white";
  const headerBgClass = isDark ? "bg-purple-700" : "bg-purple-600";
  const borderClass = isDark ? "border-slate-800" : "border-slate-200";
  const textClass = isDark ? "text-slate-200" : "text-slate-900";
  const mutedTextClass = isDark ? "text-slate-400" : "text-slate-500";
  const searchBgClass = isDark ? "bg-[#0D1320]" : "bg-slate-100";
  const activeBgClass = isDark ? "bg-[#1E293B]" : "bg-purple-50";
  const hoverBgClass = isDark ? "hover:bg-[#1E293B]" : "hover:bg-slate-100";
  const activeTextClass = isDark ? "text-white" : "text-purple-900";
  const activeBorderClass = "border-purple-500";
  const iconBgClass = isDark ? "bg-white text-purple-700" : "bg-purple-100 text-purple-700";
  
  return (
    <Sidebar side="left" variant="sidebar" className={`border-r ${borderClass} ${sidebarBgClass} ${textClass}`}>
      {/* Header with logo */}
      <div className={`${headerBgClass} p-4 flex items-center justify-between`}>
        <div className="flex items-center">
          <div className={`${iconBgClass} h-6 w-6 flex items-center justify-center rounded mr-1`}>
            <BookOpen className="h-4 w-4" />
          </div>
          <span className="text-white text-xl font-bold">Blog</span>
        </div>
      </div>
      
      {/* Search input */}
      <div className={`p-2 border-b ${borderClass}`}>
        <div className={`flex items-center h-8 ${searchBgClass} rounded`}>
          <div className="flex items-center justify-center w-8">
            <Search className={`h-4 w-4 ${mutedTextClass} sidebar-search-icon`} />
          </div>
          <input
            type="search"
            placeholder="Search posts..."
            className={`border-0 bg-transparent ${textClass} p-0 text-sm w-full focus:outline-none placeholder:${mutedTextClass} h-full`}
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
      </div>
      
      {/* Blog list */}
      <div className={`p-0 border-b ${borderClass}`}>
        <div className="px-4 py-2">
          <h3 className={`text-xs font-medium ${mutedTextClass} uppercase`}>Recent Posts</h3>
        </div>
        <div className="overflow-y-auto max-h-[calc(100vh-220px)]">
          {isAuthenticated && hasChannelAccess ? (
            filteredBlogs.length > 0 ? (
              <div>
                {filteredBlogs.map((blog: Blog) => {
                  const isActive = location.pathname === `/post/${blog.id}`;
                  return (
                    <a
                      key={blog.id}
                      href={`/post/${blog.id}`}
                      onClick={(e) => handleBlogClick(blog.id, e)}
                      className={`block px-4 py-2 border-l-2 ${
                        isActive 
                          ? `${activeBgClass} ${activeTextClass} ${activeBorderClass}` 
                          : `border-transparent ${hoverBgClass}`
                      }`}
                    >
                      <div className="text-sm font-medium">{blog.title}</div>
                      <div className={`text-xs ${mutedTextClass} mt-1 flex items-center`}>
                        <span className="inline-block w-2 h-2 bg-purple-500 rounded-full mr-2"></span>
                        {new Date(blog.createdAt).toLocaleDateString()}
                      </div>
                    </a>
                  );
                })}
              </div>
            ) : (
              <div className={`px-4 py-2 text-sm ${mutedTextClass}`}>
                No posts found
              </div>
            )
          ) : (
            <div className={`px-4 py-2 text-sm ${mutedTextClass}`}>
              {isAuthenticated 
                ? "You don't have access to view blog posts. Please join our Telegram channel."
                : "Please login to view blog posts"}
            </div>
          )}
        </div>
      </div>
      
      {/* Footer */}
      <SidebarFooter className={`p-4 mt-auto ${borderClass}`}>
        <div className="flex items-center justify-between">
          <ModeToggle />
          {isAuthenticated ? (
            <Button 
              size="sm" 
              variant="ghost"
              className="text-xs"
              onClick={handleLogout}
            >
              Logout
            </Button>
          ) : (
            <span className={`text-xs ${mutedTextClass}`}>© 2025 Blog</span>
          )}
        </div>
      </SidebarFooter>
    </Sidebar>
  );
}
