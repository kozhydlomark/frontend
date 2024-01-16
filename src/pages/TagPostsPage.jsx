import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { fetchPosts, selectPosts } from "../redux/slices/posts";

const TagPostsPage = () => {
  const [postsWithTag, setPostsWithTag] = useState(null);

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { tagName } = useParams();

  useEffect(() => {
    async function fetchPostsByTag() {
      try {
        console.log("tagName: ", tagName); // Check if tagName is defined here
        const response = await fetch(
          `http://localhost:4444/postByTeg?tags=${encodeURIComponent(tagName)}`
        );

        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const data = await response.json();
        setPostsWithTag(data);
      } catch (error) {
        console.error("Error fetching posts by tag:", error);
        // Handle the error as needed
      }
    }

    if (tagName) {
      fetchPostsByTag();
    }
  }, [tagName]); // Ensure useEffect runs when tagName changes

  // Rest of your component...

  return (
    <div>
      <h2>Пости з тегом "{tagName}"</h2>
      {postsWithTag &&
        postsWithTag.map((post) => (
          <div key={post.id}>
            <h3>{post.title}</h3>
            <p>{post.body}</p>
          </div>
        ))}
    </div>
  );
};

export default TagPostsPage;

// import React, { useEffect, useState } from "react";
// import { useSelector, useDispatch } from "react-redux";
// import { useNavigate, useParams } from "react-router-dom";

// import { fetchPosts, selectPosts } from "../redux/slices/posts";

// const TagPostsPage = () => {
//   const [postsWithTag, setPostsWithTag] = useState(null);

//   const dispatch = useDispatch();
//   const navigate = useNavigate();
//   const { tagName } = useParams();

//   // console.log("tagName: ", tagName);

//   const posts = useSelector(selectPosts);

//   console.log("postsWithTag: ", postsWithTag);

//   useEffect(() => {
//     async function fetchPostsByTag(tagName) {
//       try {
//         console.log("tagName: ", tagName);
//         const response = await fetch(
//           `http://localhost:4444/postByTeg?tags=${tagName}`
//         );

//         if (!response.ok) {
//           throw new Error(`HTTP error! Status: ${response.status}`);
//         }

//         const data = await response.json();
//         setPostsWithTag(data);
//       } catch (error) {
//         console.error("Error fetching posts by tag:", error);
//         throw error;
//       }
//     }

//     fetchPostsByTag();
//   }, [tagName]);

//   useEffect(() => {
//     if (posts.status === "loaded" && tagName) {
//       const hasPosts = posts.items && posts.items.length > 0;
//       const hasTag =
//         hasPosts && posts.items.some((post) => post.tags.includes(tagName));

//       if (!hasTag || !hasPosts) {
//         navigate("/");
//       }
//     }
//   }, [tagName, posts, navigate]);

//   if (!posts || posts.length === 0) {
//     return <div>Loading...</div>;
//   }

//   return (
//     <div>
//       <h2>Пости з тегом "{tagName}"</h2>
//       {posts.map((post) => (
//         <div key={post.id}>
//           <h3>{post.title}</h3>
//           <p>{post.body}</p>
//         </div>
//       ))}
//     </div>
//   );
// };

// export default TagPostsPage;
