const express = require("express");
const db = require("../../data/helpers/scoreDb");
const router = express.Router();
// const { authenticate } = require("../middleware/authMidware");

router.get("/", (req, res) => {
  db.find()
    .then(scores => {
      res.status(200).json(scores);
    })
    .catch(err => res.status(500).json(err.message));
});

router.get("/:id", (req, res) => {
  const { id } = req.params;
  db.find(id)
    .then(score => {
      if (score) {
        res.status(200).json(score);
      } else {
        res.status(404).json({ message: "This record no longer exists." });
      }
    })
    .catch(err => {
      res.status(500).json(err.message);
    });
});

router.get("/student/:studentId", (req, res) => {
  const { studentId } = req.params;
  db.findByStudent(studentId)
    .then(scores => {
      res.status(200).json(scores);
    })
    .catch(err => res.status(500).json(err.message));
});

router.post("/", async (req, res) => {
  if (
    !req.body.task ||
    !req.body.points ||
    !req.body.points ||
    !req.body.date
  ) {
    return res.status(400).json({ message: "Please provide all information." });
  }

  try {
    let newScore = await db.insert(req.body);
    let updatedArray = await db.find();
    // let dateStamp =  new Date();
    return res.status(201).json({
      id: newScore.id,
      task: req.body.task,
      points: req.body.points,
      scores: updatedArray,
      date: req.body.date,
      student: req.body.studentId
    });
  } catch (err) {
    res.status(500).json(err.message);
  }
});

router.delete("/:id", async (req, res) => {
  const { id } = req.params;
  try {
    let score = await db.find(id);
    if (!score) {
      res
        .status(404)
        .json({ message: "The score with the specified ID does not exist." });
    }
    await db.remove(id);
    let updatedArray = await db.find();
    return res.status(200).json({
      scores: updatedArray,
      message: "successfully deleted"
    });
  } catch (err) {
    res.status(500).json(err.message);
  }
});

//updates the score and returns the updated array of scores
router.put("/:id", async (req, res) => {
  const { id } = req.params;
  const { name, task, points, date, studentId } = req.body;
  const score = { name, task, points, date, studentId };

  if (!score) {
    return res.status(400).json({ message: "Please provide all information." });
  } else {
    db.find(id).then(score => {
      if (!score) {
        return res
          .status(404)
          .json({ message: "The score with the specified ID does not exist." });
      }
    });
  }
  try {
    let update = await db.update(id, score);
    let updatedScore = await db.find(id);
    let updatedArray = await db.find();
    return res.status(200).json({ score: updatedScore, scores: updatedArray });
  } catch (err) {
    res.status(500).json(err.message);
  }
});

module.exports = router;
