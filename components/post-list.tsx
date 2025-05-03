import type { Post } from "@/lib/api"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

interface PostListProps {
  posts: Post[]
}

export default function PostList({ posts }: PostListProps) {
  return (
    <div className="space-y-4">
      <h2 className="text-xl font-semibold">User Posts</h2>

      {posts.length > 0 ? (
        <div className="grid gap-4 md:grid-cols-2">
          {posts.map((post) => (
            <Card key={post.id}>
              <CardHeader>
                <CardTitle className="text-lg">{post.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600 dark:text-gray-400">{post.body}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      ) : (
        <p className="text-gray-500 dark:text-gray-400">No posts found for this user.</p>
      )}
    </div>
  )
}
