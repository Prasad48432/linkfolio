import { createClient } from "@/utils/supabase/server";

export default async function BlogsPage() {
  const supabase = createClient();

  // Fetch blogs data
  const { data: blogs, error } = await supabase
    .from("blogs")
    .select("id, title, content, author_id, created_at");

  if (error) {
    console.error("Error fetching blogs:", error.message);
    return <div>Error loading blogs</div>;
  }

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Blogs</h1>
      {blogs?.length ? (
        <div className="space-y-4">
          {blogs.map((blog) => (
            <div key={blog.id} className="p-4 border rounded shadow-sm">
              <h2 className="text-xl font-semibold">{blog.title}</h2>
              <p className="text-gray-700">{blog.content}</p>
              <p className="text-sm text-gray-500">
                Author ID: {blog.author_id} | Created:{" "}
                {new Date(blog.created_at).toLocaleDateString()}
              </p>
            </div>
          ))}
        </div>
      ) : (
        <p>No blogs available.</p>
      )}
    </div>
  );
}
