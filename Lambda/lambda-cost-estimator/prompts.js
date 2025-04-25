import inquirer from "inquirer";
import fs from "fs";

export async function selectFunctionAndArgs() {
  const files = fs.readdirSync("./functions").filter(f => f.endsWith(".js"));

  const { file } = await inquirer.prompt([
    {
      name: "file",
      type: "list",
      message: "Select a function file:",
      choices: files
    }
  ]);

  const module = await import(`./functions/${file}`);
  const functions = Object.keys(module);

  const { functionName } = await inquirer.prompt([
    {
      name: "functionName",
      type: "list",
      message: "Choose a function to test:",
      choices: functions
    }
  ]);

  const { args } = await inquirer.prompt([
    {
      name: "args",
      type: "input",
      message: "Enter parameters (comma-separated):"
    }
  ]);

  const { monthlyInvocations } = await inquirer.prompt([
    {
      name: "monthlyInvocations",
      type: "number",
      message: "Estimated number of monthly invocations:",
      validate: val => (val >= 0 ? true : "Must be non-negative")
    }
  ]);

  const { benchmarkCount } = await inquirer.prompt([
    {
      name: "benchmarkCount",
      type: "number",
      message: "How many times should we run the function to get an average?",
      default: 5,
      validate: val => (val > 0 ? true : "Must be a positive number")
    }
  ]);

  return {
    fn: module[functionName],
    args: args.split(",").map(s => s.trim()),
    monthlyInvocations,
    benchmarkCount
  };
}
