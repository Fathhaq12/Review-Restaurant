import Menu from '../model/MenuModel.js';

export const getMenus = async (req, res) => {
    try {
        const menus = await Menu.findAll();
        res.json(menus);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

export const getMenuById = async (req, res) => {
    try {
        const menu = await Menu.findByPk(req.params.id);
        if (!menu) return res.status(404).json({ message: 'Menu not found' });
        res.json(menu);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

export const createMenu = async (req, res) => {
    try {
        const newMenu = await Menu.create(req.body);
        res.status(201).json(newMenu);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

export const updateMenu = async (req, res) => {
    try {
        const menu = await Menu.findByPk(req.params.id);
        if (!menu) return res.status(404).json({ message: 'Menu not found' });
        await menu.update(req.body);
        res.json(menu);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

export const deleteMenu = async (req, res) => {
    try {
        const menu = await Menu.findByPk(req.params.id);
        if (!menu) return res.status(404).json({ message: 'Menu not found' });
        await menu.destroy();
        res.json({ message: 'Menu deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};