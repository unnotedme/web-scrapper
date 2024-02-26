import puppeteer from "puppeteer";
import { MongoClient } from "mongodb";

(async () => {
  // Start a Puppeteer session with:
  // - a visible browser (`headless: false` - easier to debug because you'll see the browser in action)
  // - no default viewport (`defaultViewport: null` - website page will in full width and height)
  const browser = await puppeteer.launch({
    headless: false,
    defaultViewport: null,
  });

  // Open a new page
  const page = await browser.newPage();

  // Connect to MongoDB
  const mongoURI = "mongodb://localhost:27017"; // Update with your MongoDB URI
  const dbName = "forumPosts";
  const collectionName = "posts";
  const client = new MongoClient(mongoURI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });
  await client.connect();
  const db = client.db(dbName);
  const collection = db.collection(collectionName);


  // On this new page:
  // - open the "https://forums.redflagdeals.com/hot-deals-f9/" website
  // - wait until the dom content is loaded (HTML is ready)
  await page.goto("https://forums.redflagdeals.com/hot-deals-f9/", {
    waitUntil: "domcontentloaded",
  });

  // Scrape posts
  const posts = await page.evaluate(() => {
    const postElements = document.querySelectorAll('.topictitle');
    const posts = [];
    postElements.forEach(post => {
      posts.push(post.textContent.trim());
    });
    return posts;
  });

  // Insert posts into MongoDB
  for (const post of posts) {
    // Check if post already exists in the database
    const existingPost = await collection.findOne({ title: post });
    if (!existingPost) {
      // Insert post into the collection
      await collection.insertOne({ title: post });
      console.log(`Inserted: ${post}`);
    } else {
      console.log(`Skipped duplicate: ${post}`);
    }
  }

  // Close connections
  await browser.close();
  await client.close();
})();