/**
 * @author ignis [me@ignis.wtf]
 * @license Apache-2.0
 */

import Operation from "../Operation.mjs";
import Utils from "../Utils.mjs";
import { BITWISE_OP_DELIMS } from "../lib/BitwiseOp.mjs";
import XOR from "./XOR.mjs"

/**
 * XOR operation
 */
class XORplain extends Operation {

    /**
     * XOR constructor
     */
    constructor() {
        super();

        this.name = "XOR with Known Plaintext";
        this.module = "Default";
        this.description = "XOR the text with a key that would yield the given plaintext";
        this.infoURL = "https://wikipedia.org/wiki/XOR";
        this.inputType = "ArrayBuffer";
        this.outputType = "byteArray";
        this.args = [
            {
                "name": "Crib known plaintext string)",
                "type": "toggleString",
                "value": "",
                "toggleValues": BITWISE_OP_DELIMS
            },
            {
                "name": "Scheme",
                "type": "option",
                "value": ["Standard", "Input differential", "Output differential", "Cascade"]
            },
            {
                "name": "Null preserving",
                "type": "boolean",
                "value": false
            }
        ];
    }

    /**
     * @param {ArrayBuffer} input
     * @param {Object[]} args
     * @returns {byteArray}
     */
    run(input, args) {
        const crib = Utils.convertToByteArray(args[0].string || "", args[0].option),
            [, scheme, nullPreserving] = args;
        const key = XOR.call(input.slice(0,crib.length), args)
        return XOR.call(input, [{option:"skip", string:key}, args[1], args[2]])
    }
/**
     * Highlight XOR
     *
     * @param {Object[]} pos
     * @param {number} pos[].start
     * @param {number} pos[].end
     * @param {Object[]} args
     * @returns {Object[]} pos
     */
    highlight(pos, args) {
        return pos;
    }

    /**
     * Highlight XOR in reverse
     *
     * @param {Object[]} pos
     * @param {number} pos[].start
     * @param {number} pos[].end
     * @param {Object[]} args
     * @returns {Object[]} pos
     */
    highlightReverse(pos, args) {
        return pos;
    }

}

export default XORplain;
