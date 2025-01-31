const express = require('express');
const { exec } = require('child_process');
const router = express.Router();

router.post('/run', (req, res) => {
  const { code } = req.body;
  console.log('Received code to run:', code);

  // Save the code to a temporary file
  const fs = require('fs');
  const filePath = './tempCode.js';
  fs.writeFileSync(filePath, code);

  // Execute the code using Node.js
  exec(`node ${filePath}`, (error, stdout, stderr) => {
    if (error) {
      console.error('Error running code:', stderr);
      res.json({ output: stderr });
    } else {
      console.log('Code output:', stdout);
      res.json({ output: stdout });
    }

    // Clean up the temporary file
    fs.unlinkSync(filePath);
  });
});

module.exports = router;