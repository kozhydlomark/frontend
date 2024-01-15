import React from "react";
import { useDispatch, useSelector } from "react-redux";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Grid from "@mui/material/Grid";

import { Post } from "../components/Post";
import TagsBlock from "../components/TagsBlock";
import { fetchPosts, fetchTags } from "../redux/slices/posts";

export const Home = () => {
  const dispatch = useDispatch();
  const userData = useSelector((state) => state.auth.data);
  const { posts, tags } = useSelector((state) => state.posts);
  const [selectedTags, setSelectedTags] = React.useState([]);
  const [searchInput, setSearchInput] = React.useState("");
  const isPostsLoading = posts.status === "loading";
  const isTagsLoading = tags.status === "loading";

  React.useEffect(() => {
    dispatch(fetchPosts());
    dispatch(fetchTags());
  }, [dispatch]);

  const handleTagClick = (tag) => {
    if (selectedTags.includes(tag)) {
      setSelectedTags(selectedTags.filter((t) => t !== tag));
    } else {
      setSelectedTags([...selectedTags, tag]);
    }
  };

  const handleSearchInputChange = (event) => {
    setSearchInput(event.target.value);
  };

  const filterPostsByTags = () => {
    return selectedTags.length === 0
      ? posts.items
      : posts.items.filter((post) =>
          post.tags.some((tag) => selectedTags.includes(tag))
        );
  };

  const filterTagsBySearch = () => {
    return tags.items.filter((tag) =>
      tag.toLowerCase().includes(searchInput.toLowerCase())
    );
  };

  return (
    <>
      <Tabs
        style={{ marginBottom: 15 }}
        value={0}
        aria-label="basic tabs example"
      >
        <Tab label="Статті" />
      </Tabs>
      <Grid container spacing={4}>
        <Grid xs={8} item>
          {filterPostsByTags().map((obj, index) =>
            isPostsLoading ? (
              <Post key={index} isLoading={true} />
            ) : (
              <Post
                key={obj._id}
                _id={obj._id}
                title={obj.title}
                imageUrl={
                  obj.imageUrl
                    ? `${process.env.REACT_APP_API_URL}${obj.imageUrl}`
                    : ""
                }
                user={obj.user}
                createdAt={obj.createdAt}
                viewsCount={obj.viewsCount}
                commentsCount={3}
                tags={obj.tags}
                isEditable={obj.user && userData?._id === obj.user._id}
              />
            )
          )}
        </Grid>
        <Grid xs={4} item>
          <TagsBlock
            items={filterTagsBySearch()}
            selectedTags={selectedTags}
            isLoading={isTagsLoading}
            onTagClick={handleTagClick}
          />
        </Grid>
      </Grid>
    </>
  );
};
