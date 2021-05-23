import { useRouter } from "next/router";

export default function Post({id}) {
  const router = useRouter();

  // If the page is not yet generated, this will be displayed
  // initially until getStaticProps() finishes running
  if (router.isFallback) {
    return <div>Loading...</div>;
  }

  return <h2>This is {id} page</h2>;
}

export async function getStaticPaths() {
  return {
    paths: [
      { params: { id: "may-loc-kk" } },
      { params: { id: "tlvc" } },
      { params: { id: "luc-binh" } },
    ],
    fallback: false,
  };
}

// This also gets called at build time
export async function getStaticProps({ params }) {
  // params contains the post `id`.
  // If the route is like /posts/1, then params.id is 1
  // const res = await fetch(`https://.../posts/${params.id}`)
  // const post = await res.json()

  // Pass post data to the page via props
  return {
    props: { id: params.id },
    // Re-generate the post at most once per second
    // if a request comes in
    revalidate: 1,
  }
}

