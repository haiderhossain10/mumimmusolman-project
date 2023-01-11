import { Link } from "react-router-dom";
import { useGetBlogsQuery } from "../features/blog/blogApi";
import { useEffect, useState } from "react";
import ReactPaginate from "react-paginate";
import moment from "moment";

export default function Blog() {
    const currentPage = localStorage.getItem("blog-current-page") || 1;
    const [page, setPage] = useState(currentPage);
    const [totalPage, setTotalPage] = useState(1);
    const [pageLimit, setPageLimit] = useState(4);
    const { data, isLoading, isError } = useGetBlogsQuery({
        page,
        limit: pageLimit,
    });

    var content;

    if (isLoading && !isError) content = "Loading";
    if (!isLoading && isError) content = "Something went wrong";
    if (!isLoading && !isError && data?.blogs?.length === 0)
        content = "Data not found";
    if (!isLoading && !isError && data?.blogs?.length !== 0) {
        content = data?.blogs?.map((blog) =>
            blog.status === "active" ? (
                <div key={blog._id}>
                    <div className="relative">
                        <Link to={`/blog/${blog.slug}`}>
                            <img
                                className="object-cover object-center w-full h-64 rounded-lg lg:h-80"
                                src={`${process.env.REACT_APP_API}/upload/${blog?.img}`}
                                alt=""
                            />
                        </Link>
                        <div className="absolute bottom-0 flex p-3 items-center bg-white dark:bg-gray-900 ">
                            <img
                                className="object-cover object-center w-10 h-10 rounded-full"
                                src={blog.author.img}
                            />

                            <div className="mx-4">
                                <h1 className="text-sm text-gray-700 dark:text-gray-200">
                                    {blog.author.name}
                                </h1>
                            </div>
                        </div>
                    </div>
                    <p className="pt-4">
                        {moment(blog.createdAt).format(
                            "MMMM Do YYYY, h:mm:ss a"
                        )}
                    </p>
                    <h1 className="mt-6 text-xl font-semibold text-gray-800 dark:text-white">
                        <Link to={`/blog/${blog.slug}`}>{blog.title}</Link>
                    </h1>
                    <Link
                        to={`/blog/${blog.slug}`}
                        className="inline-block mt-4 text-blue-500 underline hover:text-blue-400"
                    >
                        Read more
                    </Link>
                </div>
            ) : undefined
        );
    }

    // total page number
    useEffect(() => {
        const currentPage = Math.ceil(data?.length / pageLimit);
        setTotalPage(currentPage);
    }, [setPage, data, pageLimit]);

    // pagination handler
    const handlePageClick = (e) => {
        setPage(e.selected + 1);
        localStorage.setItem("blog-current-page", e.selected + 1);
    };

    return (
        <>
            <section className="bg-white dark:bg-gray-900">
                <div className="container px-6 py-10 mx-auto">
                    <div className="text-center">
                        <h1 className="text-3xl font-semibold text-gray-800 capitalize lg:text-4xl dark:text-white">
                            Our Blogs
                        </h1>
                    </div>
                    <div className="grid grid-cols-1 gap-8 mt-8 md:mt-16 md:grid-cols-2 xl:grid-cols-3">
                        {content}
                    </div>

                    <div className="flex justify-center pt-20">
                        <ReactPaginate
                            className="flex items-center"
                            breakLabel="..."
                            nextLabel={
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    className="w-5 h-5"
                                    viewBox="0 0 20 20"
                                    fill="currentColor"
                                >
                                    <path
                                        fillRule="evenodd"
                                        d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
                                        clipRule="evenodd"
                                    />
                                </svg>
                            }
                            onPageChange={handlePageClick}
                            pageRangeDisplayed={5}
                            forcePage={page - 1}
                            pageCount={totalPage}
                            pageLinkClassName="px-4 py-2 mx-1 text-gray-700 transition-colors duration-300 transform bg-white rounded-md sm:inline dark:bg-gray-800 dark:text-gray-200 hover:bg-blue-500 dark:hover:bg-blue-500 hover:text-white dark:hover:text-gray-200"
                            nextClassName="px-4 py-2 mx-1 text-gray-700 transition-colors duration-300 transform bg-white rounded-md sm:inline dark:bg-gray-800 dark:text-gray-200 hover:bg-blue-500 dark:hover:bg-blue-500 hover:text-white dark:hover:text-gray-200"
                            previousClassName="px-4 py-2 mx-1 text-gray-700 transition-colors duration-300 transform bg-white rounded-md sm:inline dark:bg-gray-800 dark:text-gray-200 hover:bg-blue-500 dark:hover:bg-blue-500 hover:text-white dark:hover:text-gray-200"
                            activeLinkClassName="bg-blue-500 !text-white"
                            previousLabel={
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    className="w-5 h-5"
                                    viewBox="0 0 20 20"
                                    fill="currentColor"
                                >
                                    <path
                                        fillRule="evenodd"
                                        d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z"
                                        clipRule="evenodd"
                                    />
                                </svg>
                            }
                        />
                    </div>
                </div>
            </section>
        </>
    );
}
