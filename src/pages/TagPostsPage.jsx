// import React from "react";
// import { useDispatch, useSelector } from "react-redux";
// import Container from "@mui/material/Container";
// import { Header } from "../components";
// // import { TagPosts } from "../pages";
// import TagPosts from "./TagPostsPage";
// import { fetchAuthMe, selectIsAuth } from "../redux/slices/auth";

// const TagPostsPage = () => {
//   const dispatch = useDispatch();
//   const isAuth = useSelector(selectIsAuth);

//   React.useEffect(() => {
//     dispatch(fetchAuthMe());
//   }, [dispatch]);

//   return (
//     <>
//       <Header />
//       <Container maxWidth="lg">
//         <TagPosts />
//       </Container>
//     </>
//   );
// };

// export default TagPostsPage;

// import React from "react";
// import { useParams } from "react-router-dom";
// import { useSelector } from "react-redux";
// import { Header } from "../components";
// import Container from "@mui/material/Container";
// import TagPosts from "./TagPostsPage";

// const TagPostsPage = () => {
//    const { tag } = useParams();
//    const posts = useSelector((state) => state.posts.items);

//    // Перевірка чи стан posts існує перед викликом filter
//    const filteredPosts = posts ? posts.filter(post => post.tags.includes(tag)) : [];

//    return (
//         <>
//           <Container maxWidth="lg">
//           <TagPosts />
//           </Container>
//         </>
//      );
//     };

// export default TagPostsPage;

// import React, { useEffect } from "react";
// import { useSelector, useDispatch } from "react-redux";
// import { useNavigate, useParams } from "react-router-dom";
// import Post from '../components/Post';

// import { fetchPosts } from "../redux/slices/posts";
// import { selectPosts } from "../redux/slices/posts";  // Додайте імпорт selectPosts

// const TagPostsPage = () => {
//   const dispatch = useDispatch();  // Додайте useDispatch
//   const navigate = useNavigate();
//   const { tag } = useParams();

//   // Використовуйте useSelector для отримання постів
//   const posts = useSelector(selectPosts);

//   useEffect(() => {
//     const fetchData = async () => {
//       try {
//         await dispatch(fetchPosts());
//       } catch (error) {
//         console.error("Error fetching data:", error);
//       }
//     };

//     fetchData();
//   }, [dispatch]);

//   useEffect(() => {
//     if (posts.status === 'loaded' && tag) {
//       const hasPosts = posts.items && posts.items.length > 0;
//       const hasTag = hasPosts && posts.items.some(post => post.tags.includes(tag));

//       if (!hasTag || !hasPosts) {
//         navigate("/");
//       }
//     }
//   }, [tag, posts, navigate]);

//   if (posts.status === 'loading') {
//     return <p>Loading...</p>;
//   }

//   if (posts.status === 'error') {
//     return <p>Error loading posts</p>;
//   }

//   return (
//     <div>
//     <h2>Hello</h2>
//     {Array.isArray(posts) && posts.map(post => (
//       <Post
//         key={post._id}
//         title={post.title}
//         // Додайте інші властивості, які вам потрібні для відображення постів
//   />
// ))}
//     </div>
//   );
// };

// export default TagPostsPage;


import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";

import { fetchPosts, selectPosts } from "../redux/slices/posts";

const TagPostsPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { tag } = useParams();


  const posts = useSelector(selectPosts);

  useEffect(() => {
    const fetchData = async () => {
      try {
        await dispatch(fetchPosts());
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, [dispatch]);

  useEffect(() => {
    if (posts.status === "loaded" && tag) {
      const hasPosts = posts.items && posts.items.length > 0;
      const hasTag =
        hasPosts && posts.items.some((post) => post.tags.includes(tag));

      if (!hasTag || !hasPosts) {
        navigate("/");
      }
    }
  }, [tag, posts, navigate]);

  if (!posts || posts.length === 0) {
    return <div>Loading...</div>; 
  }

  return (
    <div>
      <h2>Пости з тегом "{tag}"</h2>
      {posts.map((post) => (
        <div key={post.id}>
          <h3>{post.title}</h3>
          <p>{post.body}</p>
        </div>
      ))}
    </div>
  );
};

export default TagPostsPage;
