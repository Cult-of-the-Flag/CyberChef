/**
 * @author n1474335 [n1474335@gmail.com]
 * @copyright Crown Copyright 2016
 * @license Apache-2.0
 */

import Operation from "../Operation.mjs";
import Utils from "../Utils.mjs";
import {DELIM_OPTIONS} from "../lib/Delim.mjs";
import OperationError from "../errors/OperationError.mjs";
import SwapEndianness from "./SwapEndianness.mjs";
/**
 * To Decimal operation
 */
class ToDecimal extends Operation {

    /**
     * ToDecimal constructor
     */
    constructor() {
        super();
        this.name = "To Decimal";
        this.module = "Default";
        this.description = "Converts the input data to an ordinal integer array.<br><br>e.g. <code>Hello</code> becomes <code>72 101 108 108 111</code>";
        this.inputType = "ArrayBuffer";
        this.outputType = "string";
        this.args = [
            {
                "name": "Delimiter",
                "type": "option",
                "value": DELIM_OPTIONS
            },
            {
                "name": "Byte length",
                "type": "option",
                "value": ["1", "2", "4", "8"]
            },
            {
                "name": "endianness",
                "type": "option",
                "value": ["Little Endian", "Big Endian"]
            },
            {
                "name": "Support signed values",
                "type": "boolean",
                "value": false
            },
        ];
    }

    /**
     * @param {ArrayBuffer} input
     * @param {Object[]} args
     * @returns {string}
     */
    run(input, args) {
        if (args[2]==="Big Endian") {
            input = SwapEndianness.call(Utils.byteArrayToChars(new Uint8Array(input)), ["Raw", Number(args[1])]);
            input = this.str2ab(input);
        }

        switch (args[1]) {
            case "1":
                input = new Uint8Array(input);
                break;
            case "2":
                input = new Uint16Array(input);
                break;
            case "4":
                input = new Uint32Array(input);
                break;
            case "8":
                input = new BigUint64Array(input);
                break;
            default:
                throw new OperationError("We were too lazy to implement this.1");
        }

        const delim = Utils.charRep(args[0]),
            signed = args[3];
        if (signed) {
            if (args[3]!==1) throw new OperationError("We were too lazy to implement this.2");
            input = input.map(v => v > 0x7F ? v - 0xFF - 1 : v);
        }
        return input.join(delim);
    }

    /**
     * str to array buffer
     */
    str2ab(str) {
        const buf = new ArrayBuffer(str.length);
        const bufView = new Uint8Array(buf);
        for (let i=0, strLen=str.length; i < strLen; i++) {
            bufView[i] = str.charCodeAt(i);
        }
        return buf;
    }

}

export default ToDecimal;
