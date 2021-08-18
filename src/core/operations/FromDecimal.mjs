/**
 * @author n1474335 [n1474335@gmail.com]
 * @copyright Crown Copyright 2016
 * @license Apache-2.0
 */

import Operation from "../Operation.mjs";
import Utils from "../Utils.mjs";
import {DELIM_OPTIONS} from "../lib/Delim.mjs";
import {fromDecimal} from "../lib/Decimal.mjs";
import SwapEndianness from "./SwapEndianness.mjs";

/**
 * From Decimal operation
 */
class FromDecimal extends Operation {

    /**
     * FromDecimal constructor
     */
    constructor() {
        super();

        this.name = "From Decimal";
        this.module = "Default";
        this.description = "Converts the data from an ordinal integer array back into its raw form.<br><br>e.g. <code>72 101 108 108 111</code> becomes <code>Hello</code>";
        this.inputType = "string";
        this.outputType = "byteArray";
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
            }
        ];
        this.checks = [
            {
                pattern: "^(?:\\d{1,2}|1\\d{2}|2[0-4]\\d|25[0-5])(?: (?:\\d{1,2}|1\\d{2}|2[0-4]\\d|25[0-5]))*$",
                flags: "",
                args: ["Space", false]
            },
            {
                pattern: "^(?:\\d{1,2}|1\\d{2}|2[0-4]\\d|25[0-5])(?:,(?:\\d{1,2}|1\\d{2}|2[0-4]\\d|25[0-5]))*$",
                flags: "",
                args: ["Comma", false]
            },
            {
                pattern: "^(?:\\d{1,2}|1\\d{2}|2[0-4]\\d|25[0-5])(?:;(?:\\d{1,2}|1\\d{2}|2[0-4]\\d|25[0-5]))*$",
                flags: "",
                args: ["Semi-colon", false]
            },
            {
                pattern: "^(?:\\d{1,2}|1\\d{2}|2[0-4]\\d|25[0-5])(?::(?:\\d{1,2}|1\\d{2}|2[0-4]\\d|25[0-5]))*$",
                flags: "",
                args: ["Colon", false]
            },
            {
                pattern: "^(?:\\d{1,2}|1\\d{2}|2[0-4]\\d|25[0-5])(?:\\n(?:\\d{1,2}|1\\d{2}|2[0-4]\\d|25[0-5]))*$",
                flags: "",
                args: ["Line feed", false]
            },
            {
                pattern: "^(?:\\d{1,2}|1\\d{2}|2[0-4]\\d|25[0-5])(?:\\r\\n(?:\\d{1,2}|1\\d{2}|2[0-4]\\d|25[0-5]))*$",
                flags: "",
                args: ["CRLF", false]
            }
        ];
    }

    /**
     * @param {string} input
     * @param {Object[]} args
     * @returns {byteArray}
     */
    run(input, args) {
        let data = fromDecimal(input, args[0], args[1]);
        if (args[3]) { // Convert negatives
            data = data.map(v => v < 0 ? 0xFF + v + 1 : v);
        }
        let output = [];

        for (let i=0;i<data.length;i++) {
            for (let j=0;j<args[1];j++) {
                output.push(data[i]%256);
                data[i] = data[i]>>8;
            }
        }

        if (args[2]==="Big Endian") {
            output = SwapEndianness.call((Utils.byteArrayToChars(output)), ["Raw", Number(args[1])]);
            output = Utils.strToByteArray(output);
        }

        return output;
    }

}

export default FromDecimal;
