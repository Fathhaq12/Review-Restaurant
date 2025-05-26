import { DataTypes } from 'sequelize';
import sequelize from '../config/database.js';
import Restaurant from './RestoModel.js';

const Menu = sequelize.define('Menu', {
    name: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    description: {
        type: DataTypes.TEXT,
        allowNull: false,
    },
    price: {
        type: DataTypes.DECIMAL(10, 2),
        allowNull: false,
    },
    restaurantId: {
        type: DataTypes.INTEGER,
        references: {
            model: Restaurant,
            key: 'id',
        }
    }
}, {
    timestamps: true,
    tableName: 'menus',
});

Restaurant.hasMany(Menu, { foreignKey: 'restaurantId' });
Menu.belongsTo(Restaurant, { foreignKey: 'restaurantId' });

export default Menu;
