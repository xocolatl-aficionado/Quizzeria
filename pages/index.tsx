import Link from 'next/link'

const host = process.env['HOST'];

export async function getServerSideProps() {
  try {
    
    let response = await fetch(`${host}/api/getPosts`);
    let posts = await response.json();
    return {
      props: { 
        posts: JSON.parse(JSON.stringify(posts)) 
      },
    };
  } catch (e) {
    console.error(e);
  }
}

export async function handleDeletePost (postId: string) {
  
  try {
    let response = await fetch(
      `/api/deletePost?id=${postId}`,
      {
        method: "POST",
        headers: {
          Accept: "application/json, text/plain, */*",
          "Content-Type": "application/json",
        },
      }
    );
    response = await response.json();
    window.location.reload();
  } catch (error) {
    console.log("An error occurred while deleting ", error);
  }
};


export default function Posts(props : any) {
  console.log(props.posts[0])
  return (
    <>
    <title>Test MongoDb</title>
    <h1>Post List</h1>
    <a href="/add">Add Post</a>
    {
      props.posts.map(post => {
        return(
          <div key={post._id}>
            <h2>
            {post.title} | <Link href={{ pathname: '/edit', query: { id: `${post._id}` } }}>Edit</Link> | <button onClick={() => handleDeletePost(post._id as string)}>
                    Delete
                  </button>
            </h2>
            <p>{post.content}</p>
          </div>
        )
      })
    }
    </>
  )
}