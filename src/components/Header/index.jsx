import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import Button from "@mui/material/Button";

import styles from "./Header.module.scss";
import Container from "@mui/material/Container";
import { logout, selectIsAuth } from "../../redux/slices/auth.js";

export const Header = () => {
  const dispatch = useDispatch();
  const isAuth = useSelector(selectIsAuth);

  const [searchTerm, setSearchTerm] = useState(""); // Додано стан для зберігання значення пошукового терміну

  const onSearchTermChange = (e) => {
    setSearchTerm(e.target.value);
  };

  const onClickLogout = () => {
    if (window.confirm("Ви дійсно хочете вийти?")) {
      dispatch(logout());
      window.localStorage.removeItem("token");
    }
  };

  return (
    <div className={styles.root}>
      <Container maxWidth="lg">
        <div className={styles.inner}>
          <Link className={styles.logo} to="/">
            <div>ECO-BLOG</div>
          </Link>
          <div className={styles.search}></div>
          <div className={styles.buttons}>
            {isAuth ? (
              <>
                <Link to="/posts">
                  <Button variant="contained">Написати статю</Button>
                </Link>
                <Button
                  onClick={onClickLogout}
                  variant="contained"
                  color="error"
                >
                  Вийти
                </Button>
              </>
            ) : (
              <>
                <Link to="/login">
                  <Button variant="outlined">Увійти</Button>
                </Link>
                <Link to="/register">
                  <Button variant="contained">Зареєструватися</Button>
                </Link>
              </>
            )}
          </div>
        </div>
      </Container>
    </div>
  );
};
