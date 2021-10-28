import { Client } from "pg";
import { Command } from "commander";
import prompts from "prompts";
const program = new Command();

async function connect() {
  const client = new Client({
    user: "myuser",
    password: "mypass",
    database: "fc21",
  });

  await client.connect();
  return client;
}

program.command("list").action(async () => {
  const client = await connect();

  const query = `SELECT * FROM users`;
  const result = await client.query(query);

  console.log(result.rows);

  await client.end();
});

program.command("add").action(async () => {
  const client = await connect();
  const userName = await prompts({
    type: "text",
    name: "userName",
    message: "Provide a user name to insert.",
  });

  // const query = `INSERT INTO users(name) VALUES ('${userName.userName}')`;
  const query = `INSERT INTO users(name) VALUES ($1::text)`;
  await client.query(query, [userName.userName]);

  await client.end();
});

program.command("remove").action(async () => {
  const client = await connect();

  const userName = await prompts({
    type: "text",
    name: "userName",
    message: "Provide a user name to delete.",
  });

  // SQL injection이 가능한 코드
  // const inserted = `' OR '' = '`
  // const query = `DELETE FROM users WHERE name='${userName.userName}'`;
  const query = `DELETE FROM users WHERE name=$1::text`; // Injection 방어
  await client.query(query, [userName.userName]);

  await client.end();
});

program.parse();
