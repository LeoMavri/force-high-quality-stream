/**
 * @name ForceFullQualityStream
 * @version 4.2.0.6.9
 * @authorLink https://mavriware.me
 * @authorId 245238431045648385
 * @invite suHBfYVvpU
 */

module.exports = (() => {
    const config = { info: { name: "Better™StreamQuality", authors: [{ name: "Mavri", discord_id: "245238431045648385", github_username: "Mavri", twitter_username: "N/A" }], version: "4.2.0.6.9", description: "Forces premium type 2 and allows you to stream in max quality.", github: "NA", github_raw: "NA" }, changelog: [{ title: "Ver 1.0.0", items: ["Ignore what it says in the settings."] }], main: "index.js" };

    return !global.ZeresPluginLibrary ? class {
        constructor() { this._config = config; }
        getName() { return config.info.name; }
        getAuthor() { return config.info.authors.map(a => a.name).join(", "); }
        getDescription() { return config.info.description; }
        getVersion() { return config.info.version; }
        load() {
            BdApi.showConfirmationModal("Library Missing", `The library plugin needed for ${config.info.name} is missing. Please click Download Now to install it.`, {
                confirmText: "Download Now",
                cancelText: "Cancel",
                onConfirm: () => {
                    require("request").get("https://rauenzi.github.io/BDPluginLibrary/release/0PluginLibrary.plugin.js", async (error, response, body) => {
                        if (error) return require("electron").shell.openExternal("https://betterdiscord.net/ghdl?url=https://raw.githubusercontent.com/rauenzi/BDPluginLibrary/master/release/0PluginLibrary.plugin.js");
                        await new Promise(r => require("fs").writeFile(require("path").join(BdApi.Plugins.folder, "0PluginLibrary.plugin.js"), body, r));
                    });
                }
            });
        }
        start() { }
        stop() { }
    } : (([Plugin, Api]) => {
        const plugin = (Plugin, Api) => {
            const { Patcher, WebpackModules } = Api;
            const ElectronModule = WebpackModules.getByProps(["setBadge"]);
            return class ForceFullQualityStream extends Plugin {
                onStart() {
                    const userStore = BdApi.findModuleByProps("getCurrentUser");
                    const user = userStore.getCurrentUser()
                    let originalType = user.premiumType
                    user.premiumType = 2;
                }

                onStop() {
                    user.premiumType = originalType
                    Patcher.unpatchAll();
                }

            };
        };
        return plugin(Plugin, Api);
    })(global.ZeresPluginLibrary.buildPlugin(config));
})();