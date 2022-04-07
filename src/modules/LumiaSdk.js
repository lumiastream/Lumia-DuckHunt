const EventEmitter = require('eventemitter3');
const { LumiaSdk, LumiaEventTypes } = require('@lumiastream/sdk');

const token = 'ls_duckhunt';
const appName = 'duckhunt_lumia';

export const GamesGlowAlertKeys = {
    LIVES: 'duckhunt_lumia__var_lives',
    KILLS: 'duckhunt_lumia__var_kills',
    SCORE: 'duckhunt_lumia__var_score',
};

export const GamesGlowCommandKeys = {
    GIVE_BULLET: 'duckhunt_lumia__var_lives',
    TAKE_BULLET: 'duckhunt_lumia__var_take_bullet',
    SKY_COLOR: 'duckhunt_lumia__sky_color',
    COLOR: 'duckhunt_lumia__color',
};

export const GamesGlowVariableKeys = {
    LIVES: 'duckhunt_lumia__var_lives',
    KILLS: 'duckhunt_lumia__var_kills',
    SCORE: 'duckhunt_lumia__var_score',
};

export const GamesGlowVirtualLightsKeys = {
    SKY_COLOR: 'duckhunt_lumia__sky_color',
};

export class LumiaSdkManager extends EventEmitter {
    constructor() {
        super();
        this._running = false;
        this.instance = null;
        LumiaSdkManager.sdk = new LumiaSdk();
        LumiaSdkManager.Setup();
    }

    static getInstance() {
        if (!LumiaSdkManager.instance) {
            LumiaSdkManager.instance = new LumiaSdkManager();
        }
        return LumiaSdkManager.instance;
    }

    static Setup() {
        LumiaSdkManager.sdk
            .init({ name: appName, token, timeout: 30000 })
            .then(function () {
                LumiaSdkManager.sdk.on('event', function (data) {
                    if (data.type === LumiaEventTypes.CHAT) {
                        console.log('New chat message', data);
                    } else if (data.data?.gamesGlowId !== appName) {
                        // Do not listen to any events that are not meant for this game
                        return;
                    }

                    switch (data.type) {
                        case LumiaEventTypes.GAMESGLOW_COMMAND: {
                            console.log('New gamesglow command', data);
                            LumiaSdkManager.getInstance().emit('command', data.data);
                            break;
                        }
                        case LumiaEventTypes.GAMESGLOW_VIRTUALLIGHT: {
                            console.log('New gamesglow virtual light', data);
                            LumiaSdkManager.getInstance().emit('virtuallight', data.data);
                            break;
                        }
                    }
                });
            })
            .catch(function (err) {
                console.log('Init err: ', err);
            });
    }

    static SendVariable({ gamesGlowKey, value }) {
        LumiaSdkManager.sdk.sendGamesGlowVariableUpdate({
            gamesGlowKey,
            value,
        });
    }

    static async SendAlert({ gamesGlowKey, value }) {
        await LumiaSdkManager.sdk.sendGamesGlowAlert({
            gamesGlowKey,
            value,
        });
    }
}

export const rgbToHex = (colorObj) => {
    return (1 << 24) + (colorObj.r << 16) + (colorObj.g << 8) + colorObj.b;
};
