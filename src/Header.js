import { Menu, Search } from "semantic-ui-react";
import { Link } from "react-router-dom";
import firebase from './utils/firebase';
import React, { useState, useEffect } from 'react'; // 新增引入 React

function Header() {
    const [user, setUser] = React.useState(null);
    useEffect(() => {
        import('./utils/firebase').then((fb) => {
            fb.default.auth().onAuthStateChanged((currentUser) => {
                setUser(currentUser);
            });
        });
    }, []);

    // Debug
    console.log(user);

    return (
        <Menu>
            <Menu.Item as={Link} to="/">Starburst</Menu.Item>
            <Menu.Item>
                <Search />
            </Menu.Item>
            <Menu.Menu position="right">
                {user ? (
                    <>
                        <Menu.Item as={Link} to="/newpost">發表</Menu.Item>
                        <Menu.Item as={Link} to="/my">會員</Menu.Item>
                        <Menu.Item onClick={() => {
                            import('./utils/firebase').then((fb) => {
                                fb.default.auth().signOut();
                                window.location.reload();
                            });
                        }}>登出</Menu.Item>
                    </>
                ) : (
                    <Menu.Item as={Link} to="/signin">註冊/登入</Menu.Item>
                )}
            </Menu.Menu>
        </Menu>
    );
}

export default Header;
