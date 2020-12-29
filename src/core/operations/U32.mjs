/**
 * @author ignis [me@ignis.wtf]
 */

import Operation from "../Operation.mjs";

/**
 * U32 operation
 */
class U32 extends Operation {

    /**
     * U32 operation
     */
    constructor() {
        super();

        this.name = "U32";
        this.module = "Default";
        this.description = "";
        this.infoURL = "https://flag.farm";
        this.inputType = "ArrayBuffer";
        this.outputType = "byteArray";
        this.args = [];
    }

    /**
     * @param {ArrayBuffer} input
     * @param {Object[]} args
     * @returns {byteArray}
     */
    run(input, args) {

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

export default U32;
