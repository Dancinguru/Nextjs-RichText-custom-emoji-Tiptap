import { getShout } from "./_lib/process";
import Image from "next/image";

export default async function ShoutFeed({ type }) {
  let shouts = [
    {
      author: {
        name: "Bob",

        image:
          "https://www.allfreechips.com/chat/avatar/cljebglve0000k208j7bx35db",
      },
      id: 1,
      createdAt: new Date(),
      message: "WEll Hello there",
    },
    {
      author: {
        name: "Bob",
        image:
          "https://www.allfreechips.com/chat/avatar/cljebglve0000k208j7bx35db",
      },
      id: 2,
      createdAt: new Date(),
      message: "WEll Hello there",
    },
  ];
  return (
    <div>
      <h3>Feed ....</h3>

      {shouts?.map((s) => (
        <div
          key={s?.id}
          className="border-t border-gray-200 bg-white p-6 text-base dark:border-gray-700 dark:bg-gray-900"
        >
          <div className="mb-2 flex items-center justify-between">
            <div className="flex items-center">
              <p className="mr-3 inline-flex items-center text-sm text-gray-900 dark:text-white">
                <picture>
                  {s?.author?.image && (
                    <Image
                      unoptimized
                      className="mr-4 rounded-full sm:h-6 sm:w-6 md:h-8 md:w-8 lg:h-12 lg:w-12"
                      src={s?.author?.image}
                      alt={s?.author?.name ? s?.author?.name : "No Avatar"}
                      width={100}
                      height={100}
                    />
                  )}
                  {!s?.author?.image && (
                    <span className="mr-4 flex items-center justify-center rounded-full bg-yellow-500 text-white sm:h-6 sm:w-6 md:h-8 md:w-8 lg:h-12 lg:w-12">
                      {s?.author?.name}
                    </span>
                  )}
                </picture>
                {s?.author?.name}
              </p>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                {s?.createdAt.toLocaleString()}
              </p>
            </div>
          </div>
          <p className="text-gray-500 dark:text-gray-400">{s?.message}</p>
        </div>
      ))}
    </div>
  );
}
