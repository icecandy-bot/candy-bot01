const { Client, ContextMenuInteraction } = module.require("discord.js");

module.exports = {
    name: 'Kill A User',
    description: '殺死另一位使用者或自己',
    category: '上下文',
    userPermissions: [],
    type: 'USER',
    emoji: "📡",
      /** 
     * @param {Client} client 
     * @param {ContextMenuInteraction} interaction 
     * @param {String[]} args 
     */
  run: async (client, interaction, args) => {
    const target = await client.users.fetch(interaction.targetId);
    let author = interaction.member;
    var kills = [
      `${author} 按下了 ${target}.exe 的 Alt+F4！`,
      `${author} 嘗試吹奏長笛，結果炸死了 ${target}。`,
      `${author} 因聽音樂太大聲而爆破了 ${target} 的耳膜。`,
      `${author} 向 ${target} 發起一場致命的拳擊比賽，結果 ${target} 獲勝。`,
      `${target} 玩著一個充滿邊緣的剃刀片陀螺，最終死亡。`,
      `${target} 在意識到他們的語法有多糟糕後死亡。`,
      `${target} 嘗試超越 Dank Memer 的模因，最終死亡。`,
      `${target} 死於榮譽的死亡。因為 snoo snoo 而死。`,
      `${target} 死因是忘記呼吸。`,
      `${target} 因為 ${author} 太愚蠢而死亡。`,
      `${target} 因為為星期五晚上的約會吃了太多熱狗而死亡。`,
      `${target} 在看著 Emoji 電影並喜歡的過程中死亡。`,
      `${target} 在一場可怕的事故中死亡，而這是由 ${author} 策劃的。`,
      `${target} 在牆的北邊死亡，並變成了白行者。`,
      `${target} 死於愛滋病。`,
      `${target} 死於痢疾。`,
      `${target} 死於自然原因。`,
      `${target} 死於飢餓。`,
      `${target} 在死刑行刑台上因謀殺 ${author} 及其家人而死亡。`,
      `${target} 死亡。`,
      `在搏鬥後，${target} 殺死了 ${author}。`,
      `${target} 從宇宙中消失。`,
      `${target} 喝了一些有毒的蘇打水。`,
      `${target} 將諾基亞手機掉在臉上，分裂了他們的頭顱。`,
      `${target} 在自己的眼淚中淹沒。`,
      `${target} 吃了太多的 copypasta 並爆炸了。`,
      `${target} 玩 Pokémon Go 時從懸崖上跌落`,
      `${target} 被吸入 Minecraft。${target}，作為所謂的現實版 Minecraft 中的新手，面對遊戲結束畫面。`,
      `${target} 在看到 ${author} 發布的模因後自殺。`,
      `${target} 觀看 Emoji 電影，死於極度的尷尬。`,
      `${target} 和一個鉛球一起乘坐。`,
      `在被 ${author} 推入海洋後，${target} 被一條鯊魚吃掉。`,
      `在 roblox 的孩子進入伺服器後，${target} 因為癌症而死亡。`,
      `${target} 死於艾滋病。`,
      `呼喚神聖的力量，${author} 以雷霆之箭擊中 ${target} 和他們異教的方法。`,
      `在突如其來的事件中，我 **不小心** 殺死 ${target}。`,
      
        ];

              await interaction.followUp(kills[Math.floor(Math.random() * kills.length)]);
          },
      };
