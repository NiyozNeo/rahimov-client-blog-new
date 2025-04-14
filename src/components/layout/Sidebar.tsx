import { ModeToggle } from "../ui/mode-toggle";
import { useLocation, useNavigate } from "react-router-dom";
import { useBlogContext } from "@/context/BlogContext";
import { useState } from "react";

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarHeader,
} from "@/components/ui/sidebar";
import { Button } from "../ui/button";
import { Input } from "../ui/input";

type Blog = {
  id: string;
  title: string;
  createdAt: string;
};

export function AppSidebar() {
  const [searchQuery, setSearchQuery] = useState("");
  const location = useLocation();
  const navigate = useNavigate();
  const { logout, blogs, isAuthenticated } = useBlogContext();

  // Filter blogs based on search query
  const filteredBlogs = blogs.filter((blog) =>
    blog.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // Handle blog item click - now just navigate to the post directly
  const handleBlogClick = (blogId: string, event: React.MouseEvent) => {
    event.preventDefault();
    navigate(`/post/${blogId}`);
  };

  // Handle logout
  const handleLogout = () => {
    logout();
    navigate("/post/1");
  };

  return (
    <Sidebar
      side="left"
      variant="sidebar"
      className="sidebar-background"
    >
      <SidebarHeader>
        <h1 className="text-xl font-bold ">Parallel Muhit</h1>

        <Input
          type="search"
          placeholder="Search posts..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
      </SidebarHeader>

      <SidebarContent>
        <SidebarGroup>
          {/* Blog list */}
          <div className="p-0 sidebar-border-light">
            <div className="overflow-y-auto max-h-[calc(100vh-240px)]">
              {filteredBlogs.length > 0 ? (
                <div>
                  {filteredBlogs.map((blog: Blog) => {
                    const isActive = location.pathname === `/post/${blog.id}`;
                    return (
                      <a
                        key={blog.id}
                        href={`/post/${blog.id}`}
                        onClick={(e) => handleBlogClick(blog.id, e)}
                        className={`block px-5 py-3.5 border-l-2 ${
                          isActive
                            ? `sidebar-active-bg-light sidebar-active-text-light sidebar-active-border`
                            : `border-transparent sidebar-hover-bg-light`
                        }`}
                      >
                        <div className="text-sm font-medium mb-1">
                          {blog.title}
                        </div>
                        <div className="text-xs sidebar-muted-text-light mt-1.5 flex items-center">
                          <span className="inline-block w-2 h-2 bg-purple-500 rounded-full mr-2"></span>
                          {new Date(blog.createdAt).toLocaleDateString()}
                        </div>
                      </a>
                    );
                  })}
                </div>
              ) : (
                <div className="px-5 py-4 text-sm sidebar-muted-text-light">
                  No posts found
                </div>
              )}
            </div>
          </div>
        </SidebarGroup>
      </SidebarContent>

      {/* Footer */}
      <SidebarFooter className="p-5 mt-auto sidebar-border-light">
        <div className="flex items-center justify-between">
          <ModeToggle />
          {isAuthenticated ? (
            <Button
              size="sm"
              variant="default"
              onClick={handleLogout}
            >
              Logout
            </Button>
          ) : (
            <span className="text-xs sidebar-muted-text-light">
              © 2025 Parallel Muhit
            </span>
          )}
        </div>
      </SidebarFooter>
    </Sidebar>
  );
}
