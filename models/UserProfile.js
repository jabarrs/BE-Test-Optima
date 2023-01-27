import { Sequelize } from 'sequelize';
import db from '../config/Database.js';
import User from './UserModel.js';

const { DataTypes } = Sequelize;

const Profile = db.define(
  'profile',
  {
    nik: DataTypes.CHAR,
    full_name: DataTypes.STRING,
    gender: DataTypes.ENUM('male', 'female'),
    blood_type: DataTypes.ENUM('A', 'B', 'AB', 'O'),
    photo: DataTypes.STRING,
    url: DataTypes.STRING,
    userId: DataTypes.INTEGER,
  },
  {
    freezeTableName: true,
  }
);

User.hasOne(Profile);
Profile.belongsTo(User, { foreignKey: 'userId' });

export default Profile;
