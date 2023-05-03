const { getDirectoryContents } = require("./controllers/editorController.js");

const router = require("express").Router();

router.get("/get-directory-contents", getDirectoryContents);

module.exports = router;
