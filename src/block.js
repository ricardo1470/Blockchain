const SHA256 = require('crypto-js/sha256');
const hex2ascii = require('hex2ascii');

class Block {
    constructor(data) {
        this.hash = null; // hash of the block
        this.height = 0; // height of the block
        this.body = Buffer.from(JSON.stringify(data).toString('hex')); // data of the block
        this.time = 0; // time of the block
        this.previousBlockHash = ""; // hash of the previous block
    }

    validate() {
        const self = this;

        return new Promise((resolve, reject) => {
            let currentBlockHash = self.hash;

            self.hash = SHA256(JSON.stringify(self)).toString();

            if (currentBlockHash !== self.hash) {
                reject(new Error("Block not valid"));
                return resolve(false);
            }
            resolve(true);
        });
    }

    getBlockData() {
        const self = this;

        return new Promise((resolve, reject) => {
            let encodeData = self.body;
            let decodeData = hex2ascii(encodeData);
            let dataObject = JSON.parse(decodeData);

            if (dataObject === 'Genesis Block') {
                reject(new Error("This is Genesis Block"));
            }

            resolve(dataObject);
        })
    }

    toString() {
        const { hash, height, body, time, previousBlockHash } = this;

        return `Block -
            hash: ${hash}
            height: ${height}
            body: ${body}
            time: ${time}
            previousBlockHash: ${previousBlockHash}
            ------------------------------------->`;
    }
}

module.exports = Block;
