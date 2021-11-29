/************************
 * TO DO/IMPROVEMENTS:
 * - Refactor the routing to either be separate Router files for each
 * OR
 * - Use the provided path to complete the necessary task
 * - Complete bonus requirements on README.md file
*************************/


const express = require("express");
const apiRouter = express.Router();
const {
  createMeeting,
  getAllFromDatabase,
  getFromDatabaseById,
  addToDatabase,
  updateInstanceInDatabase,
  deleteFromDatabasebyId,
  deleteAllFromDatabase,
} = require("./db");
const checkMillionDollarIdea = require('./checkMillionDollarIdea')

/*************
 * MINIONS *
 **************/
apiRouter.get("/minions", (req, res, next) => {
  const minions = getAllFromDatabase("minions");
  if (minions) {
    res.send(minions);
  } else {
    res.status(404).send("Failed to get all minions");
  }
});

apiRouter.post("/minions", (req, res, next) => {
  const newMinion = addToDatabase("minions", req.body);
  if (newMinion) {
    console.log("Added minion name: " + newMinion.name);
    res.status(201).send(newMinion);
  } else {
    console.log("Failed to add minion...");
    res.status(404).send("Failed to add minion");
  }
});

apiRouter.get("/minions/:minionid", (req, res, next) => {
  const minion = getFromDatabaseById("minions", req.params.minionid);
  if (minion) {
    res.send(minion);
  } else {
    res.status(404).send("Minion not found!");
  }
});

apiRouter.put("/minions/:minionid", (req, res, next) => {
  const updates = {
    id: req.params.id,
    ...req.body
  };
  const updatedMinion = updateInstanceInDatabase('minions', updates);
  if(updatedMinion) {
    console.log('Updated minion name: ' + updatedMinion.name)
    res.send(updatedMinion);
  } else {
    console.log('Failed to update minion')
    res.status(404).send('Failed to update minion')
  }
});

apiRouter.delete("/minions/:minionid", (req, res, next) => {
  console.log("Start minion removal");
  const removedMinion = getFromDatabaseById("minions", req.params.minionid);
  if (removedMinion) {
    deleteFromDatabasebyId("minions", req.params.minionid);
    console.log("Removed minion name: " + removedMinion.name);
    res.status(204).send(removedMinion);
  } else {
    console.log("ERROR: Minion removal failed...");
    res.status(404).send("Request failed. Minion not found!");
  }
});

/*************
 * IDEAS *
 **************/
apiRouter.get("/ideas", (req, res, next) => {
  const ideas = getAllFromDatabase("ideas");
  if (ideas) {
    res.send(ideas);
  } else {
    res.status(404).send("Failed to get all ideas");
  }
});

apiRouter.post("/ideas", checkMillionDollarIdea, (req, res, next) => {
  const newIdea = addToDatabase("ideas", req.body);
  if (newIdea) {
    console.log("Added idea name: " + newIdea.name);
    res.status(201).send(newIdea);
  } else {
    console.log("Failed to add idea...");
    res.status(404).send("Could not create new idea");
  }
});

apiRouter.get("/ideas/:ideaid", (req, res, next) => {
  const idea = getFromDatabaseById("ideas", req.params.ideaid);
  if (idea) {
    res.send(idea);
  } else {
    res.status(404).send("Idea not found!");
  }
});

apiRouter.put("/ideas/:ideaid", (req, res, next) => {
  const updates = {
    id: req.params.id,
    ...req.body,
  };
  const updatedIdea = updateInstanceInDatabase("ideas", updates);
  if (updatedIdea) {
    console.log("Updated idea name: " + updatedIdea.name);
    res.send(updatedIdea);
  } else {
    console.log("Failed to update idea");
    res.status(404).send("Failed to update idea");
  }
});

apiRouter.delete("/ideas/:ideaid", (req, res, next) => {
  const removedIdea = getFromDatabaseById("ideas", req.params.ideaid);
  if (removedIdea) {
    deleteFromDatabasebyId("ideas", req.params.ideaid);
    console.log("Removed idea name: " + removedIdea.name);
    res.status(204).send(removedIdea);
  } else {
    console.log("ERROR: idea removal failed...");
    res.status(404).send("Request failed. idea not found!");
  }
});

/*************
 * MEETINGS *
 **************/
apiRouter.get("/meetings", (req, res, next) => {
  const meetings = getAllFromDatabase("meetings");
  if (meetings) {
    res.send(meetings);
  } else {
    res.status(404).send("Failed to get all meetings");
  }
});

apiRouter.post("/meetings", (req, res, next) => {
  const newMeeting = createMeeting();
  if (newMeeting) {
    console.log("New Meeting Created: " + newMeeting.note);
    res.status(201).send(newMeeting);
  } else {
    res.status(404).send("Failed to create new meeting");
  }
});

apiRouter.delete("/meetings", (req, res, next) => {
  const deletedMeetings = deleteAllFromDatabase("meetings")
  if (deletedMeetings) {
    console.log("Deleted all meetings");
    res.status(204).send(deletedMeetings);
  } else {
    res.status(404).send("Failed to delete all meetings");
  }
});

module.exports = apiRouter;
