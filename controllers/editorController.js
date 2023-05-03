// steps to follow for every single controller in here.
// get container from the room-id
// execute the command in the container
// parse the output

const docker = require("../docker");
const execute_command = require("../services/executeCommand");

async function getDirectoryContents(req, res) {
  const { location } = req.query;
  console.log(location);

  // get container..
  const containerId =
    "e81aa3f18248efba3bcf5c1da38667f2407f1605195b696d2a83c25d6e3a7270";
  const container = docker.getContainer(containerId);

  // executing command..
  const command = ["/bin/bash", "-c", `./script_ls.sh ${location}`];
  const result = await execute_command(container, command);

  // parsing output..

  const data = result.split("\n");
  let status = data[data.length - 1];

  if (status != "0")
    return res.json({ status: "ERROR", message: data.slice(0, -1).join(" ") });

  let files = [];
  let folders = [];
  data.slice(0, -1).forEach((name) => {
    if (name.endsWith("/")) folders.push(name);
    else files.push(name);
  });

  return res.json({ status: "OK", files, folders });
}

module.exports = {
  getDirectoryContents,
};
