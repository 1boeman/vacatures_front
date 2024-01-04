import { q, parents, clck, ready } from './utils'
const refreshAllTime = 5000;

function refresh() {
    var refreshedBlocks = {};
    var blockIds = [];
    q('.news_block').forEach( block => {
       blockIds.push(block.id)
    })
    refreshBlocks(blockIds, refreshedBlocks)
}


function refreshBlocks (blockIds, refreshedBlocks) {
    let blockId = blockIds.pop();
    reBlock(blockId, refreshedBlocks);
    if (blockIds.length == 0){
        setTimeout(refresh, refreshAllTime)
    } else {
        setTimeout(refreshBlocks, 1000, blockIds, refreshedBlocks);
    }
}

async function reBlock(blockId, refreshedBlocks){
    try {
        const response = await fetch('./blocks/'+blockId);
        if (!response.ok) {
            throw new Error("Network response not OK");
            console.log(response)
        }

        let htmlString = await response.text()
        q('#' + blockId)[0].innerHTML = htmlString;
        refreshedBlocks[blockId] = 1;
    } catch(error){
        console.error("Error:", error);
        refreshedBlocks[blockId] = 0;
    }
}

export { refresh };
