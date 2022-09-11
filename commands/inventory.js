const Command = require('../structures/cores/command');

module.exports = class extends Command {
  constructor(client) {
    super(client, {
      name: 'inventory',
      description: 'View your inventory.',
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
    const inventory = user.inventory;
    let pick_data = await this.client.utils.pickaxes.getCurrentPickaxeData(
      user
    );
    interaction.createMessage({
      embeds: [
        {
          title: 'Inventory - ' + interaction.member.user.username,
          description: `**Pickaxe:** ${this.client.utils.pickaxes.getCurrentPickaxeName(
            user.currentPickaxe
          )} pickaxe\n**Durability:** ${pick_data.durability}/${
            this.client.config.pickaxeData[pick_data.pickaxe].maxDurability
          }\n**XP:** ${user.xp}/${this.client.utils.level.getLevelXP(
            user.level
          )}\n**Level:** ${user.level}\n**Money:** $${user.money}`,
          color: 0x1e8449,
          fields: [
            {
              name: 'Resources',
              value: `${this.client.config.emoji.cobblestone} Cobblestone: ${inventory.cobblestone}\n${this.client.config.emoji.coal} Coal: ${inventory.coal}\n${this.client.config.emoji.iron} Iron: ${inventory.iron}\n${this.client.config.emoji.redstone} Redstone: ${inventory.redstone}\n${this.client.config.emoji.lapis} Lapis Lazuli: ${inventory.lapis}\n${this.client.config.emoji.gold} Gold: ${inventory.gold}\n${this.client.config.emoji.diamond} Diamond: ${inventory.diamond}\n${this.client.config.emoji.netherite} Netherite: ${inventory.netherite}\n${this.client.config.emoji.emerald} Emerald: ${inventory.emerald}\n${this.client.config.emoji.obsidian} Obsidian: ${inventory.obsidian}`,
            },
          ],
          timestamp: new Date(),
        },
      ],
    });
  }
};
