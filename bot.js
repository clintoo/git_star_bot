// star.js
require('dotenv').config();
const axios = require('axios');

const username = process.env.GITHUB_USERNAME;
const token = process.env.GITHUB_TOKEN;

// List of repositories to star (format: "owner/repo")
const repos = [
  'your-username/project-1',
  'your-username/project-2',
  'your-username/project-3',
];

async function starRepo(repo) {
  const url = `https://api.github.com/user/starred/${repo}`;

  try {
    const response = await axios.put(
      url,
      {},
      {
        auth: {
          username,
          password: token,
        },
        headers: {
          'Accept': 'application/vnd.github+json',
        },
      }
    );

    if (response.status === 204) {
      console.log(`⭐ Starred ${repo}`);
    }
  } catch (error) {
    console.error(`❌ Failed to star ${repo}:`, error.response?.status, error.response?.data);
  }
}

(async () => {
  for (const repo of repos) {
    await starRepo(repo);
  }
})();
