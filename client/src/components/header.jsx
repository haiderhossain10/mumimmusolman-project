import { useRef, useState } from "react";
import { Link, NavLink } from "react-router-dom";
import useOutsideClick from "@rooks/use-outside-click";
import useAuth from "../hook/useAuth";
import { useDispatch } from "react-redux";
import { clearTokens } from "../features/auth/authSlice";
import useAdminCheck from "../hook/useAdminCheck";

export default function Header() {
    const [isActiveMenu, setActiveMenu] = useState(false);
    const [isDropdownAtive, setDropdownAtive] = useState(false);

    const pRef = useRef();
    const outsidePClick = () => {
        setDropdownAtive(false);
    };

    const dispatch = useDispatch();

    const opneDropdown = () => {
        setDropdownAtive(!isDropdownAtive);
    };

    const closeDropdown = () => {
        setDropdownAtive(false);
    };

    useOutsideClick(pRef, outsidePClick);

    // menu
    const menus = [
        {
            id: 1,
            name: "Home",
            path: "/",
        },
        {
            id: 2,
            name: "Video",
            path: "/video",
        },
        {
            id: 3,
            name: "Blog",
            path: "/blog",
        },
        {
            id: 4,
            name: "Login / Register",
            path: "/login",
        },
        {
            id: 5,
            name: "Contact",
            path: "/contact",
        },
    ];

    // toggle menu
    const toggleMenu = () => {
        setActiveMenu(!isActiveMenu);
    };

    // per click close menu
    const closePerClick = () => {
        setActiveMenu(false);
    };

    // is authorized
    const isAuthenticated = useAuth();

    // logout handler
    const logoutHandler = () => {
        if (window.confirm("Are you sure you want to logout?")) {
            localStorage.clear();
            dispatch(clearTokens());
        }
    };

    // is admin checking
    const isAdmin = useAdminCheck();

    return (
        <header className="shadow-sm">
            <nav className="bg-white border-gray-200 px-2 sm:px-4 py-2.5 rounded dark:bg-gray-900">
                <div className="container flex flex-wrap items-center justify-between mx-auto">
                    <Link to="/" className="flex items-center">
                        <h2 className="font-bold text-lg">মুমিনমুসলমান</h2>
                    </Link>
                    <button
                        onClick={toggleMenu}
                        data-collapse-toggle="navbar-default"
                        type="button"
                        className="inline-flex items-center p-2 ml-3 text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
                        aria-controls="navbar-default"
                        aria-expanded="false"
                    >
                        <span className="sr-only">Open main menu</span>
                        <svg
                            className="w-6 h-6"
                            aria-hidden="true"
                            fill="currentColor"
                            viewBox="0 0 20 20"
                            xmlns="http://www.w3.org/2000/svg"
                        >
                            <path
                                fillRule="evenodd"
                                d="M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 15a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z"
                                clipRule="evenodd"
                            />
                        </svg>
                    </button>
                    <div
                        className={
                            isActiveMenu
                                ? "w-full md:block md:w-auto"
                                : "hidden w-full md:block md:w-auto"
                        }
                    >
                        <ul className="flex lg:items-center flex-col p-4 mt-4 border border-gray-100 rounded-lg bg-gray-50 md:flex-row md:space-x-8 md:mt-0 md:text-sm md:font-medium md:border-0 md:bg-white dark:bg-gray-800 md:dark:bg-gray-900 dark:border-gray-700">
                            {menus?.map((menu) =>
                                isAuthenticated ? (
                                    menu?.path !== "/login" && (
                                        <li key={menu.id}>
                                            <NavLink
                                                onClick={closePerClick}
                                                to={menu.path}
                                                className={({ isActive }) =>
                                                    isActive
                                                        ? "inline-block py-2 pl-3 pr-4 text-blue-700  rounded  md:p-0 dark:text-white"
                                                        : "inline-block py-2 pl-3 pr-4 rounded  md:p-0 dark:text-white"
                                                }
                                            >
                                                {menu.name}
                                            </NavLink>
                                        </li>
                                    )
                                ) : (
                                    <li key={menu.id}>
                                        <NavLink
                                            onClick={closePerClick}
                                            to={menu.path}
                                            className={({ isActive }) =>
                                                isActive
                                                    ? "inline-block py-2 pl-3 pr-4 text-blue-700  rounded  md:p-0 dark:text-white"
                                                    : "inline-block py-2 pl-3 pr-4 rounded  md:p-0 dark:text-white"
                                            }
                                        >
                                            {menu.name}
                                        </NavLink>
                                    </li>
                                )
                            )}
                            {isAuthenticated && (
                                <div ref={pRef}>
                                    <button
                                        className="text-white bg-blue-700 hover:bg-blue-800  font-medium rounded-lg text-sm px-4 py-2.5 text-center inline-flex items-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                                        type="button"
                                        onClick={opneDropdown}
                                    >
                                        Dashboard
                                        <svg
                                            className="w-4 h-4 ml-2"
                                            aria-hidden="true"
                                            fill="none"
                                            stroke="currentColor"
                                            viewBox="0 0 24 24"
                                            xmlns="http://www.w3.org/2000/svg"
                                        >
                                            <path
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                                strokeWidth={2}
                                                d="M19 9l-7 7-7-7"
                                            />
                                        </svg>
                                    </button>

                                    <div
                                        className={`${
                                            isDropdownAtive ? "" : "hidden"
                                        }  bg-white divide-y divide-gray-100 rounded shadow w-44 dark:bg-gray-700 dark:divide-gray-600 absolute z-20`}
                                    >
                                        <ul
                                            className="py-1 text-sm text-gray-700 dark:text-gray-200"
                                            aria-labelledby="dropdownDividerButton"
                                        >
                                            <li>
                                                <NavLink
                                                    onClick={closeDropdown}
                                                    to="/profile"
                                                    className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
                                                >
                                                    Profile
                                                </NavLink>
                                            </li>
                                            {isAdmin && (
                                                <>
                                                    <li>
                                                        <NavLink
                                                            onClick={
                                                                closeDropdown
                                                            }
                                                            to="/add-post"
                                                            className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
                                                        >
                                                            Create a post
                                                        </NavLink>
                                                    </li>
                                                    <li>
                                                        <NavLink
                                                            onClick={
                                                                closeDropdown
                                                            }
                                                            to="/add-video"
                                                            className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
                                                        >
                                                            Creata a video
                                                        </NavLink>
                                                    </li>
                                                    <li>
                                                        <NavLink
                                                            onClick={
                                                                closeDropdown
                                                            }
                                                            to="/category"
                                                            className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
                                                        >
                                                            Category
                                                        </NavLink>
                                                    </li>
                                                </>
                                            )}
                                        </ul>
                                        <div className="py-2 px-3">
                                            <button
                                                onClick={logoutHandler}
                                                className="text-white cursor-pointer bg-red-700 hover:bg-red-800 font-medium rounded-lg text-sm px-5 py-2.5  dark:bg-red-600 dark:hover:bg-red-700 focus:outline-none mt-4 lg:mt-0 w-full"
                                            >
                                                Logout
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            )}
                        </ul>
                    </div>
                </div>
            </nav>
        </header>
    );
}
