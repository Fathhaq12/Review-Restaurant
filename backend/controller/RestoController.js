import Restaurant from "../model/RestoModel.js";

export const getRestaurants = async (req, res) => {
  try {
    const restaurants = await Restaurant.findAll();
    res.json(restaurants);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getRestaurantById = async (req, res) => {
  try {
    const restaurant = await Restaurant.findByPk(req.params.id);
    if (!restaurant)
      return res.status(404).json({ message: "Restaurant not found" });
    res.json(restaurant);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const createRestaurant = async (req, res) => {
  try {
    let imagePath = null;
    if (req.file) {
      imagePath = `/images/${req.file.filename}`;
    }
    const newRestaurant = await Restaurant.create({
      name: req.body.name,
      location: req.body.location,
      category: req.body.category,
      image: imagePath,
    });
    res.status(201).json(newRestaurant);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const updateRestaurant = async (req, res) => {
  try {
    const restaurant = await Restaurant.findByPk(req.params.id);
    if (!restaurant)
      return res.status(404).json({ message: "Restaurant not found" });

    // Siapkan data update
    let updateData = {
      name: req.body.name,
      location: req.body.location,
      category: req.body.category,
    };

    // Jika ada file baru, update juga field image
    if (req.file) {
      updateData.image = `/images/${req.file.filename}`;
    }

    await restaurant.update(updateData);
    res.json(restaurant);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const deleteRestaurant = async (req, res) => {
  try {
    const restaurant = await Restaurant.findByPk(req.params.id);
    if (!restaurant)
      return res.status(404).json({ message: "Restaurant not found" });
    await restaurant.destroy();
    res.json({ message: "Restaurant deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
