const mongoose = require('mongoose');

module.exports = mongoose.model(
  'User',
  new mongoose.Schema({
    id: {
      type: String,
      required: true,
    },
    language: { type: String, default: 'en' },
    money: { type: Number, default: 0 },
    xp: { type: Number, default: 0 },
    level: { type: Number, default: 0 },
    currentPickaxe: { type: String, default: 'wood' },
    crates: [
      {
        name: { type: String },
      },
    ],
    pickaxes: [
      {
        pickaxe: { type: String },
        durability: { type: Number },
        enchantments: [
          {
            name: { type: String },
            level: { type: Number },
          },
        ],
      },
    ],
    inventory: {
      cobblestone: {
        type: Number,
        default: 0,
      },
      coal: {
        type: Number,
        default: 0,
      },
      iron: {
        type: Number,
        default: 0,
      },
      redstone: {
        type: Number,
        default: 0,
      },
      lapis: {
        type: Number,
        default: 0,
      },
      gold: {
        type: Number,
        default: 0,
      },
      redstone: {
        type: Number,
        default: 0,
      },
      lapis: {
        type: Number,
        default: 0,
      },
      diamond: {
        type: Number,
        default: 0,
      },
      netherite: {
        type: Number,
        default: 0,
      },
      obsidian: {
        type: Number,
        default: 0,
      },
      emerald: {
        type: Number,
        default: 0,
      },
    },
  })
);
