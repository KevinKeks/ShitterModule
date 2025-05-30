import { @Vigilant, @SliderProperty, @SelectorProperty, @SwitchProperty, @ButtonProperty, @CheckboxProperty, @TextProperty } from 'Vigilance';

@Vigilant('shittermodule', 'ShitterModule', {
    getCategoryComparator: () => (a, b) => {
        const categories = ['dev', 'Dungeons', 'QoL', 'Other', 'Gui'];
        return categories.indexOf(a.name) - categories.indexOf(b.name);
    }
})

class Settings {
    constructor() {
        this.initialize(this);

        this.addDependency("Continuous", "Ghostpick");
        this.addDependency("Dungeons Only", "Ghostpick");
        this.addDependency("Sound", "Miningability");
        this.addDependency("Only In Dungeons", "Invprocs Display");
        this.addDependency("Only In P3", "Invprocs Display");
        this.addDependency("Sapphire Crystal", "Nucleuswarp");
        this.addDependency("Jade Crystal", "Nucleuswarp");
        this.addDependency("Amethyst Crystal", "Nucleuswarp");
        this.addDependency("Amber Crystal", "Nucleuswarp");
        this.addDependency("Topaz Crystal", "Nucleuswarp");
        this.addDependency("Storagetype", "Toolstash");
        this.addDependency("Storagenumber", "Toolstash");
    }

    @CheckboxProperty({
        name: "firstload",
        category: 'dev',
        hidden: true,
    })
    firstload = true;

    @SwitchProperty({
        name: "Main Toggle",
        description: "Turn the whole module on/off",
        category: "Main",
    })
    maintoggle = false;

    @SwitchProperty({
        name: "Betterbeam",
        description: "Makes the Magebeam look cooler",
        category: "Dungeons",
        subcategory: "Betterbeam",
    })
    betterbeam = false;

    @SwitchProperty({
        name: "Deathtitle",
        description: "Shows a title with the class when someone dies in dungeons",
        category: "Dungeons",
        subcategory: "Deathtitle",
    })
    deathtitle = false;

    @SwitchProperty({
        name: "Rev Title",
        description: "Shows a title with the class when you revive someone",
        category: "Dungeons",
        subcategory: 'Deathtitle',
    })
    revtitle = false;

    @SwitchProperty({
        name: "Ghostpick",
        description: "Let's your ghostpick easier (tis legit trust)\nRequires a pickaxe in hotbar\n&cUse at your own risk!",
        category: "Dungeons",
        subcategory: 'Ghostpick',
    })
    ghostpick = false;

    @SelectorProperty({
        name: 'Slot',
        description: 'Select the hotbarslot to ghostpick with',
        category: 'Dungeons',
        subcategory: 'Ghostpick',
        options: ['1', '2', '3', '4', '5', '6', '7', '8']
    })
    gpslot = 0;

    @CheckboxProperty({
        name: "Continuous",
        description: "Automatically swap back for continuous ghostpicking",
        category: "Dungeons",
        subcategory: 'Ghostpick',
    })
    gpcontinuous = false;

    @CheckboxProperty({
        name: "Dungeons Only",
        description: "Turn on to disable ghostpick outside of dungeons",
        category: "Dungeons",
        subcategory: 'Ghostpick',
    })
    gpdungeonsonly = false;

    @SwitchProperty({
        name: 'M5rq',
        description: 'Faster M5 requeue',
        category: 'Dungeons',
        subcategory: 'M5rq',
    })
    m5rq = false;

    @SliderProperty({
        name: 'Delay',
        description: 'Delay in Milliseconds before requeue. Number between 0 and 2000\n&cNot in sync with the server! Can requeue too early!',
        category: 'Dungeons',
        subcategory: 'M5rq',
        min: 0,
        max: 2000,
    })
    m5rqdelay = 1000;

    @SwitchProperty({
        name: 'Proc Title',
        description: 'Shows a title for the Bonzo Mask, Spirit Mask and Phoenix ability',
        category: 'Other',
        subcategory: 'Invincibility Procs',
    })
    ipproctitle = false;

    @SwitchProperty({
        name: 'Announce',
        description: 'Send the proc to party chat',
        category: 'Other',
        subcategory: 'Invincibility Procs',
    })
    ipannounce = false;

    @SwitchProperty({
        name: 'Show When Ready',
        description: 'Shows in chat when the ability cooldown for an item is over\n&cNot in sync with the server!',
        category: 'Other',
        subcategory: 'Invincibility Procs',
    })
    ipshowwhenready = false;

    @SwitchProperty({
        name: 'Ready Title',
        description: 'Shows a title when the ability cooldown for an item is over\n&cNot in sync with the server!',
        category: 'Other',
        subcategory: 'Invincibility Procs',
    })
    ipreadytitle = false;

    @SwitchProperty({
        name: 'Invprocs Display',
        description: 'Display for your proc-items\n&cNot in sync with the server!',
        category: 'Other',
        subcategory: 'Invincibility Procs',
    })
    ipdisplay = false;

    @CheckboxProperty({
        name: 'Only In Dungeons',
        description: 'Show display only in dungeons',
        category: 'Other',
        subcategory: 'Invincibility Procs',
    })
    ipdponlydungeons = false;

    @CheckboxProperty({
        name: 'Only In P3',
        description: 'Show display only in P3',
        category: 'Other',
        subcategory: 'Invincibility Procs',
    })
    ipdponlyp3 = false;

