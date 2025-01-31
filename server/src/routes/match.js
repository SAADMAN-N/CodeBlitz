const express = require('express');
const router = express.Router();

let waitingUsers = [];

router.post('/match', (req, res) => {
  const { userId, skillLevel } = req.body;

  // Check if there is a waiting user with the same skill level
  const matchIndex = waitingUsers.findIndex(user => user.skillLevel === skillLevel);

  if (matchIndex !== -1) {
    // Match found
    const matchedUser = waitingUsers.splice(matchIndex, 1)[0];
    res.json({ match: true, opponent: matchedUser.userId });
  } else {
    // No match found, add user to waiting list
    waitingUsers.push({ userId, skillLevel });
    res.json({ match: false });
  }
});

module.exports = router;