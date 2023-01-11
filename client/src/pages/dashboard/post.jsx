import { useEffect, useRef, useState } from "react";
import { useGetCategoriesQuery } from "../../features/category/categoryApi";
import { useAddPostMutation } from "../../features/blog/blogApi";
import decode from "jwt-decode";
import { useSelector } from "react-redux";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function Post() {
    const { accessToken } = useSelector((state) => state.auth);
    const [title, setTitle] = useState("");
    const [category, setCategory] = useState("");
    const [img, setImg] = useState("");
    const [status, setStatus] = useState("");
    const [body, setBody] = useState("");

    const { data: categories } = useGetCategoriesQuery();
    const [blogApi, { data: blogApiData, isLoading, isError, error }] =
        useAddPostMutation();

    const fileRef = useRef(null);

    const user = decode(accessToken);

    // post handler
    const postHandler = (e) => {
        e.preventDefault();

        const formDate = new FormData();
        formDate.append("title", title);
        formDate.append("author", user?._id);
        formDate.append("body", body);
        formDate.append("category", category);
        formDate.append("status", status);
        formDate.append("img", img);

        blogApi(formDate);
    };

    // reset handler
    const reset = () => {
        setTitle("");
        setCategory("");
        fileRef.current.value = "";
        setStatus("");
        setBody("");
    };

    useEffect(() => {
        if (blogApiData) {
            toast(blogApiData.msg);
            reset();
        }
    }, [blogApiData]);

    return (
        <>
            <section className="my-10">
                <div className="container px-4 lg:px-0 mx-auto">
                    <div className="lg:w-1/2 mx-auto shadow-lg p-6 rounded">
                        <form
                            onSubmit={postHandler}
                            encType="multipart/form-data"
                        >
                            <div className="grid lg:grid-cols-2 gap-4 mb-4">
                                <div>
                                    <label
                                        htmlFor="blog_title"
                                        className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                                    >
                                        Blog title
                                    </label>
                                    <input
                                        type="text"
                                        id="blog_title"
                                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                        value={title}
                                        onChange={(e) =>
                                            setTitle(e.target.value)
                                        }
                                    />
                                    {error?.data?.errors?.map(
                                        (err, index) =>
                                            err.param === "title" && (
                                                <span
                                                    className="text-red-600"
                                                    key={index}
                                                >
                                                    {err?.msg}
                                                </span>
                                            )
                                    )}
                                </div>
                                <div>
                                    <label
                                        htmlFor="category_name"
                                        className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                                    >
                                        Select category
                                    </label>
                                    <select
                                        id="category_name"
                                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                        value={category}
                                        onChange={(e) =>
                                            setCategory(e.target.value)
                                        }
                                    >
                                        <option value="">
                                            Choose a category
                                        </option>
                                        {categories?.categories?.map(
                                            (category) => (
                                                <option
                                                    key={category._id}
                                                    value={category._id}
                                                >
                                                    {category.name}
                                                </option>
                                            )
                                        )}
                                    </select>
                                    {error?.data?.errors?.map(
                                        (err, index) =>
                                            err.param === "category" && (
                                                <span
                                                    className="text-red-600"
                                                    key={index}
                                                >
                                                    {err?.msg}
                                                </span>
                                            )
                                    )}
                                </div>
                            </div>
                            <div className="grid lg:grid-cols-2 gap-4 mb-4">
                                <div>
                                    <label
                                        htmlFor="thumbnail"
                                        className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                                    >
                                        Select thumbnail (Only accept png or jpg
                                        file)
                                    </label>
                                    <label className="block">
                                        <span className="sr-only">
                                            Choose profile photo
                                        </span>
                                        <input
                                            id="thumbnail"
                                            ref={fileRef}
                                            type="file"
                                            name="thumbnail"
                                            accept="image/*"
                                            onChange={(e) =>
                                                setImg(e.target.files[0])
                                            }
                                            required
                                            className="block w-full text-sm text-gray-500
      file:mr-4 file:py-2 file:px-4
      file:rounded-md file:border-0
      file:text-sm file:font-semibold
      file:bg-blue-500 file:text-white
      hover:file:bg-blue-600
    "
                                        />
                                    </label>
                                    {error?.data?.errors?.map(
                                        (err, index) =>
                                            err.param === "img" && (
                                                <span
                                                    className="text-red-600"
                                                    key={index}
                                                >
                                                    {err?.msg}
                                                </span>
                                            )
                                    )}
                                </div>
                                <div>
                                    <label
                                        htmlFor="status"
                                        className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                                    >
                                        Status
                                    </label>
                                    <select
                                        id="status"
                                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                        value={status}
                                        onChange={(e) =>
                                            setStatus(e.target.value)
                                        }
                                    >
                                        <option value="">
                                            Choose a status
                                        </option>
                                        <option value="active">Active</option>
                                        <option value="inactive">
                                            Inactive
                                        </option>
                                    </select>
                                    {error?.data?.errors?.map(
                                        (err, index) =>
                                            err.param === "status" && (
                                                <span
                                                    className="text-red-600"
                                                    key={index}
                                                >
                                                    {err?.msg}
                                                </span>
                                            )
                                    )}
                                </div>
                            </div>
                            <div>
                                <label
                                    htmlFor="body"
                                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                                >
                                    Content
                                </label>
                                <textarea
                                    id="body"
                                    rows={4}
                                    className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                    placeholder="Write your thoughts here..."
                                    onChange={(e) => setBody(e.target.value)}
                                    value={body}
                                />
                                {error?.data?.errors?.map(
                                    (err, index) =>
                                        err.param === "body" && (
                                            <span
                                                className="text-red-600"
                                                key={index}
                                            >
                                                {err?.msg}
                                            </span>
                                        )
                                )}
                            </div>
                            <button
                                type="submit"
                                className="text-white bg-blue-700 hover:bg-blue-800  focus:outline-none  font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700  mt-4"
                            >
                                {isLoading && !isError ? (
                                    <>
                                        <svg
                                            aria-hidden="true"
                                            role="status"
                                            className="inline w-4 h-4 mr-3 text-white animate-spin"
                                            viewBox="0 0 100 101"
                                            fill="none"
                                            xmlns="http://www.w3.org/2000/svg"
                                        >
                                            <path
                                                d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                                                fill="#E5E7EB"
                                            />
                                            <path
                                                d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                                                fill="currentColor"
                                            />
                                        </svg>
                                        Loading...
                                    </>
                                ) : (
                                    <span>Create a post</span>
                                )}
                            </button>
                        </form>
                    </div>
                </div>
            </section>
            <ToastContainer />
        </>
    );
}
