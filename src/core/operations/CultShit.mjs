/**
 * @author cult chef [me@ignis.wtf]
 */

import Operation from "../Operation.mjs";
import XORplain from "./XorKnownPlain.mjs";
import ROT13 from "./ROT13.mjs";
import ROT47 from "./ROT47.mjs";
import Utils from "../Utils.mjs";
import FromBase91 from "./FromBase91.mjs";

/**
 * Guess shit
 */
class CultMagic extends Operation {
    /**
     * Guess shit
     */
    constructor() {
        super();

        this.name = "The fuck is this";
        this.module = "Default";
        this.description = "Another crappy ctf";
        this.infoURL = "https://flag.farm/";
        this.inputType = "byteArray";
        this.outputType = "byteArray";
        this.args = [{
            "name": "Flag format",
            "type": "string",
            "value": "flag{.*}"
        }];
    }

    /**
     * @param {byteArray} input
     * @param {Object[]} args
     * @returns {byteArray}
     */
    run(input, args) {
        const alphabet = /^[ -~]+$/;
        const crib = args[0];
        const format = RegExp("^" + args[0].replace("{", "\\{").replace("}", "\\}") + "$");
        const inputbuffer = (new Uint8Array(input)).buffer;

        let x = Utils.byteArrayToChars(input);
        if (this._correct(x, format, alphabet)) {
            return Utils.strToByteArray("This is a fucking flag you dipshit.");
        }

        x = FromBase91.call(input, [true]);
        x = Utils.byteArrayToChars(new Uint8Array(x));
        if (this._correct(x, format, alphabet)) {
            return Utils.strToByteArray("This is base91. Your fucking flag is: \n" + x);
        }

        for (let i = 1; i < 26; i++) {
            x = ROT13.call(input, [true, true, i]);
            x = Utils.byteArrayToChars(x);
            if (this._correct(x, format, alphabet)) {
                return Utils.strToByteArray("This is rot13 with offset: " + String(i) + ". Your fucking flag is: \n" + x);
            }
        }

        for (let i = 1; i < 26; i++) {
            x = ROT13.call(input, [false, true, i]);
            x = Utils.byteArrayToChars(x);
            if (this._correct(x, format, alphabet)) {
                return Utils.strToByteArray("This is rot13 with uppercase only offset: " + String(i) + ". Your fucking flag is: \n" + x);
            }
        }

        for (let i = 1; i < 26; i++) {
            x = ROT13.call(input, [true, false, i]);
            x = Utils.byteArrayToChars(x);
            if (this._correct(x, format, alphabet)) {
                return Utils.strToByteArray("This is rot13 with lowercase only offset: " + String(i) + ". Your fucking flag is: \n" + x);
            }
        }

        for (let i = 1; i < 92; i++) {
            x = ROT47.call(input, [i]);
            x = Utils.byteArrayToChars(x);
            if (this._correct(x, format, alphabet)) {
                return Utils.strToByteArray("This is rot47 with offset: " + String(i) + ". Your fucking flag is: \n" + x);
            }
        }

        for (let i = 0; i < crib.length; i++) {
            let x = XORplain.call(inputbuffer, [{
                option: "Latin1",
                string: crib.slice(0, i+1),
            }, "Standart", true]);
            x = Utils.byteArrayToChars(x);
            if (this._correct(x, format, alphabet)) {
                return Utils.strToByteArray("This is XOR with a " + String(i+1) + " length key. Your fucking flag is: \n" + x);
            }
        }

        return Utils.strToByteArray("The fuck is this");
    }

    /**
     * check if it matches format
     */
    _correct(str, format, alphabet) {
        if (str.match(format) && str.match(alphabet)) {
            return true;
        }
        return false;
    }

    /**
     * Highlight
     */
    highlight(pos, args) {
        return pos;
    }

    /**
     * Highlight
     */
    highlightReverse(pos, args) {
        return pos;
    }

}

export default CultMagic;
