import { Sequelize, DataTypes } from "sequelize";

export const sequelize = new Sequelize({
  database: "fc21",
  username: "myuser",
  password: "mypass",
  dialect: "postgres",
  host: "localhost",
});

export const User = sequelize.define(
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

export const City = sequelize.define(
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
