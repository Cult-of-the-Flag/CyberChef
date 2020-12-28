/**
 * @author ignis [me@ignis.wtf]
 */

import Operation from "../Operation.mjs";
import {toBase91} from "../lib/Base91.mjs";


class ToBase91 extends Operation {
 

    constructor() {
        super();

        this.name = "To Base91";
        this.module = "Default";
        this.description = "Sometimes i wonder what would shitty ctf's do if stuff like this wasn't invented.";
        this.infoURL = "https://flag.farm";
        this.inputType = "byteArray";
        this.outputType = "string";
        this.args = [
            {
                name: "Remove non-alphabet chars",
                type: "boolean",
                value: true
            }
        ];
    }

    /**
     * @param {string} input
     * @param {Object[]} args
     * @returns {byteArray}
     */
    run(input, args) {
        const [alphabet, removeNonAlphChars] = args;
        var x = toBase91(input, alphabet, removeNonAlphChars);
        return x;
    }

    /** 
     * Highlight to Base91
     *
     * @param {Object[]} pos
     * @param {number} pos[].start
     * @param {number} pos[].end
     * @param {Object[]} args
     * @returns {Object[]} pos
     */
    highlight(pos, args) {
        pos[0].start = Math.ceil(pos[0].start / 4 * 5);
        pos[0].end = Math.floor(pos[0].end / 4 * 5);
        return pos;
    }

    /**
     * Highlight from Base91
     *
     * @param {Object[]} pos
     * @param {number} pos[].start
     * @param {number} pos[].end
     * @param {Object[]} args
     * @returns {Object[]} pos
     */
    highlightReverse(pos, args) {
        pos[0].start = Math.floor(pos[0].start / 5 * 4);
        pos[0].end = Math.ceil(pos[0].end / 5 * 4);
        return pos;
    }
}

export default ToBase91;
