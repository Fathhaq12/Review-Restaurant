import { DataTypes } from 'sequelize';
import sequelize from '../config/database.js';

const Restaurant = sequelize.define('Restaurant', {
    name: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    location: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    category: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    image : {
        type: DataTypes.STRING,
        allowNull: true,
    },
}, {
    timestamps: true,
    tableName: 'restaurants',
});

export default Restaurant;