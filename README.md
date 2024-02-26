# Forum Post Scraper

This Node.js application scrapes forum posts from a specified website using Puppeteer and stores them in a MongoDB database. It ensures that no duplicate posts are saved.

## Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/yourusername/forum-post-scraper.git
   ```

2. Install dependencies:

   ```bash
   cd forum-post-scraper
   npm install
   ```

3. Set up MongoDB:

   - Install MongoDB on your local machine or use a cloud-based MongoDB service.
   - Update the `mongoURI` variable in the scraper script (`scraper.js`) with your MongoDB connection string.

## Usage

1. Run the scraper script:

   ```bash
   npm start
   ```

   This will launch Puppeteer, scrape the first entry of each forum post from the specified website, and store them in the MongoDB database.

## Configuration

- Modify the `sourceUrl` variable in the scraper script (`scraper.js`) to specify the URL of the website to scrape.
- Adjust the CSS selector used to locate the post titles based on the structure of the forum page.

## Dependencies

- [Node.js](https://nodejs.org/)
- [Puppeteer](https://github.com/puppeteer/puppeteer) - Headless Chrome Node.js API
- [MongoDB](https://www.mongodb.com/) - NoSQL database

## Contributing

Contributions are welcome! Feel free to open issues or submit pull requests.

## License

This project is licensed under the [MIT License](LICENSE).
