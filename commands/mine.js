const Command = require('../structures/cores/command');

module.exports = class extends Command {
  constructor(client) {
    super(client, {
      name: 'mine',
      description: 'Mine for ores!',
    });
  }
  async init(interaction) {
    let user = await this.client.utils.user.getdb(interaction.member.id);
    if (!user) {
      return interaction.createMessage({
        embeds: [
          {
            description: `You can't mine without an inventory! Create one with \`/start\` command.`,
            color: 0xff0000,
          },
        ],
      });
    }
    let pickaxe = this.client.utils.pickaxes.getCurrentPickaxeData(user);
    if (
      await this.client.utils.cooldowns.hasRaw(interaction.member.id, 'repair')
    ) {
      if (
        (await this.client.utils.cooldowns.whenExpire(
          interaction.member.id,
          'repair'
        )) < Date.now()
      ) {
        pickaxe.durability =
          this.client.config.pickaxeData[pickaxe.pickaxe].maxDurability;
        await user.save();
        await this.client.utils.cooldowns.remove(
          interaction.member.id,
          'repair'
        );
      }
    }
    if (await this.client.utils.cooldowns.has(interaction.member.id, 'mine')) {
      return interaction.createMessage({
        embeds: [
          {
            description: `You can mine again in ${this.client.utils.time.format(
              (await this.client.utils.cooldowns.whenExpire(
                interaction.member.id,
                'mine'
              )) - Date.now()
            )}!`,
            color: 0xff0000,
          },
        ],
        flags: 64,
      });
    }
    if (pickaxe.durability <= 0) {
      return interaction.createMessage({
        embeds: [
          {
            description: `Your current pickaxe is broken! Type \`/repair\` to repair it!\nYou can also wait 30 minutes.`,
            color: 0xff0000,
          },
        ],
        flags: 64,
      });
    }
    await this.client.utils.cooldowns.set(
      interaction.member.id,
      'mine',
      Date.now() +
        (30000 - this.client.utils.enchantments.getEfficiencyRatio(user))
    );
    let totalMined = 0;
    let loot = await this.client.utils.pickaxes.getLoot(pickaxe.pickaxe);
    let ores = loot[0].split(';');
    let message = "You've mined:\n";
    for (let ore of ores) {
      let oreData = ore.split(':');
      totalMined +=
        oreData[1] * this.client.utils.enchantments.getFortuneRatio(user);
      user.inventory[oreData[0]] +=
        oreData[1] * this.client.utils.enchantments.getFortuneRatio(user);
      message += `${
        oreData[1] * this.client.utils.enchantments.getFortuneRatio(user)
      } ${this.client.config.emoji[oreData[0]]}\n`;
    }
    message += `with your ${this.client.utils.pickaxes.getCurrentPickaxeName(
      pickaxe.pickaxe
    )} pickaxe!`;
    if (pickaxe.durability < totalMined) {
      pickaxe.durability = 0;
    } else {
      pickaxe.durability -=
        totalMined *
        (1 - this.client.utils.enchantments.getUnbreakingRatio(user) / 100);
    }
    user.xp += this.client.utils.number.randomint(1, 3) * totalMined;
    let fields = [];
    if (user.xp >= this.client.utils.level.getLevelXP(user.level)) {
      fields.length > 0
        ? fields.push([
            {
              name: '🎉 Level Up!',
              value: `You've leveled up to level ${user.level + 1}!`,
            },
          ])
        : (fields = [
            {
              name: '🎉 Level Up!',
              value: `You've leveled up to level ${user.level + 1}!`,
            },
          ]);
      user.level += 1;
      user.xp = 0;
    }
    if (pickaxe.durability <= 0) {
      fields.length > 0
        ? fields.push([
            {
              name: '⚒️ Pickaxe Broke!',
              value: `Your pickaxe broke! Type \`/repair\` to repair it!\nYou can also wait 30 minutes.`,
            },
          ])
        : (fields = [
            {
              name: '⚒️ Pickaxe Broke!',
              value: `Your pickaxe broke! Type \`/repair\` to repair it!\nYou can also wait 30 minutes.`,
            },
          ]);
      await this.client.utils.cooldowns.set(
        interaction.member.id,
        'repair',
        Date.now() + 1_800_000
      );
    }
    await user.save();
    return interaction.createMessage({
      embeds: [
        {
          title: 'Mine',
          description: message,
          color: 0x1e8449,
          fields: fields || [],
        },
      ],
    });
  }
};
