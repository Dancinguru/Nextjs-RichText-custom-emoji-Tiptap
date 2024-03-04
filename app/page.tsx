import { unstable_cache } from "next/cache";
export const dynamic = "force-dynamic";
import { Suspense } from "react";

export default async function Out() {
  return (
    <div>
      <h2>Test Unstable Cache</h2>
      <Suspense fallback="Grabbing random number">
        <Test />
      </Suspense>
    </div>
  );
}
async function Test() {
  const numberUsed = await getRandomInt(2);
  const cacheValue = `numberUsed_${numberUsed}`;

  console.log(cacheValue);
  // Use async/await to fetch and cache data
  const cacheResponse = await unstable_cache(
    async () => getRandomInt(510), // Assuming getCasinos accepts country as an argument
    [cacheValue],
    { revalidate: 900 },
  )();

  console.log(numberUsed + " returns " + cacheResponse);
  let text = numberUsed + " returns " + cacheResponse;

  return text;
}

async function getRandomInt(max) {
  console.log("miss");
  const delay = (ms) => new Promise((res) => setTimeout(res, ms));

  await delay(4000);
  return Math.floor(Math.random() * max);
}
