const index = []

const index_root = {
    method: 'GET',
    path: '/',
    handler: (request, h) => {
        return ("Homepage");
    }
}

index.push(index_root);
module.exports = index;