// backend/index.js
const express = require('express');
const cors = require('cors');
const axios = require('axios');
require('dotenv').config();

const app = express();
app.use(cors());
app.use(express.json());

app.post('/run', async (req, res) => {
  let { language, code, stdin } = req.body;

  // --- SMART JAVA FIX ---
  // If the language is Java, we will find the public class name and replace it with "Main"
  if (language === 'java') {
    // This regex finds "public class YourClassName"
    const classNameRegex = /public\s+class\s+([A-Za-z_][A-Za-z0-9_]*)/;
    const match = code.match(classNameRegex);

    if (match && match[1] && match[1] !== 'Main') {
      const originalClassName = match[1];
      // Replace all occurrences of the original class name with "Main"
      // This is important for constructors and other references.
      const escapedClassName = new RegExp(originalClassName, 'g');
      code = code.replace(escapedClassName, 'Main');
    }
  }
  // --- END OF SMART JAVA FIX ---

  const languageMap = {
    javascript: 93,
    python: 92,
    java: 91,
    c: 75,
    cpp: 76,
  };

  const languageId = languageMap[language];
  if (!languageId) {
    return res.status(400).json({ error: 'Unsupported language' });
  }

  const options = {
    method: 'POST',
    url: 'https://judge0-ce.p.rapidapi.com/submissions',
    params: { base64_encoded: 'false', fields: '*' },
    headers: {
      'content-type': 'application/json',
      'X-RapidAPI-Key': process.env.RAPIDAPI_KEY,
      'X-RapidAPI-Host': 'judge0-ce.p.rapidapi.com',
    },
    data: {
      language_id: languageId,
      source_code: code, // Send the (potentially modified) code
      stdin: stdin,
    },
  };

  try {
    const response = await axios.request(options);
    const token = response.data.token;

    const checkStatus = async () => {
      const statusResponse = await axios.get(
        `https://judge0-ce.p.rapidapi.com/submissions/${token}`,
        {
          headers: {
            'X-RapidAPI-Key': process.env.RAPIDAPI_KEY,
            'X-RapidAPI-Host': 'judge0-ce.p.rapidapi.com',
          },
        }
      );

      const status = statusResponse.data.status.id;
      if (status <= 2) {
        setTimeout(checkStatus, 1000);
      } else {
        res.json(statusResponse.data);
      }
    };

    setTimeout(checkStatus, 1000);
  } catch (error) {
    console.error('Error calling Judge0 API:', error.response ? error.response.data : error.message);
    res.status(500).json({ error: 'Failed to execute code on the server.' });
  }
});

const PORT = process.env.PORT || 8000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT} Successfully!`);
});
