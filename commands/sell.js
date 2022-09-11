const Command = require('../structures/cores/command');
const Eris = require('eris');

const Constants = Eris.Constants;

module.exports = class extends Command {
  constructor(client) {
    super(client, {
      name: 'sell',
      description: 'Sell an ores from your inventory',
      options: [
        {
          name: 'whattosell',
          description: 'What ores you want to sell',
          type: Constants.ApplicationCommandOptionTypes.STRING,
          required: true,
          choices: [
            {
              name: 'all',
              value: 'all',
            },
            {
              name: 'cobblestone',
              value: 'cobblestone',
            },
            {
              name: 'coal',
              value: 'coal',
            },
            {
              name: 'iron',
              value: 'iron',
            },
            {
              name: 'gold',
              value: 'gold',
            },
            {
              name: 'diamond',
              value: 'diamond',
            },
            {
              name: 'netherite',
              value: 'netherite',
            },
            {
              name: 'emerald',
              value: 'emerald',
            },
            {
              name: 'obsidian',
              value: 'obsidian',
            },
          ],
        },
      ],
    });
  }
  async init(interaction) {
    let user = await this.client.utils.user.getdb(interaction.member.id);
    if (!user) {
      return interaction.createMessage({
        embeds: [
          {
            description: `You don't have an inventory yet! Create one with \`/start\` command.`,
            color: 0xff0000,
          },
        ],
        flags: 64,
      });
    }
    let whattosell = interaction.data.options[0].value;
    switch (whattosell) {
      case 'all':
        let msg = "You've sold:\n";
        let total = 0;
        let totalOres = 0;
        for (let [ore, amount] of Object.entries(user.inventory)) {
          if (amount < 1) continue;
          if (ore == 'lapis' || ore == 'redstone' || ore == 'emerald') continue;
          msg += `${this.client.config.emoji[ore]} ${amount} for $${
            this.client.utils.ores.getOrePrice(ore) * amount
          }\n`;
          total += this.client.utils.ores.getOrePrice(ore) * amount;
          user.money += this.client.utils.ores.getOrePrice(ore) * amount;
          user.inventory[ore] = 0;
          totalOres += 1;
        }
        msg += `Total: $${total}`;
        await user.save();
        if (totalOres < 1) {
          return interaction.createMessage({
            embeds: [
              {
                description: `You don't have any ores to sell!`,
                color: 0xff0000,
              },
            ],
            flags: 64,
          });
        }
        return interaction.createMessage({
          embeds: [
            {
              title: 'Sell all ores',
              description: `${msg}`,
              color: 0x1e8449,
            },
          ],
        });
      default:
        if (user.inventory[whattosell] < 1) {
          return interaction.createMessage({
            embeds: [
              {
                description: `You don't have any ${this.client.config.emoji[whattosell]} to sell!`,
                color: 0xff0000,
              },
            ],
            flags: 64,
          });
        }
        let _msg = '';
        user.money +=
          this.client.utils.ores.getOrePrice(whattosell) *
          user.inventory[whattosell];
        _msg += `You've sold ${this.client.config.emoji[whattosell]} ${
          user.inventory[whattosell]
        } for $${
          this.client.utils.ores.getOrePrice(whattosell) *
          user.inventory[whattosell]
        }\n`;
        user.inventory[whattosell] = 0;
        await user.save();
        return interaction.createMessage({
          embeds: [
            {
              title: 'Sell ore',
              description: `${_msg}`,
              color: 0x1e8449,
            },
          ],
        });
    }
  }
};
