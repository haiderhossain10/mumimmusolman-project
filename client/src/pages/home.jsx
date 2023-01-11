export default function Home() {
    return (
        <>
            <section className="dark:text-gray-100 bg-hero bg-cover bg-center bg-no-repeat relative after:content-[''] after:absolute after:h-full after:w-full after:bg-[rgba(0,0,0,.6)] after:inset-0">
                <div className="container mx-auto flex flex-col items-center px-4 py-16 text-center md:py-32 md:px-10 lg:px-32 relative z-10">
                    <h1 className="text-4xl text-white font-bold leading-none sm:text-5xl">
                        হেরে যাবে শয়তান জিতে যাবে কুরআন|
                    </h1>
                    <p className="px-8 mt-8 mb-12 text-lg text-white">
                        যাদুটোনা, ব্ল্যাকম্যাজিক , বদনজর, কুফরী কালাম, বান ও
                        পুঁতে রাখা তাবিজের প্রভাবে যে যাদু মানুষকে ক্ষতিগ্রস্ত
                        করে সেই সমস্ত সমস্যার সমাধান কুরআন ও হাদিসের আলোকে
                        কিভাবে করতে হয় সেই সংক্রান্ত ভিডিও আপলোড করা হয়।
                    </p>
                    <div className="flex flex-wrap justify-center">
                        <button className="px-8 py-3 m-2 text-lg font-semibold rounded bg-blue-700 dark:bg-violet-400 dark:text-gray-900 text-white">
                            Get started
                        </button>
                        <button className="px-8 py-3 m-2 text-lg border rounded dark:text-gray-50 dark:border-gray-700 text-white">
                            Learn more
                        </button>
                    </div>
                </div>
            </section>
        </>
    );
}
