import { Sequelize, DataTypes } from "sequelize";

async function main() {
  const sequelize = new Sequelize({
    database: "fc21",
    username: "myuser",
    password: "mypass",
    dialect: "postgres",
    host: "localhost",
  });

  const User = sequelize.define(
    "user",
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      age: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
    },
    {
      timestamps: false,
    }
  );

  const City = sequelize.define(
    "city",
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
    },
    { timestamps: false }
  );

  User.belongsTo(City); // FK

  await sequelize.sync({
    // alter: true, // 변화 자동 적용
    force: true, // 테이블을 지우고 다시 적용
  }); // 동기화 반드시!

  const newCity = await City.build({
    name: "Seoul",
  }).save();

  console.log(`newCity`, newCity);

  User.build({
    name: "Jeong",
    age: 30,
    cityId: newCity.getDataValue("id"),
  }).save();

  await sequelize.authenticate();
  await sequelize.close();
}

main();
