function decoder(data) {
  // console.log('[decoder]', JSON.stringify(data))
  let buffer = data.slice(8);
  const res = buffer.toString();
  return res;
}

async function execute_command(container, command) {
  // console.log("[LOGGER] entering execute_command");

  const exec = await container.exec({
    Cmd: command,
    AttachStdout: true,
    AttachStderr: true,
    Tty: false,
  });

  const stream = await exec.start({
    Detach: false,
    Tty: false,
  });

  let output = "";

  await new Promise((resolve, reject) => {
    stream.on("data", (chunk) => {
      output += decoder(chunk);
    });
    stream.on("end", () => {
      resolve();
    });
    stream.on("error", (err) => {
      reject(err);
    });
  });

  await exec.inspect();

  // console.log("[LOGGER] exiting execute_command", JSON.stringify(output));
  return output;
}

module.exports = execute_command;
