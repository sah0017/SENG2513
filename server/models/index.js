import sequelize from '../config/database.js';
import Games from './games.js';
import Articles from './articles.js';

// Set up associations between models
const setupAssociations = () => {
  // Define associations if they exist
  if (Games.associate) {
    Games.associate({ Articles });
  }
  
  if (Articles.associate) {
    Articles.associate({ Games });
  }
};

const syncModels = async () => {
  try {
    // Set up associations before syncing
    setupAssociations();
    
    // Sync models with database
    await sequelize.sync({ force: true }); // Use { force: true } to drop tables
    console.log('All models were synchronized successfully.');
    
    // Seed some example games
    const games = [
      { title: "Elden Ring" },
      { title: "Baldur's Gate 3" },
      { title: "Cyberpunk 2077" },
      { title: "Zelda: Tears of the Kingdom" },
      { title: "Starfield" }
    ];

    // Insert games into the table
    await Games.bulkCreate(games, { ignoreDuplicates: true })
      .then(() => {
        console.log('Games inserted successfully.');
      })
      .catch((error) => {
        console.error('Error inserting games:', error);
      });
      
    // Seed sample articles for each game
    const sampleArticles = [
      // Elden Ring articles
      {
        title: "Beginner's Guide",
        content: "Welcome to the world of Elden Ring! This guide will help new players understand the basics of the game, from character creation to combat mechanics. The Lands Between can be unforgiving, but with these tips, you'll be well on your way to becoming the Elden Lord.\n\nFirst, choose your starting class carefully - each has different strengths and equipment. The Vagabond is excellent for beginners due to high starting stats and good armor. Focus on leveling Vigor early for more health, and don't forget to upgrade your weapons at Sites of Grace.\n\nExplore Limgrave thoroughly before tackling Stormveil Castle. Remember that dodging is often better than blocking, and learning enemy patterns is key to survival.",
        gameId: 1
      },
      {
        title: "Best Builds for PvP",
        content: "PvP in Elden Ring requires specialized builds to compete effectively. This guide covers the top meta builds currently dominating the dueling scene.\n\nThe Bleed Build: Focus on Dexterity and Arcane stats, using dual katanas with the Seppuku Ash of War. Rivers of Blood and Uchigatana make an excellent combination. Bloodhound Step is crucial for mobility.\n\nThe Strength Colossal Build: Pure strength with the highest poise armor you can wear while maintaining medium roll. The Giant-Crusher or Prelate's Inferno Crozier with Royal Knight's Resolve deals massive damage with jump attacks.\n\nThe Faith Caster: Lightning spear, Black Flame, and Flame, Grant Me Strength create a devastating combination. Use the Erdtree Seal with at least 60 Faith for maximum spell scaling.",
        gameId: 1
      },
      // Baldur's Gate 3 articles
      {
        title: "Optimal Party Compositions",
        content: "Your party composition in Baldur's Gate 3 can make or break your adventure. This guide explores the best party setups for different playstyles.\n\nFor a balanced approach, include a tanky front-liner (Lae'zel or a custom Fighter/Paladin), a healer (Shadowheart works well), a damage dealer (Gale for magic or Astarion for physical damage), and a utility character who can handle locks and traps (Astarion or a custom Rogue).\n\nFor maximum dialogue options, include Shadowheart, Wyll, and Astarion, as they have unique interactions with many NPCs throughout the game. Consider playing as a charismatic character yourself to handle persuasion checks.\n\nFor maximum combat effectiveness, a party with a Paladin, Cleric, Wizard, and Rogue provides the perfect balance of tankiness, healing, area damage, and utility. Don't forget to use terrain to your advantage in combat!",
        gameId: 2
      },
      {
        title: "Secret Locations",
        content: "Baldur's Gate 3 is filled with hidden areas containing powerful items and interesting stories. Here are some easily-missed locations you should explore.\n\nThe Owlbear Cave in the northwest of the Druid Grove contains a rare companion if handled correctly. Instead of fighting the Owlbear, pass an Animal Handling check to adopt its cub as a camp follower.\n\nThe Underdark entrance behind the Whispering Depths can be accessed early by moving a boulder. This area contains powerful magic items like the Sussur Bloom, needed for crafting unique weapons.\n\nThe Defiled Temple hidden beneath the Blighted Village contains the powerful Watcher's Guide amulet, but you'll need to solve a complex puzzle involving light beams to access the treasure room.\n\nDon't miss the Arcane Tower near Waukeen's Rest, accessible only by finding and solving the hidden entrance puzzle. Inside, you'll find several scrolls and magical items perfect for spellcasters.",
        gameId: 2
      },
      // Cyberpunk 2077 articles
      {
        title: "Ultimate Netrunner Build",
        content: "The Netrunner build is one of the most powerful playstyles in Cyberpunk 2077, allowing you to hack enemies and environments from a distance. This guide will help you create the ultimate hacker.\n\nAttributes: Focus on Intelligence (20 points) as your primary attribute, followed by Cool (16 points) for stealth bonuses. Body should be at least 6 for necessary health, while Technical Ability at 16 allows you to craft legendary quickhacks.\n\nPerks: In Breach Protocol, prioritize 'Advanced Datamine' and 'Mass Vulnerability'. In Quickhacking, get 'Plague' and 'Critical Error' as soon as possible. These allow your hacks to spread between enemies.\n\nCyberware: The Netwatch Netdriver Mk.5 cyberdecks are essential, offering 6 buffer size and 8 RAM with reduced quickhack cooldowns. Pair this with the Limbic System Enhancement for additional crit chance and Memory Boost for RAM recovery.\n\nFor quickhacks, focus on obtaining the legendary versions of Short Circuit, Contagion, and Suicide for maximum damage potential against all enemy types.",
        gameId: 3
      },
      {
        title: "Night City's Hidden Gems",
        content: "Night City hides numerous secrets beneath its neon-lit streets. This guide reveals the most rewarding hidden locations you won't want to miss.\n\nBatty's Hotel: Located in Kabuki, this Blade Runner reference contains unique dialogue and a hidden weapon, the iconic Satori katana, on the landing pad where you meet Takemura. You'll need to return to the penthouse after the mission.\n\nThe Secret Ending: To unlock the secret 'Don't Fear the Reaper' ending, you must build a strong relationship with Johnny Silverhand by making specific choices throughout the game. When at Embers for the final mission, wait five minutes when Johnny asks what you want to do.\n\nThe Hidden Cave: Northeast of Night City in the Badlands lies a cave containing references to The Witcher and a unique iconic weapon. Look for the small cave entrance in the rocky hills near the wind farm.\n\nThe Blade Runner Easter Egg: In Japantown, find the exact spot where Roy Batty delivered his famous 'tears in rain' monologue, complete with a hidden chest containing unique crafting components.",
        gameId: 3
      },
      // Zelda: Tears of the Kingdom articles
      {
        title: "Mastering the Ultrahand",
        content: "The Ultrahand ability is one of Link's most powerful new tools in Tears of the Kingdom. This guide will help you create incredible machines and solve complex puzzles.\n\nBasic Principles: The Ultrahand allows you to pick up, move, and attach objects. When attaching objects, pay attention to the green glowing points - these are connection points. Different materials have different properties: wood floats but burns easily, metal conducts electricity but attracts lightning, and Zonai devices provide special functionality.\n\nAdvanced Vehicles: To create a basic car, attach wheels to a flat surface, add a fan at the back, and use a steering stick. For flying machines, use Zonai propellers attached to a lightweight frame. Create boats by using buoyancy devices on the bottom of your creation.\n\nCombat Applications: Attach weapons to moving parts to create automatic traps. Use the Ultrahand to pick up and throw explosive barrels at enemies. Create a simple battering ram by attaching spikes to a log and pushing it downhill towards enemy camps.\n\nRemember that more complex creations use more battery power, so always carry Zonai charges for longer expeditions with your creations.",
        gameId: 4
      },
      {
        title: "All Sage Locations",
        content: "Finding all seven Sages is crucial to understanding the full story of Tears of the Kingdom. This guide will help you locate each Sage and complete their associated quests.\n\nRauru: The first Sage you'll encounter in the game during the tutorial section. Complete the Temple of Time to fully awaken his power.\n\nMineru: Found in Rito Village in the northwestern region of Hyrule. Complete the Wind Temple questline to awaken her power. You'll need cold resistance gear to reach certain areas.\n\nTulin: Located in Zora's Domain in eastern Hyrule. Complete the Water Temple, which requires solving several water-level puzzles using the Ultrahand ability.\n\nSidon: Found in Gerudo Town in the southwestern desert. You'll need heat resistance gear and must complete the Lightning Temple, which involves complex electrical circuit puzzles.\n\nYunobo: Located in Goron City in the northeastern Death Mountain region. Complete the Fire Temple, utilizing the Ascend ability to navigate vertical lava chambers.\n\nSonia and Misko: These final two Sages are found during the main quest progression and related to the game's biggest surprises - revealing more would spoil major plot points!",
        gameId: 4
      },
      // Starfield articles
      {
        title: "Ship Building Guide",
        content: "Creating the perfect starship in Starfield is both an art and a science. This comprehensive guide will help you design a vessel that suits your playstyle.\n\nShip Modules: Start with a balanced hull that suits your needs. Combat-focused players should prioritize military-grade hulls, while explorers benefit from increased cargo capacity. Your reactor determines power availability - never skimp here as it affects all systems.\n\nWeapon Systems: Ballistic weapons are effective against hull points but require ammunition. Laser weapons excel against shields and have unlimited ammo but generate more heat. For a balanced approach, equip at least one of each type. Position weapons with overlapping firing arcs for maximum damage output.\n\nShield and Engine Balance: Faster engines consume more power but provide better maneuverability in combat. Class C engines offer the best balance for most players. Match your shield strength to your playstyle - explorers need minimal shields, while bounty hunters should maximize this stat.\n\nCrew Quarters and Special Modules: Having specialized crew quarters improves your companions' effectiveness during space travel. Research modules increase science skill checks, while luxury quarters improve diplomatic options. Don't forget to include a cargo hold sized appropriately for your trading or looting habits.",
        gameId: 5
      },
      {
        title: "Maximizing Faction Reputation",
        content: "Your standing with Starfield's various factions determines quest availability, rewards, and story outcomes. This guide explains how to navigate these complex relationships.\n\nUnited Colonies: This military-focused faction values order and discipline. Complete UC Security tasks and choose dialogue options that emphasize law and order. Key locations include New Atlantis on Jemison and the UC Vigilance starbase. Gaining reputation here unlocks military-grade ship modules and weapons.\n\nFreestar Collective: This coalition of independent planets values freedom and self-reliance. Complete bounty hunting missions and defend settlements from pirates. Choose dialogue options emphasizing independence and fair play. High reputation unlocks unique ship customization options and homesteading opportunities.\n\nRyujin Industries: This corporate faction values technological advancement and profit. Complete corporate espionage missions and choose dialogue options that prioritize technological progress. High reputation grants access to cutting-edge research modules and advanced crafting recipes.\n\nCrimson Fleet: This pirate faction requires careful reputation management, as gaining their trust can damage standings with law-abiding groups. Complete smuggling missions but be warned that UC patrols may become hostile. High reputation unlocks black market goods and unique ship stealth technology.\n\nHouse Va'ruun: This religious faction values dedication to their beliefs. Complete pilgrimage missions and choose respectful dialogue options. High reputation unlocks unique gravity-manipulation technology and special meditation buffs that enhance your character's abilities.",
        gameId: 5
      }
    ];

    // Insert articles into the table
    for (const article of sampleArticles) {
      await Articles.findOrCreate({
        where: { title: article.title },
        defaults: article
      });
    }
    
    console.log('Sample articles inserted successfully.');
    
    // Log total counts
    const gameCount = await Games.count();
    const articleCount = await Articles.count();
    console.log(`Database now has ${gameCount} games and ${articleCount} articles.`);
      
  } catch (error) {
    console.error('Error synchronizing models:', error);
  }
};

export {
  sequelize,
  Games,
  Articles,
  syncModels
};