const Blockchain = require('./src/blockchain');
const Block = require('./src/block');

async function main() {
    const blockchain = await new Blockchain();
    const block1 = new Block({ data: "Firts Block" });
    await blockchain.addBlock(block1);
    const block2 = new Block({ data: "Second Block" });
    await blockchain.addBlock(block2);
    const block3 = new Block({ data: "Third Block" });
    await blockchain.addBlock(block3);

    blockchain.print();
}

main();
