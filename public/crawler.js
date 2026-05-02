import { redis, RedisClient } from 'bun';

async function main() {
  const delay = ms => new Promise(resolve => setTimeout(resolve, ms));

  console.log('Running crawler...');

  const redisUrl = process.env.REDIS_URL;

  console.log(`Using Redis URL: ${redisUrl}`);

  if (!redisUrl) {
    throw new Error('REDIS_URL is not defined');
  }

  // const redis = new RedisClient(redisUrl);

  // await redis.connect();
  console.log('Connected to Redis');

  const key = `crawler:ping:${Date.now()}`;
  const value = `hello-from-crawler-${new Date().toISOString()}`;

  await redis.set(key, value);
  console.log(`SET ${key} = ${value}`);

  const result = await redis.get(key);

  console.log(`GET ${key} -> ${result}`);

  if (result === value) {
    console.log('Redis SET/GET OK');
  } else {
    console.error('Redis SET/GET MISMATCH');
  }

  await redis.close();

  async function fetchPage(url, count = 0) {
    await delay(1000);

    console.log(`Crawled ${count} pages..`);

    if (count >= 3) {
      return;
    }

    return fetchPage(url, count + 1);
  }

  await fetchPage('https://test.com');

  console.log('Finished running crawler...');

  return true;
}

main().catch(err => {
  console.error('Crawler failed:', err);
  process.exit(1);
});
