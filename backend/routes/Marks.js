const express = require('express');
const router = express.Router();
const { body, validationResult } = require('express-validator');
const Marks = require('../models/Marks'); // <== You missed this line

// POST route to create marks
router.post('/createMarks', async (req, res) => {
  try {
    const marksList = req.body; // directly using body array

    if (!Array.isArray(marksList) || marksList.length === 0) {
      return res.status(400).json({ error: 'No marks data provided' });
    }

    await Marks.insertMany(marksList);

    res.status(201).json({ message: "Marks uploaded successfully" });
  } catch (error) {
    console.error('Error uploading marks:', error);
    res.status(500).json({ error: 'Error uploading marks' });
  }
});

router.get('/createMarks', async (req, res) => {
  try {
    const marks = await Marks.find();
    res.json(marks);
  } catch (err) {
    console.error('Error fetching marks:', err);
    res.status(500).json({ error: 'Error fetching marks records' });
  }
});


module.exports = router;
