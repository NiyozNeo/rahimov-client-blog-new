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
  slug: string;
  content?: string; // Make content optional
};

export function AppSidebar() {
  const [searchQuery, setSearchQuery] = useState("");
  const location = useLocation();
  const navigate = useNavigate();
  const { logout, blogs, isAuthenticated, isAdmin } = useBlogContext();

  // Filter blogs based on search query
  const filteredBlogs = blogs.filter((blog) =>
    blog.title.toLowerCase().includes(searchQuery.toLowerCase())
  );  // Handle blog item click - now navigate to the post using slug
  const handleBlogClick = (blogSlug: string, event: React.MouseEvent) => {
    event.preventDefault();
    if (blogSlug) {
      navigate(`/${blogSlug}`);
    } else {
      navigate("/haqida");
    }
  };

  // Handle logout
  const handleLogout = () => {
    logout();
    navigate("/haqida");
  };

  return (
    <Sidebar
      side="left"
      variant="sidebar"
      className="bg-[var(--sidebar-background)] text-[var(--sidebar-foreground)] sidebar-background border-r-[var(--sidebar-border)] backdrop-blur-none bg-opacity-100"
    >
      <SidebarHeader className="p-4">
        <h1 className="text-xl font-bold mb-3">
          <a href="/" className="hover:text-sidebar-primary transition-colors">Parallel Muhit</a>
        </h1>
        <ModeToggle />
        <Input
          type="search"
          placeholder="Search posts..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          autoFocus={false}
          tabIndex={-1}
          autoComplete="off"
          className="bg-sidebar-card rounded-md border-[var(--sidebar-border)] text-[var(--sidebar-foreground)] placeholder:text-sidebar-muted-text-light focus:outline-none focus:ring-2 focus:ring-sidebar-primary focus:border-transparent"
        />
      </SidebarHeader>

      <SidebarContent>
        <SidebarGroup>
          {/* Blog list */}
          <div className="py-2">
            <div className="overflow-y-auto max-h-[calc(100vh-240px)]">
              {filteredBlogs.length > 0 ? (
                <div>
                  {filteredBlogs.map((blog: Blog, index: number) => {
                    const isActive = location.pathname === `/${blog.slug}`;
                    return (
                      <a
                        key={blog.id}
                        href={`/${blog.slug}`}
                        onClick={(e) => handleBlogClick(blog.slug, e)}
                        className={`block px-4 py-2.5 mx-2 rounded-md transition-colors
                          ${isActive
                            ? 'font-semibold bg-[var(--sidebar-accent)] border-l-4 border-[var(--sidebar-primary)] text-[var(--sidebar-primary)]'
                            : 'hover:bg-[var(--sidebar-accent)] hover:text-[var(--sidebar-primary)] text-[var(--sidebar-foreground)]'}
                        `}
                      >
                        <div className="text-sm font-medium flex">
                          <span className="mr-2">{index === 0 ? '' : filteredBlogs.length - index + 1 + '.'}</span>
                          {blog.title}
                        </div>
                      </a>
                    );
                  })}
                </div>
              ) : (
                <div className="px-4 py-3 text-sm sidebar-muted-text-light">
                  No posts found
                </div>
              )}
            </div>
          </div>
        </SidebarGroup>
      </SidebarContent>

      {/* Footer */}
      <SidebarFooter className="p-4 mt-auto sidebar-border-light">
        <div className="flex items-center justify-between">

          {isAdmin ? (
            <Button
              size="sm"
              variant="default"
              className="cursor-pointer rounded-md"
              onClick={() => navigate("/admin/dashboard")}
            >
              Dashboard
            </Button>
          ) : null}
          {isAuthenticated ? (
            <Button
              size="sm"
              variant="default"
              className="rounded-md"
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
