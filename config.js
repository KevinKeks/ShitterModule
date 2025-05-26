import { @Vigilant, @SliderProperty, @SelectorProperty, @SwitchProperty, @ButtonProperty, @CheckboxProperty } from 'Vigilance';

@Vigilant('shittermodule', 'ShitterModule', {
    getCategoryComparator: () => (a, b) => {
        const categories = ['dev', 'Dungeons', 'Other', 'Gui'];
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
    }

    @CheckboxProperty({
        name: "firstload",
        category: 'dev',
        hidden: true,
    })
    firstload = true;

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
    dtrevtitle = false;

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
        description: 'Delay in Milliseconds before requeue. Number between 0 and 2000.\n&cCan requeue too early!',
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
        description: 'Shows in chat when the ability cooldown for an item is over',
        category: 'Other',
        subcategory: 'Invincibility Procs',
    })
    ipshowwhenready = false;

    @SwitchProperty({
        name: 'Ready Title',
        description: 'Shows a title when the ability cooldown for an item is over',
        category: 'Other',
        subcategory: 'Invincibility Procs',
    })
    ipreadytitle = false;

    @SwitchProperty({
        name: 'Invprocs Display',
        description: 'Display for your proc-items',
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
        category: 'Other',
        subcategory: 'Refills',
    })
    pearlrefill = false;

    @SwitchProperty({
        name: 'Boomrefill',
        description: 'Refills your superboom now and then',
        category: 'Other',
        subcategory: 'Refills',
    })
    boomrefill = false;

    @SwitchProperty({
        name: 'Sceptrepearl',
        description: 'Pearl when right-clicking a block with a spirit sceptre\n&cUse at your own risk!',
        category: 'Other',
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
        category: 'Other',
        subcategory: 'Miningability',
    })
    miningability = false;

    @CheckboxProperty({
        name: 'Sound',
        description: 'Also play a sound',
        category: 'Other',
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