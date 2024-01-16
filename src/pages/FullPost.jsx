import React from "react";
import { useParams } from "react-router-dom";
import ReactMarkdown from "react-markdown";
import axios from "../axios";

import { Post } from "../components/Post";
import CommentSection from "../components/AddComment";
import { CommentsBlock } from "../components/CommentsBlock";

export const FullPost = () => {
  const [data, setData] = React.useState(null);
  const [comments, setComments] = React.useState([]);
  const [isLoading, setLoading] = React.useState(true);
  const { id } = useParams();

  const fetchComments = async () => {
    const response = await fetch(`http://localhost:4444/comment?postId=${id}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: window.localStorage.getItem("token"),
      },
    });
    const commentsData = await response.json();

    setComments(commentsData);
  };

  React.useEffect(() => {
    // Загрузка поста
    axios
      .get(`/posts/${id}`)
      .then((res) => {
        setData(res.data);
        setLoading(false);
      })
      .catch((err) => {
        console.warn(err);
        alert("Помилка при отриманні статті");
        setLoading(false);
      });

    // Загрузка комментариев
    // const fetchComments = async () => {
    //   const response = await fetch(
    //     `http://localhost:4444/comment?postId=${id}`,
    //     {
    //       method: "GET",
    //       headers: {
    //         "Content-Type": "application/json",
    //         Authorization: window.localStorage.getItem("token"),
    //       },
    //     }
    //   );
    //   const commentsData = await response.json();

    //   setComments(commentsData);
    // };

    fetchComments();
  }, [id]);

  const handleAddComment = async ({ userId, text }) => {
    const requestOptions = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: window.localStorage.getItem("token"),
      },
      body: JSON.stringify({ postId: id, userId, text }),
    };
    try {
      const response = await fetch(
        `http://localhost:4444/comment`,
        requestOptions
      );

      const result = await response.json();


      const responses = await fetch(
        `http://localhost:4444/user?postId=${result._id}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: window.localStorage.getItem("token"),
          },
        }
      );
      const createdComment = await responses.json();


      setComments((prevComments) => [...prevComments, createdComment]);
    } catch (error) {
      console.error("Error during fetch:", error);
    }
  };

  if (isLoading) {
    return <Post isLoading={isLoading} isFullPost />;
  }

  if (!data) {
    return <p>Пост не знайдено.</p>;
  }

  return (
    <>
      <Post
        id={data._id}
        title={data.title}
        imageUrl={
          data.imageUrl
            ? `${process.env.REACT_APP_API_URL}${data.imageUrl}`
            : ""
        }
        user={data.user}
        createdAt={data.createdAt}
        viewsCount={data.viewsCount}
        commentsCount={comments.length}
        tags={data.tags}
        isFullPost
      >
        <ReactMarkdown children={data.text} />
      </Post>
      <CommentsBlock items={comments} isLoading={false}>
        <CommentSection
          postId={id}
          userId={data.user._id}
          handleAddComment={handleAddComment}
        />
      </CommentsBlock>
    </>
  );
};

// import React from "react";
// import { useParams } from "react-router-dom";
// import ReactMarkdown from "react-markdown";
// import axios from "../axios";

// import { Post } from "../components/Post";
// import CommentSection from "../components/AddComment";
// import { CommentsBlock } from "../components/CommentsBlock";

// export const FullPost = () => {
//   const [data, setData] = React.useState(null);
//   const [isLoading, setLoading] = React.useState(true);
//   const { id } = useParams();

//   React.useEffect(() => {
//     axios
//       .get(`/posts/${id}`)
//       .then((res) => {
//         setData(res.data);
//         setLoading(false);
//       })
//       .catch((err) => {
//         console.warn(err);
//         alert("Помилка при отриманні статті");
//         setLoading(false);
//       });
//   }, [id]);

//   const handleAddComment = async ({ postId, userId, text }) => {
//     const requestOptions = {
//       method: "POST",
//       headers: {
//         "Content-Type": "application/json",
//         Authorization: window.localStorage.getItem("token"),
//       },
//       body: JSON.stringify({ postId, userId, text }),
//     };

//     const response = await fetch(
//       `http://localhost:4444/comment`,
//       requestOptions
//     );
//   };

//   if (isLoading) {
//     return <Post isLoading={isLoading} isFullPost />;
//   }

//   if (!data) {
//     return <p>Пост не знайдено.</p>;
//   }

//   // async function getComments() {
//   //   return await fetch(`http://localhost:4444/comment?postId=${id}`, {
//   //     method: "GET",
//   //     headers: {
//   //       "Content-Type": "application/json",
//   //       Authorization: window.localStorage.getItem("token"),
//   //     },
//   //   });
//   // }

//   const comments = await fetch(`http://localhost:4444/comment?postId=${id}`, {
//     method: "GET",
//     headers: {
//       "Content-Type": "application/json",
//       Authorization: window.localStorage.getItem("token"),
//     },
//   });

//   console.log("comments: ", comments);

//   return (
//     <>
//       <Post
//         id={data._id}
//         title={data.title}
//         imageUrl={
//           data.imageUrl
//             ? `${process.env.REACT_APP_API_URL}${data.imageUrl}`
//             : ""
//         }
//         user={data.user}
//         createdAt={data.createdAt}
//         viewsCount={data.viewsCount}
//         commentsCount={3}
//         tags={data.tags}
//         isFullPost
//       >
//         <ReactMarkdown children={data.text} />
//       </Post>
//       <CommentsBlock
//         items={[
//           {
//             user: {
//               fullname: "Олег Олегович",
//               avatarUrl: "https://mui.com/static/images/avatar/1.jpg",
//             },
//             text: "Це текстовий коментар",
//           },
//           {
//             user: {
//               fullname: "Андрій Андрійович",
//               avatarUrl: "https://mui.com/static/images/avatar/2.jpg",
//             },
//             text: "When displaying three lines or more, the avatar is not aligned at the top. You should set the prop to align the avatar at the top",
//           },
//         ]}
//         isLoading={false}
//       >
//         <CommentSection
//           postId={id}
//           userId={data.user._id}
//           handleAddComment={handleAddComment}
//         />
//       </CommentsBlock>
//     </>
//   );
// };