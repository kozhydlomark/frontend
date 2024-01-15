// CommentSection.jsx
import React, { useState } from "react";

import styles from "./AddComment.module.scss";

import TextField from "@mui/material/TextField";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";

const CommentSection = ({ postId, userId, handleAddComment }) => {
  const [commentText, setCommentText] = useState("");

  const handleCommentSubmit = () => {
    // Перевірка, чи проп handleAddComment передано та є функцією
    if (handleAddComment && typeof handleAddComment === "function") {
      // Викликайте передану функцію та передавайте ідентифікатор поста та текст коментаря
      handleAddComment({ postId, userId, text: commentText });
    }

    // Очищення поля введення після відправки коментаря
    setCommentText("");
  };

  return (
    <div className={styles.root}>
      <Avatar classes={{ root: styles.avatar }} src="noavatar.png" />
      <div className={styles.form}>
        <TextField
          label="Написати Коментар"
          variant="outlined"
          maxRows={10}
          multiline
          fullWidth
          value={commentText}
          onChange={(e) => setCommentText(e.target.value)}
        />
        <Button variant="contained" onClick={handleCommentSubmit}>
          Відправити
        </Button>
      </div>
    </div>
  );
};

export default CommentSection;
