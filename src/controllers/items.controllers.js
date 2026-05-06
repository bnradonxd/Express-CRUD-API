const itemService = require("../services/items.service");
const db = require("../utils/firebase");

const collection = db.collection("items");


exports.getItems = async (req, res) => {

  const items = await itemService.getItems();

  res.json(items);
};

exports.getItemById = async (req, res) => {

  const item = await itemService.getItemById(req.params.id);

  if (!item) {
    return res.status(404).json({
      message: "No encontrado"
    });
  }

  res.json(item);
};

exports.createItem = async (req, res) => {

  const { name, price } = req.body;

  if (!name || !price) {
    return res.status(400).json({
      message: "Nombre y precio obligatorios"
    });
  }

  const item = await itemService.createItem(req.body);

  res.status(201).json(item);
};

exports.updateItem = async (req, res) => {

  const { name, price } = req.body;

  if (!name || !price) {
    return res.status(400).json({
      message: "Nombre y precio obligatorios"
    });
  }

  const item = await itemService.updateItem(
    req.params.id,
    req.body
  );

  res.json(item);
};

exports.deleteItem = async (req, res) => {

  await itemService.deleteItem(req.params.id);

  res.json({
    message: "Eliminado correctamente"
  });
};

//Update AI

exports.updateItemAI = async (req, res) => {

  try {

    const {
      category,
      tags,
      shortSummary,
      improvedDescription
    } = req.body;

    await collection.doc(req.params.id).update({

      ai: {
        category,
        tags,
        shortSummary,
        improvedDescription
      },

      automation: {
        status: "completed",
        processedAt: new Date().toISOString()
      }

    });

    res.json({
      message: "AI enrichment updated :)"
    });

  } catch (error) {

    console.error("AI UPDATE ERROR:", error);

    res.status(500).json({
      message: "Error updating AI enrichment"
    });

  }

};