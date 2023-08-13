export default function Post({ post }: { post: any }) {
  console.log('🚀 ~ file: [id].tsx:2 ~ Post ~ posts:', post);
  return (
    <ul>
      <li key={post?.id}>{post?.content}</li>
    </ul>
  );
}

// This function gets called at build time
export async function getStaticPaths() {
  // Call an external API endpoint to get posts
  const res = await fetch('https://mock.apifox.cn/m1/3122271-0-default/posts/blogList');
  const posts = await res.json();

  // Get the paths we want to pre-render based on posts
  const paths = posts.map((post: { id: any }) => ({
    params: { id: String(post.id) },
  }));
  console.log('🚀 ~ file: [id].tsx:22 ~ paths ~ paths:', paths);

  // We'll pre-render only these paths at build time.
  // { fallback: false } means other routes should 404.   
  return { paths, fallback: false };
}

// This also gets called at build time
export async function getStaticProps({ params }: { params: any }) {
  // params contains the post `id`.
  // If the route is like /posts/1, then params.id is 1
  
  const res = await fetch(`https://mock.apifox.cn/m1/3122271-0-default/posts/blogItem?id=${params.id}`);
  const post = await res.json();
  console.log('🚀 ~ file: [id].tsx:34 ~ getStaticProps ~ post:', post);

  // Pass post data to the page via props
  return { props: { post } };
}
