import { DataTypes } from 'sequelize';
import sequelize from '../config/database.js';
import User from './UserModel.js';
import Restaurant from './RestoModel.js';
import Menu from './MenuModel.js';

const Review = sequelize.define('Review', {
    rating: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    comment: {
        type: DataTypes.TEXT,
        allowNull: false,
    },
    userId: {
        type: DataTypes.INTEGER,
        references: {
            model: User,
            key: 'id',
        }
    },
    restaurantId: {
        type: DataTypes.INTEGER,
        references: {
            model: Restaurant,
            key: 'id',
        }
    },
    menuId: {
        type: DataTypes.INTEGER,
        references: {
            model: Menu,
            key: 'id',
        },
        allowNull: true
    }
}, {
    timestamps: true,
    tableName: 'reviews',
});

User.hasMany(Review, { foreignKey: 'userId' });
Restaurant.hasMany(Review, { foreignKey: 'restaurantId' });
Menu.hasMany(Review, { foreignKey: 'menuId' });
Review.belongsTo(User, { foreignKey: 'userId' });
Review.belongsTo(Restaurant, { foreignKey: 'restaurantId' });
Review.belongsTo(Menu, { foreignKey: 'menuId' });

export default Review;