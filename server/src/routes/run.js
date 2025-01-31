const express = require('express');
const { exec } = require('child_process');
const router = express.Router();

router.post('/run', (req, res) => {
  const { code } = req.body;

  // Save the code to a temporary file
  const fs = require('fs');
  const filePath = './tempCode.js';
  fs.writeFileSync(filePath, code);

  // Execute the code using Node.js
  exec(`node ${filePath}`, (error, stdout, stderr) => {
    if (error) {
      res.json({ output: stderr });
    } else {
      res.json({ output: stdout });
    }

    // Clean up the temporary file
    fs.unlinkSync(filePath);
  });
});

module.exports = router;