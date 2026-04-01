const express = require('express');
const User = require('../models/User');

const router = express.Router();

router.post('/onboard', async (req, res) => {
  const user = await User.findById(req.user.id);
  user.interests = req.body.interests;
  user.intention = req.body.intention;
  await user.save();
  res.send('Profile updated');
});

router.get('/profile', async (req, res) => {
  // Find a profile with shared interests (simplified)
  const profiles = await User.find({ _id: { $ne: req.user.id } });
  const matching = profiles.filter(p => p.interests.some(i => req.user.interests.includes(i)));
  res.send(matching[0]); // Return one
});

router.post('/interest', async (req, res) => {
  // Simplified mutual check: Assume if the other user has "interested" you (in a real app, use a separate collection)
  const isMutual = Math.random() > 0.5; // Placeholder; replace with actual logic
  res.send({ mutual: isMutual });
});

module.exports = router;