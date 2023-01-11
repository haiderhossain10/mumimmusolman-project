import { Route, Routes } from "react-router-dom";
import Home from "./pages/home";
import Blog from "./pages/blog";
import Video from "./pages/video";
import Login from "./pages/login";
import Register from "./pages/register";
import PageNotFound from "./pages/404";
import Contact from "./pages/contact";
import Profile from "./pages/profile";
import Category from "./pages/dashboard/category";
import AddVideo from "./pages/dashboard/add-video";
import Layout from "./components/layout";
import Post from "./pages/dashboard/post";
import useAuthChecking from "./hook/useAuthChecking";
import PrivateRoute from "./components/route-check/private-route";
import PublicRoute from "./components/route-check/public-route";
import BlogDisplay from "./pages/blog-display";
import AdminRoute from "./components/route-check/admin-route";

export default function App() {
    const useIsChecked = useAuthChecking();

    return (
        <>
            {!useIsChecked ? (
                "Loading..."
            ) : (
                <Layout>
                    <Routes>
                        <Route element={<PrivateRoute />}>
                            <Route path="/profile" element={<Profile />} />
                            <Route element={<AdminRoute />}>
                                <Route path="/add-post" element={<Post />} />
                                <Route
                                    path="/category"
                                    element={<Category />}
                                />
                                <Route
                                    path="/add-video"
                                    element={<AddVideo />}
                                />
                            </Route>
                        </Route>
                        <Route element={<PublicRoute />}>
                            <Route path="/login" element={<Login />} />
                            <Route path="/register" element={<Register />} />
                        </Route>
                        <Route path="/" element={<Home />} />
                        <Route path="/video" element={<Video />} />
                        <Route path="/blog" element={<Blog />} />
                        <Route path="/blog/:slug" element={<BlogDisplay />} />
                        <Route path="/contact" element={<Contact />} />

                        <Route path="*" element={<PageNotFound />} />
                    </Routes>
                </Layout>
            )}
        </>
    );
}
