export default function Blog({ posts }: { posts: any }) {
  return (
    <ul>
      {posts.map((post: any) => (
        <li key={post.id}>{post.content}</li>
      ))}
    </ul>
  );
}

// This function gets called at build time
export async function getStaticProps() {
  // Call an external API endpoint to get posts
  const res = await fetch('https://mock.apifox.cn/m1/3122271-0-default/posts/blogList');
  const posts = await res.json();
  console.log('🚀 ~ file: Blog.tsx:16 ~ getStaticProps ~ posts:', posts);

  // By returning { props: { posts } }, the Blog component
  // will receive `posts` as a prop at build time
  return {
    props: {
      posts,
    },
  };
}
