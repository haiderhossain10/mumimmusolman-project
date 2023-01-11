import { useParams } from "react-router-dom";
import { useGetBlogQuery } from "../features/blog/blogApi";

export default function BlogDisplay() {
    const { slug } = useParams();
    const { data, isLoading, isError } = useGetBlogQuery(slug);

    var content;

    if (isLoading && !isError) content = "Loading";
    if (!isLoading && isError) content = "Something went wrong";
    if (!isLoading && !isError && data.blog) {
        content = (
            <div className="lg:w-3/4 lg:px-6">
                <img
                    className="object-cover w-full h-80 xl:h-[28rem] rounded-xl"
                    src={`${process.env.REACT_APP_API}/upload/${data.blog?.img}`}
                />
                <div>
                    <p className="mt-6 text-sm text-blue-500 uppercase">
                        {data.blog?.category?.name}
                    </p>
                    <h1 className="max-w-lg mt-4 text-4xl font-semibold leading-tight text-gray-800 dark:text-white">
                        {data.blog?.title}
                    </h1>
                    <div className="flex items-center mt-6">
                        <img
                            className="object-cover object-center w-10 h-10 rounded-full"
                            src={data.blog?.author?.img}
                        />
                        <div className="mx-4">
                            <h1 className="text-sm text-gray-700 dark:text-gray-200">
                                {data.blog?.author?.name}
                            </h1>
                        </div>
                    </div>
                    <div
                        dangerouslySetInnerHTML={{ __html: data.blog.body }}
                        className="mt-10"
                    ></div>
                </div>
            </div>
        );
    }
    return (
        <>
            <section className="bg-white dark:bg-gray-900 my-10">
                <div className="container px-6 py-10 mx-auto">
                    <div className="lg:flex lg:-mx-6">
                        {content}
                        <div className="mt-8 lg:w-1/4 lg:mt-0 lg:px-6">
                            <div>
                                <h3 className="text-blue-500 capitalize">
                                    Design instument
                                </h3>
                                <a
                                    href="#"
                                    className="block mt-2 font-medium text-gray-700 hover:underline hover:text-gray-500 dark:text-gray-400 "
                                >
                                    How to raise $100k+ by using blox ui kit on
                                    your design
                                </a>
                            </div>
                            <hr className="my-6 border-gray-200 dark:border-gray-700" />
                            <div>
                                <h3 className="text-blue-500 capitalize">
                                    UI Resource
                                </h3>
                                <a
                                    href="#"
                                    className="block mt-2 font-medium text-gray-700 hover:underline hover:text-gray-500 dark:text-gray-400 "
                                >
                                    Should you creat UI Product by using Blox?
                                </a>
                            </div>
                            <hr className="my-6 border-gray-200 dark:border-gray-700" />
                            <div>
                                <h3 className="text-blue-500 capitalize">
                                    Premium Collection
                                </h3>
                                <a
                                    href="#"
                                    className="block mt-2 font-medium text-gray-700 hover:underline hover:text-gray-500 dark:text-gray-400 "
                                >
                                    Top 10 Blocks you can get on Blox's
                                    collection.
                                </a>
                            </div>
                            <hr className="my-6 border-gray-200 dark:border-gray-700" />
                            <div>
                                <h3 className="text-blue-500 capitalize">
                                    Premium kits
                                </h3>
                                <a
                                    href="#"
                                    className="block mt-2 font-medium text-gray-700 hover:underline hover:text-gray-500 dark:text-gray-400 "
                                >
                                    Top 10 Ui kit you can get on Blox's
                                    collection.
                                </a>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </>
    );
}
