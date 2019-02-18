const express = require("express");
const db = require("../../data/helpers/studentDb.js");
const router = express.Router();
// const { authenticate } = require("../middleware/authMidware");

router.get("/", (req, res) => {
  db.get()
    .then(students => {
      res.status(200).json(students);
    })
    .catch(err => res.status(500).json(err.message));
});

router.get("/:id", (req, res) => {
  const { id } = req.params;
  db.get(id)
    .then(student => {
      if (student) {
        res.status(200).json(student);
      } else {
        res.status(404).json({
          message: "The student with the specified ID does not exist."
        });
      }
    })
    .catch(err => {
      res.status(500).json(err.message);
    });
});

router.get("/scores/:id", (req, res) => {
  const { id } = req.params;
  db.getScores(id)
    .then(scores => {
      if (scores) {
        res.status(200).json(scores);
      } else {
        res.status(401).json({
          message:
            "The student with the specified ID does not have any points for this time period."
        });
      }
    })
    .catch(err => {
      res.status(500).json(err.message);
    });
});

router.get("/total/:id", (req, res) => {
  const { id } = req.params;
  db.getTotal(id)
    .then(scores => {
      if (scores) {
        res.status(200).json(scores);
      } else {
        res.status(401).json({
          message:
            "The student with the specified ID does not have any points for this time period."
        });
      }
    })
    .catch(err => {
      res.status(500).json(err.message);
    });
});

router.post("/", async (req, res) => {
  if (!req.body.name) {
    return res
      .status(400)
      .json({ message: "Please provide a name for the student." });
  }

  try {
    let newStudent = await db.insert(req.body);
    let updatedArray = await db.get();
    return res.status(201).json({
      id: newStudent.id,
      name: req.body.name,
      students: updatedArray
    });
  } catch (err) {
    res.status(500).json(err.message);
  }
});

router.delete("/:id", async (req, res) => {
  const { id } = req.params;
  try {
    let student = await db.get(id);
    if (!student) {
      res
        .status(404)
        .json({ message: "The student with the specified ID does not exist." });
    }
    await db.remove(id);
    let updatedArray = await db.get();
    return res.status(200).json({
      student: updatedArray,
      message: "successfully deleted"
    });
  } catch (err) {
    res.status(500).json(err.message);
  }
});

//updates the student and returns the updated array of students
router.put("/:id", async (req, res) => {
  const { id } = req.params;
  const { name } = req.body.name;

  if (!name) {
    return res.status(400).json({ message: "Please provide a name." });
  } else {
    db.get(id).then(student => {
      if (!student) {
        return res.status(404).json({
          message: "The student with the specified ID does not exist."
        });
      }
    });
  }
  try {
    let update = await db.update(id, student);
    let updatedStudent = await db.get(id);
    let updatedArray = await db.get();
    return res
      .status(200)
      .json({ student: updatedNote, students: updatedArray });
  } catch (err) {
    res.status(500).json(err.message);
  }
});

module.exports = router;
