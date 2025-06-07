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
    let imagePath = req.body.image || null;

    if (req.file) {
      imagePath = `${req.protocol}://${req.get("host")}/uploads/${
        req.file.filename
      }`;
    } else if (!imagePath) {
      return res.status(400).json({ message: "Image is required" });
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
    if (!restaurant) {
      return res.status(404).json({ message: "Restaurant not found" });
    }

    // Siapkan data update
    let updateData = {
      name: req.body.name,
      location: req.body.location,
      category: req.body.category,
    };

    let imagePath = req.body.image || restaurant.image;
    if (req.file) {
      imagePath = `${req.protocol}://${req.get("host")}/uploads/${
        req.file.filename
      }`;
    }

    updateData.image = imagePath;

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