    @SwitchProperty({
        name: 'Pearlrefill',
        description: 'Refills your enderpearls now and then',
        category: 'Dungeons',
        subcategory: 'Refills',
    })
    pearlrefill = false;

    @SwitchProperty({
        name: 'Boomrefill',
        description: 'Refills your superboom now and then',
        category: 'Dungeons',
        subcategory: 'Refills',
    })
    boomrefill = false;

    @SwitchProperty({
        name: 'Sceptrepearl',
        description: 'Pearl when right-clicking a block with a spirit sceptre\n&cUse at your own risk!',
        category: 'Dungeons',
        subcategory: 'Sceptrepearl',
    })
    sceptrepearl = false;

    @SwitchProperty({
        name: 'Pjoin',
        description: 'Send a party invite to ppl who dm you "!pjoin"',
        category: 'Other',
        subcategory: 'Pjoin',
    })
    pjoin = false;

    @SwitchProperty({
        name: 'Miningability',
        description: 'Shows a title when your mining ability is ready',
        category: 'QoL',
        subcategory: 'Miningability',
    })
    miningability = false;

    @CheckboxProperty({
        name: 'Sound',
        description: 'Also play a sound',
        category: 'QoL',
        subcategory: 'Miningability',
    })
    masound = false;

    @SwitchProperty({
        name: 'Helmet Display',
        description: 'Displays your helmet as text on screen',
        category: 'Other',
        subcategory: 'Helmet Display',
    })
    helmetdisplay = false;

    @SwitchProperty({
        name: 'Trapperwarp',
        description: 'Warp to trapper when your animal dies',
        category: 'QoL',
        subcategory: 'Trapperwarp',
    })
    trapperwarp = false;

    @SwitchProperty({
        name: 'Warp Desert',
        description: 'Warp to desert when your animal is in the settlement',
        category: 'QoL',
        subcategory: 'Trapperwarp',
    })
    trapperwarpdesert = false;

    @SwitchProperty({
        name: 'Nucleuswarp',
        description: 'Warp to the crystal nucleus when collecting a crystal',
        category: 'QoL',
        subcategory: 'Nucleuswarp',
    })
    nucleuswarp = false;

    @CheckboxProperty({
        name: 'Sapphire Crystal',
        category: 'QoL',
        subcategory: 'Nucleuswarp',
    })
    sapphirewarp = true;

    @CheckboxProperty({
        name: 'Jade Crystal',
        category: 'QoL',
        subcategory: 'Nucleuswarp',
    })
    jadewarp = true;

    @CheckboxProperty({
        name: 'Amethyst Crystal',
        category: 'QoL',
        subcategory: 'Nucleuswarp',
    })
    amethystwarp = true;

    @CheckboxProperty({
        name: 'Amber Crystal',
        category: 'QoL',
        subcategory: 'Nucleuswarp',
    })
    amberwarp = true;

    @CheckboxProperty({
        name: 'Topaz Crystal',
        category: 'QoL',
        subcategory: 'Nucleuswarp',
    })
    topazwarp = true;

    @SwitchProperty({
        name: 'Inventory Chat',
        description: 'Send messages while in an inventory by pressing Ctrl + Chatkey\n&cVery scuffed!',
        category: 'Other',
    })
    inventorychat = false;

    @SwitchProperty({
        name: 'Composter Grab',
        description: 'Grabs Box of Seeds and Oil Barrels from your sax',
        category: 'QoL',
        subcategory: 'Composter Grab',
    })
    compostergrab = false;

    @SwitchProperty({
        name: 'Composter Insert',
        description: 'Inserts Box of Seeds and Oil barrels from your inventory',
        category: 'QoL',
        subcategory: 'Composter Grab',
    })
    composterinsert = false;

    @TextProperty({
        name: 'Crop Threshold',
        description: 'Grab Box of Seeds when the cropmeter is below this value',
        category: 'QoL',
        subcategory: 'Composter Grab',
    })
    cropthreshold = "600000";

    @TextProperty({
        name: 'Fuel Threshold',
        description: 'Grab Oil Barrels when the fuelmeter is below this value',
        category: 'QoL',
        subcategory: 'Composter Grab',
    })
    fuelthreshold = "600000";

    @SwitchProperty({
        name: 'Toolstash',
        description: 'Puts the 4th Mines of Divan Tool that you find into your storage\n&cUse at your own risk!',
        category: 'QoL',
        subcategory: 'Toolstash',
    })
    toolstash = false;

    @SelectorProperty({
        name: 'Storagetype',
        description: 'Select the storage type',
        category: 'QoL',
        subcategory: 'Toolstash',
        options: ['Enderchest', 'Backpack']
    })
    storagetype = 0;

    @SelectorProperty({
        name: 'Storagenumber',
        description: 'Select the page',
        category: 'QoL',
        subcategory: 'Toolstash',
        options: ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12', '13', '14', '15', '16', '17', '18']
    })
    storagenumber = 0;

    @ButtonProperty({
        name: 'Edit Gui',
        description: 'Use "Left Click" to move, "Right Click" to change alignment, "Middle Click" to add/remove background" and "Scroll" to change size',
        category: 'Gui',
        placeholder: 'Edit Gui',
    })
    editGui() {
        ChatLib.command("smgui", true)
    }

    @ButtonProperty({
        name: 'Reset Gui',
        description: 'Resets all displays',
        category: 'Gui',
        placeholder: 'Reset Gui',
    })
    resetGui() {
        ChatLib.command("smgui reset", true)
    }
}

export default new Settings();